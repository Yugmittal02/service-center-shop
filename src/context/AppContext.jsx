import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const defaultData = {
    siteDetails: {
      phone1: '8209640447',
      phone2: '9782311637',
      address: 'Bapu Nagar, Vivek Vihar Colony, H.No. 186, Bharatpur, Rajasthan',
      timing: 'Everyday: 9:00 AM – 8:00 PM',
      heroTitle: 'Expert Home Repair & Service in Bharatpur',
      heroSubtitle: 'Reliable AC, fridge, washing machine, geyser and electrical repair services directly at your doorstep by experienced professionals.',
      heroImage: '/images/hero_repair.png',
      googleRating: 4.8,
      googleReviewsCount: 120,
      justdialUrl: 'https://www.justdial.com/JdSocial/profile/Jatin-Saini-VoBDbDR4MGOEPBo5el2E',
      googleMapsUrl: 'https://www.google.co.in/maps/place/Saini+Refrigeration+and+Electrician...'
    },
    services: [
      { 
        id: 1, title: 'AC Repair & Installation', 
        description: 'AC servicing, gas filling, installation, cooling issue repair, and underground AC piping.', 
        image: '/images/service_ac.png', icon: 'Thermometer', 
        price: 'Starts at ₹499', basePrice: 499,
        rating: 4.76, reviewCount: 2700000, duration: '1 hr 30 mins',
        includes: ['Indoor unit deep cleaning with foam & jet spray', 'Filter cleaning and sanitization', 'Performance check and testing'],
        addOns: [{ name: 'Gas Refill (R32)', price: 1499 }, { name: 'Gas Top-up Check', price: 199 }]
      },
      { 
        id: 2, title: 'Refrigerator & Deep Freezer', 
        description: 'Fridge repair, deep freezer repair, compressor issues, cooling problems, and maintenance.', 
        image: '/images/service_fridge.png', icon: 'ShieldCheck', 
        price: 'Starts at ₹399', basePrice: 399,
        rating: 4.65, reviewCount: 1800000, duration: '1 hr',
        includes: ['Complete diagnosis of cooling issue', 'Thermostat and compressor check', 'Gas leak detection'],
        addOns: [{ name: 'Compressor Repair', price: 999 }]
      },
      { 
        id: 3, title: 'Washing Machine & Geyser', 
        description: 'Washing machine servicing, motor repair, geyser installation, heating issue repair.', 
        image: '/images/service_washing.png', icon: 'Settings', 
        price: 'Starts at ₹299', basePrice: 299,
        rating: 4.58, reviewCount: 950000, duration: '45 mins',
        includes: ['Motor and drum inspection', 'Drainage pipe cleaning', 'Full cycle test run'],
        addOns: [{ name: 'Belt Replacement', price: 349 }]
      },
      { 
        id: 4, title: 'Electrical & Wiring', 
        description: 'Underground wiring, open light fitting, switchboard repair, LPG piping, chemical earthing.', 
        image: '/images/service_electrical.png', icon: 'Zap', 
        price: 'Starts at ₹199', basePrice: 199,
        rating: 4.72, reviewCount: 1200000, duration: '30 mins',
        includes: ['Wiring inspection and repair', 'Switchboard installation', 'Safety check and earthing test'],
        addOns: [{ name: 'MCB/Fuse Replacement', price: 149 }, { name: 'Earthing Installation', price: 799 }]
      }
    ],
    bookings: [],
    coupons: [],
    banners: [],
    notepad: '',
    commissionPercent: 10
  };

  const [appData, setAppData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const appDataRef = useRef(appData);

  // Keep ref always in sync
  useEffect(() => { appDataRef.current = appData; }, [appData]);

  const docRef = doc(db, 'sainiRefrigeration', 'appData');

  useEffect(() => {
    const loadData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const merged = { ...defaultData, ...docSnap.data() };
          setAppData(merged);
          appDataRef.current = merged;
        } else {
          await setDoc(docRef, defaultData);
        }
      } catch (error) {
        console.error("Error loading from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const newData = { ...defaultData, ...snapshot.data() };
        setAppData(prev => {
          if (JSON.stringify(prev) !== JSON.stringify(newData)) {
            appDataRef.current = newData;
            return newData;
          }
          return prev;
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // FIXED: use functional updater + ref to prevent stale closure race conditions
  const saveToFirebase = useCallback(async (updaterFn) => {
    const latest = appDataRef.current;
    const newData = updaterFn(latest);
    appDataRef.current = newData;
    setAppData(newData);
    try {
      await setDoc(docRef, newData);
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  }, []);

  const updateSiteDetails = (newDetails) => {
    saveToFirebase(prev => ({ ...prev, siteDetails: { ...prev.siteDetails, ...newDetails } }));
  };

  const addService = (newService) => {
    saveToFirebase(prev => ({ ...prev, services: [...prev.services, { ...newService, id: Date.now() }] }));
  };

  const updateService = (updatedService) => {
    saveToFirebase(prev => ({ ...prev, services: prev.services.map(s => s.id === updatedService.id ? updatedService : s) }));
  };

  const deleteService = (id) => {
    saveToFirebase(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  // FIXED: addBooking now also records coupon usage atomically in ONE save
  const addBooking = (booking) => {
    saveToFirebase(prev => {
      const newBooking = {
        ...booking,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'Pending',
        paymentReceived: 0,
        commissionEarned: 0
      };
      let updatedCoupons = prev.coupons || [];
      // If there's a coupon, record usage in the same atomic save
      if (booking.coupon) {
        const codeUpper = booking.coupon.toUpperCase();
        updatedCoupons = updatedCoupons.map(c => {
          if (c.code === codeUpper) {
            return { ...c, usages: [...(c.usages || []), { date: new Date().toISOString(), customerName: booking.name, service: booking.service }] };
          }
          return c;
        });
      }
      return { ...prev, bookings: [newBooking, ...prev.bookings], coupons: updatedCoupons };
    });
    return true;
  };

  const addManualBooking = (booking) => {
    saveToFirebase(prev => {
      const goods = parseFloat(booking.costOfGoods) || 0;
      const serviceCost = parseFloat(booking.costOfService) || 0;
      const payment = goods + serviceCost;
      const commPct = prev.commissionPercent || 10;
      const commissionEarned = Math.round(serviceCost * commPct / 100);
      const newBooking = {
        name: booking.name,
        phone: booking.phone,
        service: booking.service,
        message: booking.message || '',
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'Completed',
        paymentReceived: payment,
        costOfGoods: goods,
        costOfService: serviceCost,
        commissionEarned,
        completedDate: new Date().toISOString(),
        isManual: true
      };
      return { ...prev, bookings: [newBooking, ...prev.bookings] };
    });
    return true;
  };

  const updateBookingStatus = (id, status, paymentReceived = null, extraDetails = {}) => {
    saveToFirebase(prev => {
      const commPct = prev.commissionPercent || 10;
      return {
        ...prev,
        bookings: prev.bookings.map(b => {
          if (b.id === id) {
            const updated = { ...b, status, ...extraDetails };
            if (paymentReceived !== null) {
              const pay = parseFloat(paymentReceived) || 0;
              updated.paymentReceived = pay;
              const serviceCost = extraDetails.costOfService !== undefined ? (parseFloat(extraDetails.costOfService) || 0) : pay;
              updated.commissionEarned = Math.round(serviceCost * commPct / 100);
            }
            if (status === 'Completed' && b.status !== 'Completed') {
              updated.completedDate = new Date().toISOString();
            }
            return updated;
          }
          return b;
        })
      };
    });
  };

  const updateCommissionPercent = (pct) => {
    saveToFirebase(prev => ({ ...prev, commissionPercent: parseFloat(pct) || 10 }));
  };

  // FIXED: coupon now supports type (percentage / flat) and value
  const addCoupon = (couponData) => {
    saveToFirebase(prev => ({
      ...prev,
      coupons: [{
        id: Date.now().toString(),
        code: couponData.code.toUpperCase(),
        discountType: couponData.discountType || 'flat', // 'percentage' or 'flat'
        discountValue: parseFloat(couponData.discountValue) || 0,
        discountText: couponData.discountText || '',
        createdAt: new Date().toISOString(),
        isActive: true,
        usages: []
      }, ...prev.coupons]
    }));
  };

  const toggleCouponStatus = (id) => {
    saveToFirebase(prev => ({
      ...prev,
      coupons: prev.coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c)
    }));
  };

  const deleteCoupon = (id) => {
    saveToFirebase(prev => ({
      ...prev,
      coupons: prev.coupons.filter(c => c.id !== id)
    }));
  };

  const deleteBooking = (id) => {
    saveToFirebase(prev => ({
      ...prev,
      bookings: prev.bookings.filter(b => b.id !== id)
    }));
  };

  const updateNotepad = (text) => {
    saveToFirebase(prev => ({ ...prev, notepad: text }));
  };

  // ===== BANNER FUNCTIONS =====
  const addBanner = (banner) => {
    saveToFirebase(prev => ({
      ...prev,
      banners: [...(prev.banners || []), {
        id: Date.now().toString(),
        imageUrl: banner.imageUrl,
        link: banner.link || '',
        title: banner.title || '',
        isActive: true,
        createdAt: new Date().toISOString()
      }]
    }));
  };

  const updateBanner = (updatedBanner) => {
    saveToFirebase(prev => ({
      ...prev,
      banners: (prev.banners || []).map(b => b.id === updatedBanner.id ? { ...b, ...updatedBanner } : b)
    }));
  };

  const deleteBanner = (id) => {
    saveToFirebase(prev => ({
      ...prev,
      banners: (prev.banners || []).filter(b => b.id !== id)
    }));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-50"><div className="animate-spin h-8 w-8 border-4 border-brand-teal border-t-transparent rounded-full"></div></div>;
  }

  return (
    <AppContext.Provider value={{
      appData,
      updateSiteDetails,
      addService,
      updateService,
      deleteService,
      addBooking,
      addManualBooking,
      updateBookingStatus,
      updateCommissionPercent,
      addCoupon,
      toggleCouponStatus,
      deleteCoupon,
      deleteBooking,
      updateNotepad,
      addBanner,
      updateBanner,
      deleteBanner
    }}>
      {children}
    </AppContext.Provider>
  );
};
