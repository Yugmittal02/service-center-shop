import React, { useState, useContext } from 'react';
import { 
  Menu, X, Phone, MapPin, Clock, Settings, Wrench, Thermometer, 
  Zap, ArrowRight, CheckCircle, ShieldCheck, ThumbsUp, Truck, 
  Star, PhoneCall, MessageSquare 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import JustdialProfile from '../components/JustdialProfile';
import GoogleRating from '../components/GoogleRating';
import VisitingCard from '../components/VisitingCard';

export default function Home() {
  const { appData, addBooking } = useContext(AppContext);
  const { siteDetails, services, coupons } = appData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    const total = getServicePrice(selectedService) - getDiscount();
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
      discount: getDiscount(),
      totalBill: getTotalBill()
    });
    setBookingStep(3);
    toast.success('🎉 Booking confirmed successfully!');
    // Auto-reset after 6 seconds
    setTimeout(() => {
      setBookingStep(1);
      setBookingForm({ name: '', phone: '', message: '' });
      setSelectedService(null);
      setCouponCode('');
      setAppliedCoupon(null);
    }, 6000);
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
            <a href="#" className="flex items-center gap-2.5">
              <div className="bg-brand-teal p-1.5 rounded-lg"><Wrench className="text-white h-5 w-5" /></div>
              <div>
                <h1 className="text-lg md:text-xl font-extrabold text-brand-blue leading-tight">Saini Refrigeration</h1>
                <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">& Electricals</p>
              </div>
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
                Expert <span className="text-brand-teal">Refrigeration & Electrical</span> Services in Bharatpur
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md mx-auto lg:mx-0 leading-relaxed">
                {siteDetails.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a href="#contact" className="bg-brand-blue hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm flex items-center justify-center gap-2">
                  Book Service <ArrowRight size={16} />
                </a>
                <a href={`tel:${siteDetails.phone1}`} className="bg-white border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
                  <Phone size={16} /> Call Now
                </a>
                <a href={`https://wa.me/91${siteDetails.phone1}`} className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="relative px-2 sm:px-0">
              <div className="absolute inset-0 bg-brand-teal rounded-2xl translate-x-2 translate-y-2 opacity-20"></div>
              <img src={siteDetails.heroImage} alt="Repair Service" className="relative rounded-2xl shadow-md object-cover h-[240px] sm:h-[300px] md:h-[360px] w-full bg-gray-200" />
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

      {/* Services - 2x2 Grid */}
      <section id="services" className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
            <h2 className="text-brand-teal font-extrabold tracking-wider uppercase text-xs mb-1.5">Our Capabilities</h2>
            <h3 className="text-2xl md:text-3xl font-black text-brand-blue mb-3">Professional Repair Services</h3>
            <p className="text-gray-500 text-sm">Comprehensive repair, installation, and maintenance for home appliances and electrical systems.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group border border-gray-100 flex flex-col">
                <div className="h-32 sm:h-40 md:h-44 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 bg-gray-100" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">{getIcon(service.icon)}</div>
                  <div className="absolute bottom-3 left-3 bg-brand-orange text-white px-2 py-0.5 text-[11px] font-bold rounded-md">{service.price}</div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-brand-blue transition mb-1.5">{service.title}</h4>
                  <p className="text-gray-500 text-xs md:text-sm mb-3 flex-1 leading-relaxed line-clamp-2">{service.description}</p>
                  <a href="#contact" className="inline-flex items-center bg-brand-teal text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-teal-700 transition gap-1.5 w-fit shadow-sm">
                    Book Now <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

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
                Saini Refrigeration & Electricals provides trusted refrigeration, appliance repair, and electrical services across Bharatpur. We handle ACs, refrigerators, washing machines, geysers, deep freezers, wiring, lighting, and earthing work.
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

      {/* Multi-Step Booking */}
      <section id="contact" className="py-10 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-blue rounded-2xl overflow-hidden shadow-lg flex flex-col lg:flex-row">
            {/* Left Info Panel */}
            <div className="w-full lg:w-5/12 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-teal rounded-full opacity-40 blur-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-brand-orange font-extrabold tracking-wider uppercase text-xs mb-1.5">Contact Us</h2>
                <h3 className="text-2xl font-black mb-6">Book Your Service</h3>
                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {[1,2,3].map(s => (
                    <div key={s} className={`flex items-center gap-1.5 ${s <= bookingStep ? 'text-white' : 'text-blue-300/50'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 ${s < bookingStep ? 'bg-green-500 border-green-500' : s === bookingStep ? 'bg-brand-orange border-brand-orange' : 'border-blue-300/50'}`}>{s < bookingStep ? '✓' : s}</div>
                      {s < 3 && <div className={`w-6 h-0.5 ${s < bookingStep ? 'bg-green-500' : 'bg-blue-300/30'}`}></div>}
                    </div>
                  ))}
                  <span className="text-xs font-bold ml-2">{bookingStep === 1 ? 'Details' : bookingStep === 2 ? 'Service & Bill' : 'Done!'}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-blue-900/40 p-4 rounded-xl border border-blue-800/50">
                    <div className="bg-white/10 p-2.5 rounded-lg text-brand-orange"><PhoneCall size={20} /></div>
                    <div><h4 className="font-bold text-sm">Call Direct</h4><p className="text-blue-200 text-sm">{siteDetails.phone1}, {siteDetails.phone2}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2.5 rounded-lg text-brand-orange"><MapPin size={20} /></div>
                    <div><h4 className="font-bold text-sm">Address</h4><p className="text-blue-200 text-sm">{siteDetails.address}</p></div>
                  </div>
                </div>
                <div className="mt-8 flex gap-3">
                  <a href={`tel:${siteDetails.phone1}`} className="flex-1 bg-brand-orange hover:bg-orange-500 py-2.5 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-1.5"><Phone size={16} /> Call</a>
                  <a href={`https://wa.me/91${siteDetails.phone1}`} className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d] py-2.5 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-1.5"><MessageSquare size={16} /> WhatsApp</a>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full lg:w-7/12 bg-white p-8">

              {/* STEP 1: Personal Details */}
              {bookingStep === 1 && (
                <div>
                  <h3 className="text-xl font-black text-brand-blue mb-1">Step 1: Your Details</h3>
                  <p className="text-gray-500 text-sm mb-5">Fill in your name and phone number to get started.</p>
                  <form className="space-y-4" onSubmit={handleStep1Submit}>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Your Name *</label>
                      <input required type="text" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none text-sm bg-gray-50" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                      <input required type="tel" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none text-sm bg-gray-50" placeholder="8209640447" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Message (Optional)</label>
                      <textarea rows="2" value={bookingForm.message} onChange={e => setBookingForm({...bookingForm, message: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none text-sm bg-gray-50 resize-none" placeholder="Describe the issue..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-brand-teal hover:bg-teal-700 text-white py-3 rounded-lg font-bold text-sm transition shadow-md flex justify-center items-center gap-2">
                      Next: Choose Service <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 2: Service Selection + Billing */}
              {bookingStep === 2 && (
                <div>
                  <h3 className="text-xl font-black text-brand-blue mb-1">Step 2: Choose Service</h3>
                  <p className="text-gray-500 text-sm mb-4">Select a service and apply a coupon if you have one.</p>

                  {/* Service Cards */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {services.map(s => (
                      <button key={s.id} type="button" onClick={() => setSelectedService(s)}
                        className={`p-3 rounded-xl border-2 text-left transition ${selectedService?.id === s.id ? 'border-brand-teal bg-brand-teal/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <p className="font-bold text-sm text-gray-900 leading-tight mb-1">{s.title}</p>
                        <p className="text-brand-orange font-black text-base">₹{s.basePrice || 0}</p>
                      </button>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div className="mb-5">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Have a Coupon?</label>
                    <div className="flex gap-2">
                      <input type="text" value={couponCode} onChange={e => { setCouponCode(e.target.value.toUpperCase()); setAppliedCoupon(null); setCouponError(''); }} className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm uppercase bg-gray-50" placeholder="Enter coupon code" />
                      <button type="button" onClick={handleApplyCoupon} className="bg-brand-blue hover:bg-blue-900 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition">Apply</button>
                    </div>
                    {couponError && <p className="text-red-500 text-xs font-bold mt-1">{couponError}</p>}
                    {appliedCoupon && <p className="text-green-600 text-xs font-bold mt-1">✓ Coupon applied! {appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}% OFF` : `₹${appliedCoupon.discountValue} OFF`}</p>}
                  </div>

                  {/* Bill Summary */}
                  {selectedService && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
                      <h4 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider">Bill Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600">{selectedService.title}</span><span className="font-bold">₹{getServicePrice(selectedService)}</span></div>
                        {appliedCoupon && getDiscount() > 0 && (
                          <div className="flex justify-between text-green-600"><span>Discount ({appliedCoupon.code})</span><span className="font-bold">-₹{getDiscount()}</span></div>
                        )}
                        <div className="border-t border-gray-300 pt-2 flex justify-between text-base"><span className="font-black text-gray-900">Total</span><span className="font-black text-brand-blue">₹{getTotalBill()}</span></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setBookingStep(1)} className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition">Back</button>
                    <button type="button" onClick={handleFinalBook} disabled={!selectedService}
                      className={`flex-1 py-3 rounded-lg font-bold text-sm transition shadow-md flex justify-center items-center gap-2 ${selectedService ? 'bg-brand-teal hover:bg-teal-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                      Confirm Booking <CheckCircle size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Confirmation */}
              {bookingStep === 3 && (
                <div className="text-center py-10">
                  <div className="bg-green-100 p-5 rounded-full inline-block mb-4"><CheckCircle size={48} className="text-green-600" /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed! 🎉</h3>
                  <p className="text-gray-500 text-sm mb-2">Thank you, <strong>{bookingForm.name}</strong>! Your request has been sent.</p>
                  <p className="text-gray-400 text-xs">We will contact you at <strong>{bookingForm.phone}</strong> shortly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full Footer */}
      <footer className="bg-gray-900 border-t-4 border-brand-teal pt-10 pb-6 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-brand-teal p-1.5 rounded-lg"><Wrench className="text-white h-4 w-4" /></div>
                <h2 className="text-lg font-black text-white">Saini.</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Your trusted local experts for all refrigeration, appliance, and electrical repair needs in Bharatpur.</p>
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
            <p>© 2026 Saini Refrigeration & Electricals. All Rights Reserved.</p>
            <p>Made with ❤️ in Bharatpur</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
