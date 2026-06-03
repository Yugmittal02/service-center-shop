import React, { useState, useContext, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, MapPin, Clock, Settings, Wrench, Thermometer, 
  Zap, ArrowRight, CheckCircle, ShieldCheck, ThumbsUp, Truck, 
  Star, PhoneCall, MessageSquare, Info, XCircle, ShoppingCart, ChevronRight,
  Droplet, Flame, Wind
} from 'lucide-react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import JustdialProfile from '../components/JustdialProfile';
import GoogleRating from '../components/GoogleRating';
import VisitingCard from '../components/VisitingCard';

export default function Home() {
  const { appData, addBooking } = useContext(AppContext);
  const { siteDetails, services, coupons, banners } = appData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showServiceDetail, setShowServiceDetail] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const CATEGORIES = [
    { key: 'all', label: 'All Services', icon: <Settings size={22} />, color: 'bg-gray-100 text-gray-700', activeColor: 'bg-brand-blue text-white' },
    { key: 'AC Services', label: 'AC', image: '/images/ac_service_3d.png', color: 'bg-blue-50 text-blue-600', activeColor: 'bg-blue-600 text-white' },
    { key: 'Appliance Repair', label: 'Appliances', image: '/images/washing_machine_3d.png', color: 'bg-orange-50 text-orange-600', activeColor: 'bg-orange-600 text-white' },
    { key: 'Geyser Services', label: 'Geyser', image: '/images/geyser_repair_3d.png', color: 'bg-red-50 text-red-500', activeColor: 'bg-red-500 text-white' },
    { key: 'RO & Water Purifier', label: 'RO / Purifier', image: '/images/ro_purifier_3d.png', color: 'bg-cyan-50 text-cyan-600', activeColor: 'bg-cyan-600 text-white' },
    { key: 'Electrical Services', label: 'Electrical', image: '/images/electrical_repair_3d.png', color: 'bg-yellow-50 text-yellow-600', activeColor: 'bg-yellow-600 text-white' },
  ];

  const visibleServices = services.filter(s => s.status === 'active' || s.status === 'coming_soon');
  const filteredServices = activeCategory === 'all' ? visibleServices : visibleServices.filter(s => s.category === activeCategory);
  const groupedServices = CATEGORIES.filter(c => c.key !== 'all').reduce((acc, cat) => {
    const catServices = visibleServices.filter(s => s.category === cat.key);
    if (catServices.length > 0) acc.push({ ...cat, services: catServices });
    return acc;
  }, []);

  const openServiceDetail = (service) => {
    setShowServiceDetail(service);
    setSelectedAddOns([]);
  };

  const closeServiceDetail = () => setShowServiceDetail(null);

  const bookFromDetail = () => {
    const svc = showServiceDetail;
    closeServiceDetail();
    openBookingModal(svc);
  };

  const openBookingModal = (service = null) => {
    if (service) {
      setSelectedService(service);
      setSelectedAddOns([]);
      setBookingStep(1);
    } else {
      setSelectedService(null);
      setBookingStep(1);
    }
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  // Banner carousel
  const activeBanners = (banners || []).filter(b => b.isActive);
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerInterval = useRef(null);
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    bannerInterval.current = setInterval(() => setCurrentBanner(p => (p + 1) % activeBanners.length), 4000);
    return () => clearInterval(bannerInterval.current);
  }, [activeBanners.length]);

  // Add-ons selection for checkout
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const toggleAddOn = (addon) => {
    setSelectedAddOns(prev => prev.find(a => a.name === addon.name) ? prev.filter(a => a.name !== addon.name) : [...prev, addon]);
  };
  const addOnsTotal = selectedAddOns.reduce((s, a) => s + (a.price || 0), 0);

  // Multi-step booking
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', message: '' });
  const [selectedService, setSelectedService] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getServicePrice = (service) => service?.basePrice || 0;

  const getDiscount = () => {
    if (!appliedCoupon || !selectedService) return 0;
    const price = getServicePrice(selectedService);
    const val = parseFloat(appliedCoupon.discountValue) || 0;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round(price * (val / 100));
    }
    return Math.min(val, price);
  };

  const getTotalBill = () => {
    if (!selectedService) return 0;
    const total = getServicePrice(selectedService) + addOnsTotal - getDiscount();
    return Math.max(0, total);
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!couponCode) return;
    const found = (coupons || []).find(c => c.code === couponCode.toUpperCase() && c.isActive);
    if (!found) { setCouponError('Invalid or expired coupon code.'); setAppliedCoupon(null); toast.error('Invalid or expired coupon!'); return; }
    setAppliedCoupon(found);
    const val = parseFloat(found.discountValue) || 0;
    toast.success(`Coupon applied! ${found.discountType === 'percentage' ? val + '% OFF' : '₹' + val + ' OFF'}`);
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (bookingForm.name && bookingForm.phone) {
      setBookingStep(2);
      toast.info('Now select a service!');
    }
  };

  const handleFinalBook = () => {
    if (!selectedService) return;
    addBooking({
      ...bookingForm,
      service: selectedService.title,
      coupon: appliedCoupon ? appliedCoupon.code : '',
      subtotal: getServicePrice(selectedService),
      addOns: selectedAddOns,
      addOnsTotal,
      discount: getDiscount(),
      totalBill: getTotalBill()
    });
    setBookingStep(3);
    toast.success('🎉 Booking confirmed successfully!');
    setTimeout(() => {
      setBookingStep(1);
      setBookingForm({ name: '', phone: '', message: '' });
      setSelectedService(null);
      setSelectedAddOns([]);
      setCouponCode('');
      setAppliedCoupon(null);
      setShowBookingModal(false);
    }, 5000);
  };

  const getIcon = (iconName) => {
    const cls = "text-brand-teal h-5 w-5";
    switch (iconName) {
      case 'Thermometer': return <Thermometer className={cls} />;
      case 'ShieldCheck': return <ShieldCheck className={cls} />;
      case 'Settings': return <Settings className={cls} />;
      case 'Zap': return <Zap className={cls} />;
      default: return <Wrench className={cls} />;
    }
  };

  const renderServiceCard = (service) => {
    const isComingSoon = service.status === 'coming_soon';
    return (
      <div key={service.id} onClick={() => !isComingSoon && openServiceDetail(service)}
        className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group border border-gray-100 flex flex-col ${isComingSoon ? 'opacity-75 cursor-default' : 'cursor-pointer'}`}>
        <div className="h-32 sm:h-36 overflow-hidden relative">
          <img src={service.image} alt={service.title} className={`w-full h-full object-cover transition duration-500 bg-gray-100 ${isComingSoon ? 'grayscale' : 'group-hover:scale-105'}`} onError={e => { e.target.src = '/images/hero_repair.png'; }} />
          <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">{getIcon(service.icon)}</div>
          {service.featured && !isComingSoon && <div className="absolute top-2.5 left-2.5 bg-brand-orange text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">Popular</div>}
          {isComingSoon && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Clock size={14} /> Coming Soon
              </span>
            </div>
          )}
        </div>
        <div className="p-3.5 flex-1 flex flex-col">
          <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand-blue transition mb-1 leading-tight">{service.title}</h4>
          <p className="text-gray-500 text-[11px] mb-2 line-clamp-2 leading-relaxed">{service.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-black text-base text-gray-900">₹{service.basePrice}</span>
            {service.duration && <span className="text-gray-400 text-[10px]">• {service.duration}</span>}
          </div>
          {!isComingSoon && (
            <div className="flex items-center justify-between mt-auto">
              <span className="inline-flex items-center text-brand-teal font-bold text-xs gap-0.5">
                View Details <ChevronRight size={14} />
              </span>
              {(service.addOns || []).length > 0 && (
                <span className="text-[9px] text-gray-400 font-bold">{service.addOns.length} add-ons</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 overflow-x-hidden min-h-screen">
      {/* Top Bar */}
      <div className="bg-brand-blue text-white py-1.5 px-4 hidden lg:block text-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex space-x-5">
            <div className="flex items-center space-x-1.5"><Phone size={13} /><span>{siteDetails.phone1}, {siteDetails.phone2}</span></div>
            <div className="flex items-center space-x-1.5"><Clock size={13} /><span>{siteDetails.timing}</span></div>
          </div>
          <div className="flex items-center space-x-1.5"><MapPin size={13} /><span>{siteDetails.address.split(',').slice(0,2).join(',')}</span></div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14 md:h-16">
            <a href="#" className="flex items-center gap-2">
              <img src="/images/logo_icon.png" alt="Saini HomeCare" className="h-12 md:h-14 w-auto object-contain" />
              <span className="text-brand-blue text-lg md:text-xl font-black tracking-tight leading-tight">Saini <span className="text-brand-teal">HomeCare</span></span>
            </a>
            <div className="hidden lg:flex items-center space-x-5">
              {['Home','Services','About','Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-brand-teal font-semibold text-sm transition">{item}</a>
              ))}
              <a href={`tel:${siteDetails.phone1}`} className="bg-brand-orange hover:bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition shadow-sm">
                <PhoneCall size={15} /> Call Now
              </a>
            </div>
            <button onClick={toggleMenu} className="lg:hidden text-gray-700 bg-gray-100 p-2 rounded-lg">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t absolute w-full shadow-lg z-40 px-4 py-3 space-y-1">
            {['Home','Services','About','Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMenu} className="block px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg">{item}</a>
            ))}
            <a href={`tel:${siteDetails.phone1}`} className="block text-center bg-brand-orange text-white px-4 py-2.5 rounded-lg font-bold text-sm mt-2">
              <PhoneCall size={16} className="inline mr-1.5" /> Call Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="bg-white py-10 md:py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
            <div className="mb-8 lg:mb-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold mb-4">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-brand-orange opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-brand-orange"></span></span>
                Available for Service Today
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue leading-tight mb-4">
                Expert <span className="text-brand-teal">Home Repair & Service</span> in Bharatpur
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md mx-auto lg:mx-0 leading-relaxed">
                {siteDetails.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button onClick={() => openBookingModal()} className="bg-brand-blue hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm flex items-center justify-center gap-2">
                  Book Service <ArrowRight size={16} />
                </button>
                <a href={`tel:${siteDetails.phone1}`} className="bg-white border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
                  <Phone size={16} /> Call Now
                </a>
                <a href={`https://wa.me/91${siteDetails.phone1}`} className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> WhatsApp
                </a>
              </div>
            </div>
            {/* Banner Carousel / Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              {activeBanners.length > 0 ? (
                <>
                  <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
                    {activeBanners.map((banner) => (
                      <div key={banner.id} className="w-full flex-shrink-0">
                        {banner.link ? (
                          <a href={banner.link} target="_blank" rel="noreferrer">
                            <img src={banner.imageUrl} alt={banner.title || 'Promo'} className="w-full h-[240px] sm:h-[300px] md:h-[360px] object-cover bg-gray-100" />
                          </a>
                        ) : (
                          <img src={banner.imageUrl} alt={banner.title || 'Promo'} className="w-full h-[240px] sm:h-[300px] md:h-[360px] object-cover bg-gray-100" />
                        )}
                      </div>
                    ))}
                  </div>
                  {activeBanners.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {activeBanners.map((_, i) => (
                        <button key={i} onClick={() => setCurrentBanner(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentBanner ? 'bg-white shadow-lg scale-125 w-6' : 'bg-white/60 hover:bg-white/80'}`} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-brand-teal rounded-2xl translate-x-2 translate-y-2 opacity-20"></div>
                  <img src={siteDetails.heroImage} alt="Repair Service" className="relative rounded-2xl object-cover h-[240px] sm:h-[300px] md:h-[360px] w-full bg-gray-200" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 md:py-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <ShieldCheck size={20} className="text-brand-blue" />, title: 'Verified Experts', sub: 'Background checked', bg: 'bg-blue-50' },
              { icon: <ThumbsUp size={20} className="text-brand-teal" />, title: 'Quick Response', sub: 'Same day service', bg: 'bg-teal-50' },
              { icon: <Clock size={20} className="text-brand-orange" />, title: '24x7 Support', sub: 'Always available', bg: 'bg-orange-50' },
              { icon: <CheckCircle size={20} className="text-green-600" />, title: 'Fair Pricing', sub: 'No hidden charges', bg: 'bg-green-50' }
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                <div className={`${b.bg} p-2 rounded-lg flex-shrink-0`}>{b.icon}</div>
                <div><p className="font-bold text-sm text-gray-900">{b.title}</p><p className="text-xs text-gray-500">{b.sub}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Category-based Urban Company Style */}
      <section id="services" className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
            <h2 className="text-brand-teal font-extrabold tracking-wider uppercase text-xs mb-1.5">Our Services</h2>
            <h3 className="text-2xl md:text-3xl font-black text-brand-blue mb-3">What do you need help with?</h3>
            <p className="text-gray-500 text-sm">Expert repair, installation, and maintenance — all under one roof.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 min-w-[90px] h-[90px] ${
                  activeCategory === cat.key
                    ? `${cat.activeColor} border-transparent shadow-lg scale-105`
                    : `${cat.color} border-transparent hover:border-gray-200 hover:shadow-sm`
                }`}>
                {cat.image ? (
                  <img src={cat.image} alt={cat.label} className="w-10 h-10 object-cover rounded-full bg-white shadow-sm" />
                ) : (
                  cat.icon
                )}
                <span className="text-[11px] font-bold">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Category Sections */}
          {activeCategory === 'all' ? (
            // Grouped view
            groupedServices.map(group => (
              <div key={group.key} className="mb-10 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${group.color} p-2 rounded-lg`}>
                    {group.image ? <img src={group.image} alt={group.label} className="w-6 h-6 object-cover rounded-full bg-white shadow-sm" /> : group.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-black text-gray-900">{group.key}</h4>
                  <span className="text-xs text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded-full">{group.services.length} services</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.services.map(service => renderServiceCard(service))}
                </div>
              </div>
            ))
          ) : (
            // Filtered view
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map(service => renderServiceCard(service))}
            </div>
          )}

          {/* JustDial + Google Widgets */}
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            <JustdialProfile url={siteDetails.justdialUrl} />
            <GoogleRating rating={siteDetails.googleRating} reviewsCount={siteDetails.googleReviewsCount} mapUrl={siteDetails.googleMapsUrl} />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-10 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
            <div className="relative mb-8 lg:mb-0">
              <img src="/images/about_image.png" alt="Trusted Experts" className="rounded-2xl shadow-md w-full object-cover bg-gray-200 h-[240px] sm:h-[300px] md:h-[360px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-xl border-4 border-brand-teal">
                <span className="block text-2xl font-black text-brand-blue leading-none">10+</span>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Years</span>
              </div>
            </div>
            <div>
              <h2 className="text-brand-teal font-extrabold tracking-wider uppercase text-xs mb-1.5">About Our Company</h2>
              <h3 className="text-2xl md:text-3xl font-black text-brand-blue mb-4 leading-tight">Trusted Repair Experts in Bharatpur</h3>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                Saini HomeCare provides trusted home appliance repair and electrical services across Bharatpur. We handle ACs, refrigerators, washing machines, geysers, deep freezers, wiring, lighting, and earthing work.
              </p>
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg"><CheckCircle className="text-brand-blue h-5 w-5" /></div>
                  <div><p className="font-bold text-sm text-gray-900">1000+</p><p className="text-xs text-gray-500">Happy Customers</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg"><Truck className="text-brand-orange h-5 w-5" /></div>
                  <div><p className="font-bold text-sm text-gray-900">Fast Service</p><p className="text-xs text-gray-500">At your home</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visiting Card */}
      <section className="py-10 md:py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h2 className="text-brand-teal font-extrabold tracking-wider uppercase text-xs mb-1.5">Save Our Contact</h2>
            <h3 className="text-2xl md:text-3xl font-black text-brand-blue">Digital Visiting Card</h3>
          </div>
          <VisitingCard details={siteDetails} />
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-10 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-brand-blue to-blue-900 rounded-2xl overflow-hidden shadow-xl p-8 md:p-12 text-center text-white relative">
            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-brand-teal rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-48 h-48 bg-brand-orange rounded-full opacity-20 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-brand-orange font-extrabold tracking-wider uppercase text-xs mb-2">Need Help?</h2>
              <h3 className="text-3xl md:text-4xl font-black mb-4">Book Your Service Now</h3>
              <p className="text-blue-200 text-sm md:text-base mb-8 max-w-lg mx-auto">Get expert repair at your doorstep. Quick response, fair pricing, trusted professionals.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <button onClick={() => openBookingModal()} className="bg-brand-orange hover:bg-orange-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2">
                  <ArrowRight size={18} /> Book Service Online
                </button>
                <a href={`tel:${siteDetails.phone1}`} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2">
                  <Phone size={18} /> Call {siteDetails.phone1}
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <PhoneCall size={16} className="text-brand-orange" />
                  <span className="text-sm font-semibold">{siteDetails.phone1}</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <Clock size={16} className="text-brand-orange" />
                  <span className="text-sm font-semibold">{siteDetails.timing?.split(':')[0] || '9 AM â€“ 8 PM'}</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <MapPin size={16} className="text-brand-orange" />
                  <span className="text-sm font-semibold">Bharatpur, Raj.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE DETAIL POPUP ===== */}
      {showServiceDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-end sm:items-center justify-center" onClick={closeServiceDetail}>
          <div className="bg-white w-full sm:rounded-2xl sm:max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative animate-[slideUp_0.3s_ease-out] shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button onClick={closeServiceDetail} className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-gray-100 text-gray-600 hover:text-gray-900 p-2 rounded-full transition shadow-sm"><X size={18} /></button>

            {/* Hero Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden sm:rounded-t-2xl">
              <img src={showServiceDetail.image} alt={showServiceDetail.title} className="w-full h-full object-cover bg-gray-100" onError={e => { e.target.src = '/images/hero_repair.png'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-16">
                {showServiceDetail.featured && <span className="inline-block bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-2 shadow">⭐ Popular Service</span>}
                <h3 className="text-white text-xl sm:text-2xl font-black leading-tight drop-shadow-lg">{showServiceDetail.title}</h3>
                {showServiceDetail.category && <p className="text-white/80 text-xs font-bold mt-1">{showServiceDetail.category}</p>}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Price + Duration Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl font-black text-gray-900">₹{showServiceDetail.basePrice}</span>
                  {showServiceDetail.basePrice && <span className="text-gray-400 text-sm line-through">₹{Math.round(showServiceDetail.basePrice * 1.2)}</span>}
                </div>
                {showServiceDetail.duration && (
                  <div className="flex items-center gap-1.5 bg-blue-50 text-brand-blue px-3 py-1.5 rounded-full">
                    <Clock size={14} />
                    <span className="text-xs font-bold">{showServiceDetail.duration}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              {showServiceDetail.rating > 0 && (
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-xl border border-yellow-100">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm text-gray-800">{showServiceDetail.rating}</span>
                  <span className="text-gray-500 text-xs">({showServiceDetail.reviewCount?.toLocaleString()} reviews)</span>
                </div>
              )}

              {/* Description */}
              <div>
                <p className="text-gray-600 text-sm leading-relaxed">{showServiceDetail.description}</p>
                {showServiceDetail.detailedDescription && (
                  <p className="text-gray-500 text-xs leading-relaxed mt-2">{showServiceDetail.detailedDescription}</p>
                )}
              </div>

              {/* What's Included */}
              {(showServiceDetail.includes || []).length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-gray-900 mb-2.5 flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" /> What's Included
                  </h4>
                  <ul className="space-y-1.5 bg-green-50/50 p-3.5 rounded-xl border border-green-100">
                    {showServiceDetail.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={13} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Add-Ons */}
              {(showServiceDetail.addOns || []).length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-gray-900 mb-2.5 flex items-center gap-2">
                    <ShoppingCart size={16} className="text-brand-blue" /> Add-Ons
                  </h4>
                  <div className="space-y-2">
                    {showServiceDetail.addOns.map((ao, i) => {
                      const isSelected = selectedAddOns.find(a => a.name === ao.name);
                      return (
                        <button key={i} type="button" onClick={() => toggleAddOn(ao)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition text-sm ${isSelected ? 'border-brand-teal bg-brand-teal/5 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                          <div className="flex items-center gap-2.5">
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition ${isSelected ? 'bg-brand-teal border-brand-teal' : 'border-gray-300'}`}>
                              {isSelected && <CheckCircle size={12} className="text-white" />}
                            </div>
                            <span className="font-semibold text-gray-800">{ao.name}</span>
                          </div>
                          <span className={`font-bold text-xs whitespace-nowrap ${isSelected ? 'text-brand-teal' : 'text-brand-orange'}`}>
                            {ao.price ? `₹${ao.price}` : (ao.priceText || '')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="mt-2 bg-brand-teal/5 border border-brand-teal/20 px-3 py-2 rounded-lg flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-teal">{selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''} selected</span>
                      {addOnsTotal > 0 && <span className="text-xs font-black text-brand-teal">+₹{addOnsTotal}</span>}
                    </div>
                  )}
                </div>
              )}

              {/* Exclusions */}
              {(showServiceDetail.exclusions || []).length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-gray-900 mb-2.5 flex items-center gap-2">
                    <XCircle size={16} className="text-red-400" /> Not Included
                  </h4>
                  <ul className="space-y-1.5 bg-red-50/50 p-3.5 rounded-xl border border-red-100">
                    {showServiceDetail.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <XCircle size={13} className="text-red-300 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing Disclaimer */}
              {showServiceDetail.pricingDisclaimer && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex gap-2.5">
                  <Info size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800 leading-relaxed">{showServiceDetail.pricingDisclaimer}</p>
                </div>
              )}

              {/* CTA */}
              <div className="sticky bottom-0 bg-white pt-3 pb-1 border-t border-gray-100 -mx-5 sm:-mx-6 px-5 sm:px-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 font-bold">Estimated Total</p>
                    <p className="text-xl font-black text-gray-900">₹{(showServiceDetail.basePrice || 0) + addOnsTotal}</p>
                  </div>
                  <button onClick={bookFromDetail}
                    className="bg-brand-teal hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg flex items-center gap-2">
                    <ShoppingCart size={16} /> {showServiceDetail.ctaText || 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== BOOKING POPUP MODAL ===== */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={closeBookingModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative animate-[scaleIn_0.25s_ease-out]" onClick={e => e.stopPropagation()}>
            <button onClick={closeBookingModal} className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 p-2 rounded-full transition"><X size={18} /></button>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-teal p-6 text-white">
              <h3 className="text-xl font-black">Book Your Service</h3>
              <p className="text-blue-100 text-sm mt-1">{selectedService ? `Selected: ${selectedService.title}` : 'Fill your details to get started'}</p>
              <div className="flex items-center gap-2 mt-4">
                {[1,2,3].map(s => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${s < bookingStep ? 'bg-green-400 border-green-400' : s === bookingStep ? 'bg-white text-brand-blue border-white' : 'border-white/40 text-white/40'}`}>{s < bookingStep ? '✓' : s}</div>
                    {s < 3 && <div className={`w-5 h-0.5 ${s < bookingStep ? 'bg-green-400' : 'bg-white/30'}`}></div>}
                  </div>
                ))}
                <span className="text-xs font-bold ml-2 text-blue-100">{bookingStep === 1 ? 'Details' : bookingStep === 2 ? 'Service & Bill' : 'Done!'}</span>
              </div>
            </div>

            <div className="p-6">
              {/* STEP 1 */}
              {bookingStep === 1 && (
                <form className="space-y-4" onSubmit={handleStep1Submit}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Your Name *</label>
                    <input required type="text" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none text-sm bg-gray-50" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                    <input required type="tel" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none text-sm bg-gray-50" placeholder="8209640447" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Message (Optional)</label>
                    <textarea rows="2" value={bookingForm.message} onChange={e => setBookingForm({...bookingForm, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none text-sm bg-gray-50 resize-none" placeholder="Describe the issue..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brand-teal hover:bg-teal-700 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md flex justify-center items-center gap-2">
                    Next: Choose Service <ArrowRight size={16} />
                  </button>
                </form>
              )}

              {/* STEP 2 */}
              {bookingStep === 2 && (
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {services.map(s => (
                      <button key={s.id} type="button" onClick={() => { setSelectedService(s); setSelectedAddOns([]); }}
                        className={`p-3 rounded-xl border-2 text-left transition ${selectedService?.id === s.id ? 'border-brand-teal bg-brand-teal/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                        <p className="font-bold text-sm text-gray-900 leading-tight mb-1">{s.title}</p>
                        <p className="text-brand-orange font-black text-base">₹{s.basePrice || 0}</p>
                      </button>
                    ))}
                  </div>

                  {selectedService && (selectedService.addOns || []).length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Add-ons (Optional)</label>
                      <div className="space-y-2">
                        {selectedService.addOns.map((ao, i) => (
                          <button key={i} type="button" onClick={() => toggleAddOn(ao)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition text-sm ${selectedAddOns.find(a => a.name === ao.name) ? 'border-brand-teal bg-brand-teal/5' : 'border-gray-200 hover:border-gray-300'}`}>
                            <span className="font-semibold text-gray-800">+ {ao.name}</span>
                            <span className="font-black text-brand-orange">{ao.price ? `₹${ao.price}` : (ao.priceText || '')}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Have a Coupon?</label>
                    <div className="flex gap-2">
                      <input type="text" value={couponCode} onChange={e => { setCouponCode(e.target.value.toUpperCase()); setAppliedCoupon(null); setCouponError(''); }} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-teal outline-none text-sm uppercase bg-gray-50" placeholder="Enter code" />
                      <button type="button" onClick={handleApplyCoupon} className="bg-brand-blue hover:bg-blue-900 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition">Apply</button>
                    </div>
                    {couponError && <p className="text-red-500 text-xs font-bold mt-1">{couponError}</p>}
                    {appliedCoupon && <p className="text-green-600 text-xs font-bold mt-1">✓ {appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}% OFF` : `₹${appliedCoupon.discountValue} OFF`}</p>}
                  </div>

                  {selectedService && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
                      <h4 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider">Bill Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600">{selectedService.title}</span><span className="font-bold">₹{getServicePrice(selectedService)}</span></div>
                        {selectedAddOns.map((ao, i) => (<div key={i} className="flex justify-between text-gray-600"><span>+ {ao.name}</span><span className="font-bold">{ao.price ? `₹${ao.price}` : (ao.priceText || '')}</span></div>))}
                        {appliedCoupon && getDiscount() > 0 && (<div className="flex justify-between text-green-600"><span>Discount ({appliedCoupon.code})</span><span className="font-bold">-₹{getDiscount()}</span></div>)}
                        <div className="border-t border-gray-300 pt-2 flex justify-between text-base"><span className="font-black text-gray-900">Total</span><span className="font-black text-brand-blue">₹{getTotalBill()}</span></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setBookingStep(1)} className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition">Back</button>
                    <button type="button" onClick={handleFinalBook} disabled={!selectedService}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition shadow-md flex justify-center items-center gap-2 ${selectedService ? 'bg-brand-teal hover:bg-teal-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                      Confirm Booking <CheckCircle size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {bookingStep === 3 && (
                <div className="text-center py-8">
                  <div className="bg-green-100 p-5 rounded-full inline-block mb-4"><CheckCircle size={48} className="text-green-600" /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed! 🎉</h3>
                  <p className="text-gray-500 text-sm mb-2">Thank you, <strong>{bookingForm.name}</strong>! Your request has been sent.</p>
                  <p className="text-gray-400 text-xs">We will contact you at <strong>{bookingForm.phone}</strong> shortly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a href={`https://wa.me/91${siteDetails.phone1}`} target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group">
        <MessageSquare size={26} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Chat on WhatsApp</span>
      </a>

      {/* Full Footer */}
      <footer className="bg-gray-900 border-t-4 border-brand-teal pt-10 pb-6 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src="/images/logo.png" alt="Saini HomeCare" className="h-8 w-auto" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Your trusted local experts for all home appliance repair and electrical needs in Bharatpur.</p>
            </div>
            {/* Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="flex items-center gap-2 hover:text-white transition"><ArrowRight size={12} className="text-brand-teal" /> AC Repair</a></li>
                <li><a href="#services" className="flex items-center gap-2 hover:text-white transition"><ArrowRight size={12} className="text-brand-teal" /> Refrigerator</a></li>
                <li><a href="#services" className="flex items-center gap-2 hover:text-white transition"><ArrowRight size={12} className="text-brand-teal" /> Washing Machine</a></li>
                <li><a href="#services" className="flex items-center gap-2 hover:text-white transition"><ArrowRight size={12} className="text-brand-teal" /> Electrical Work</a></li>
                <li><a href="#services" className="flex items-center gap-2 hover:text-white transition"><ArrowRight size={12} className="text-brand-teal" /> Geyser Service</a></li>
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><MapPin size={14} className="text-brand-teal mt-0.5 flex-shrink-0" /><span>{siteDetails.address}</span></li>
                <li className="flex items-center gap-2"><Phone size={14} className="text-brand-teal flex-shrink-0" /><span>{siteDetails.phone1}, {siteDetails.phone2}</span></li>
                <li className="flex items-center gap-2"><Clock size={14} className="text-brand-teal flex-shrink-0" /><span>{siteDetails.timing}</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-2">
            <p>© 2026 Saini HomeCare. All Rights Reserved.</p>
            <p>Made with ❤️ in Bharatpur</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
