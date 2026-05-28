import React, { useState } from 'react';
import { 
  Menu, X, Phone, MapPin, Clock, Settings, Wrench, Thermometer, 
  Zap, ArrowRight, CheckCircle, Search, ShieldCheck, ThumbsUp, Truck, 
  Star, Quote, PhoneCall, Mail, MessageSquare 
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Domain-specific Unsplash images
  const images = {
    hero: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    ac: "https://images.unsplash.com/photo-1600493033157-1d8f2649c1f5?auto=format&fit=crop&w=800&q=80",
    fridge: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    washing: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    elec: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    about1: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
    about2: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527515637462-daf49dced72f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600493033157-1d8f2649c1f5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80"
    ]
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 overflow-x-hidden">
      {/* Top Bar - Hidden on small mobile */}
      <div className="bg-brand-blue text-white py-2 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm md:text-base">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={18} />
              <span className="font-medium">8209640447, 9782311637</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={18} />
              <span>9:00 AM – 8:00 PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={18} />
            <span>Bapu Nagar, Vivek Vihar Colony, Bharatpur</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center gap-3">
                <div className="bg-brand-teal p-2 md:p-3 rounded-xl shadow-sm">
                  <Wrench className="text-white h-7 w-7 md:h-8 md:w-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-brand-blue leading-tight tracking-tight">
                    Saini Refrigeration
                  </h1>
                  <p className="text-sm text-gray-500 font-semibold tracking-wide uppercase">& Electricals</p>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-brand-teal font-semibold text-lg transition">Home</a>
              <a href="#services" className="text-gray-700 hover:text-brand-teal font-semibold text-lg transition">Services</a>
              <a href="#about" className="text-gray-700 hover:text-brand-teal font-semibold text-lg transition">About</a>
              <a href="#gallery" className="text-gray-700 hover:text-brand-teal font-semibold text-lg transition">Gallery</a>
              <a href="#contact" className="text-gray-700 hover:text-brand-teal font-semibold text-lg transition">Contact</a>
              <a 
                href="tel:8209640447" 
                className="bg-brand-orange hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <PhoneCall size={20} />
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button - Larger click area */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={toggleMenu} 
                className="text-gray-800 bg-gray-100 p-3 rounded-xl hover:bg-brand-blue hover:text-white transition focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl z-40 pb-6">
            <div className="px-6 pt-4 pb-6 space-y-3">
              <a href="#home" onClick={toggleMenu} className="block px-4 py-4 text-xl font-bold text-gray-800 hover:text-brand-teal hover:bg-gray-50 rounded-xl">Home</a>
              <a href="#services" onClick={toggleMenu} className="block px-4 py-4 text-xl font-bold text-gray-800 hover:text-brand-teal hover:bg-gray-50 rounded-xl">Services</a>
              <a href="#about" onClick={toggleMenu} className="block px-4 py-4 text-xl font-bold text-gray-800 hover:text-brand-teal hover:bg-gray-50 rounded-xl">About</a>
              <a href="#gallery" onClick={toggleMenu} className="block px-4 py-4 text-xl font-bold text-gray-800 hover:text-brand-teal hover:bg-gray-50 rounded-xl">Gallery</a>
              <a href="#contact" onClick={toggleMenu} className="block px-4 py-4 text-xl font-bold text-gray-800 hover:text-brand-teal hover:bg-gray-50 rounded-xl">Contact</a>
              
              <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-4">
                <a href="tel:8209640447" className="w-full flex justify-center items-center gap-3 bg-brand-orange text-white px-6 py-4 rounded-xl font-extrabold text-xl shadow-md">
                  <PhoneCall size={24} /> Call Now
                </a>
                <a href="https://wa.me/918209640447" className="w-full flex justify-center items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-xl font-extrabold text-xl shadow-md">
                  <MessageSquare size={24} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-white pt-10 pb-20 md:pt-16 md:pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            <div className="mb-12 lg:mb-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-brand-blue text-sm md:text-base font-bold mb-6 mx-auto lg:mx-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
                </span>
                Available for Service Today
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-blue leading-[1.1] mb-6 md:mb-8">
                Expert Refrigeration & <span className="text-brand-teal block mt-1">Electrical</span> Services in Bharatpur
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Reliable AC, fridge, washing machine, geyser and electrical repair services directly at your doorstep by experienced professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start w-full px-2 sm:px-0">
                <a href="#contact" className="w-full sm:w-auto bg-brand-blue hover:bg-blue-900 text-white px-8 py-4 sm:py-5 rounded-2xl font-extrabold text-center text-lg md:text-xl transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
                  Book Service <ArrowRight size={24} />
                </a>
                <a href="tel:8209640447" className="w-full sm:w-auto bg-white border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white px-8 py-4 sm:py-5 rounded-2xl font-extrabold text-center text-lg md:text-xl transition flex items-center justify-center gap-3 shadow-md hover:shadow-xl">
                  <Phone size={24} /> Call Now
                </a>
              </div>

              {/* Trust Badges - Stack nicely on mobile */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 bg-gray-50 py-4 px-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-brand-teal w-6 h-6" />
                  <span className="text-base font-bold text-gray-800">Same Day Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-brand-teal w-6 h-6" />
                  <span className="text-base font-bold text-gray-800">10+ Yrs Exp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-brand-teal w-6 h-6" />
                  <span className="text-base font-bold text-gray-800">Fair Pricing</span>
                </div>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0 px-2 sm:px-0">
              <div className="absolute inset-0 bg-brand-teal rounded-[2rem] transform translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 opacity-20"></div>
              <img 
                src={images.hero} 
                alt="Professional Technician Repairing Equipment" 
                className="relative rounded-[2rem] shadow-2xl object-cover h-[350px] sm:h-[450px] md:h-[550px] w-full bg-gray-200"
              />
              
              <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-50 w-64">
                <div className="bg-brand-orange text-white p-3 sm:p-4 rounded-xl shadow-inner">
                  <Star fill="currentColor" size={28} />
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-xl md:text-2xl leading-none mb-1">10+ Years</p>
                  <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-wider">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <h2 className="text-brand-teal font-extrabold tracking-widest uppercase text-sm md:text-base mb-3">Our Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-blue mb-6">Professional Repair Services</h3>
            <p className="text-gray-600 text-lg md:text-xl font-medium px-4">We provide comprehensive repair, installation, and maintenance for home appliances and electrical systems.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
            {/* Service 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group flex flex-col h-full border border-gray-100">
              <div className="h-64 sm:h-72 overflow-hidden relative border-b border-gray-100 w-full group-hover:opacity-90">
                <img src={images.ac} alt="AC Repair Service" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 bg-gray-200" />
                <div className="absolute top-5 right-5 bg-white p-3 rounded-2xl shadow-lg">
                  <Thermometer className="text-brand-teal h-8 w-8" />
                </div>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-brand-blue transition">AC Repair & Installation</h4>
                <p className="text-gray-600 text-lg md:text-xl mb-8 flex-1 leading-relaxed">AC servicing, gas filling, installation, cooling issue repair, and underground AC piping.</p>
                <a href="#contact" className="inline-flex items-center text-brand-teal font-extrabold text-lg md:text-xl hover:text-brand-orange transition gap-2 bg-teal-50 w-fit px-6 py-3 rounded-xl group-hover:bg-brand-teal group-hover:text-white">
                  Book Now <ArrowRight size={20} />
                </a>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group flex flex-col h-full border border-gray-100">
              <div className="h-64 sm:h-72 overflow-hidden relative border-b border-gray-100 w-full group-hover:opacity-90">
                <img src={images.fridge} alt="Refrigerator Service" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 bg-gray-200" />
                <div className="absolute top-5 right-5 bg-white p-3 rounded-2xl shadow-lg">
                  <ShieldCheck className="text-brand-teal h-8 w-8" />
                </div>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-brand-blue transition">Refrigerator & Deep Freezer</h4>
                <p className="text-gray-600 text-lg md:text-xl mb-8 flex-1 leading-relaxed">Fridge repair, deep freezer repair, compressor issues, cooling problems, and maintenance.</p>
                <a href="#contact" className="inline-flex items-center text-brand-teal font-extrabold text-lg md:text-xl hover:text-brand-orange transition gap-2 bg-teal-50 w-fit px-6 py-3 rounded-xl group-hover:bg-brand-teal group-hover:text-white">
                  Book Now <ArrowRight size={20} />
                </a>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group flex flex-col h-full border border-gray-100">
              <div className="h-64 sm:h-72 overflow-hidden relative border-b border-gray-100 w-full group-hover:opacity-90">
                <img src={images.washing} alt="Washing Machine Service" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 bg-gray-200" />
                <div className="absolute top-5 right-5 bg-white p-3 rounded-2xl shadow-lg">
                  <Settings className="text-brand-teal h-8 w-8" />
                </div>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-brand-blue transition">Washing Machine & Geyser</h4>
                <p className="text-gray-600 text-lg md:text-xl mb-8 flex-1 leading-relaxed">Washing machine servicing, motor repair, geyser installation, heating issue repair.</p>
                <a href="#contact" className="inline-flex items-center text-brand-teal font-extrabold text-lg md:text-xl hover:text-brand-orange transition gap-2 bg-teal-50 w-fit px-6 py-3 rounded-xl group-hover:bg-brand-teal group-hover:text-white">
                  Book Now <ArrowRight size={20} />
                </a>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group flex flex-col h-full border border-gray-100">
              <div className="h-64 sm:h-72 overflow-hidden relative border-b border-gray-100 w-full group-hover:opacity-90">
                <img src={images.elec} alt="Electrical Service" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 bg-gray-200" />
                <div className="absolute top-5 right-5 bg-white p-3 rounded-2xl shadow-lg">
                  <Zap className="text-brand-teal h-8 w-8" />
                </div>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-brand-blue transition">Electrical & Wiring</h4>
                <p className="text-gray-600 text-lg md:text-xl mb-8 flex-1 leading-relaxed">Underground wiring, open light fitting, switchboard repair, LPG piping, chemical earthing.</p>
                <a href="#contact" className="inline-flex items-center text-brand-teal font-extrabold text-lg md:text-xl hover:text-brand-orange transition gap-2 bg-teal-50 w-fit px-6 py-3 rounded-xl group-hover:bg-brand-teal group-hover:text-white">
                  Book Now <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Bharatpur Focus */}
      <section className="py-20 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-brand-teal font-extrabold tracking-widest uppercase text-sm md:text-base mb-3">Trusted in Bharatpur</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-blue mb-5">Safety-First Service You Can Rely On</h3>
            <p className="text-gray-600 text-lg md:text-xl font-medium">Local technicians, verified workmanship, and clear communication for every visit.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-brand-blue h-7 w-7" />
              </div>
              <h4 className="text-2xl font-black text-gray-900 mb-3">Safe Repair Promise</h4>
              <p className="text-gray-600 text-lg leading-relaxed">ESD-safe handling, proper insulation checks, and careful testing before handover.</p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="bg-teal-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <ThumbsUp className="text-brand-teal h-7 w-7" />
              </div>
              <h4 className="text-2xl font-black text-gray-900 mb-3">Trusted by Locals</h4>
              <p className="text-gray-600 text-lg leading-relaxed">Serving homes and shops across Bharatpur with honest advice and fair pricing.</p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="text-brand-orange h-7 w-7" />
              </div>
              <h4 className="text-2xl font-black text-gray-900 mb-3">Bharatpur Coverage</h4>
              <p className="text-gray-600 text-lg leading-relaxed">Fast response in Bapu Nagar, Vivek Vihar Colony, and nearby areas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            <div className="relative mb-16 lg:mb-0 order-2 lg:order-1 px-2">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <img src={images.about1} alt="Technician working" className="rounded-3xl shadow-xl h-48 md:h-72 w-full object-cover bg-gray-200" />
                <img src={images.about2} alt="Tools and parts" className="rounded-3xl shadow-xl h-48 md:h-72 w-full object-cover mt-10 md:mt-16 bg-gray-200" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-6 md:p-8 shadow-2xl border-4 md:border-[6px] border-brand-teal">
                <div className="text-center w-max">
                  <span className="block text-4xl md:text-5xl font-black text-brand-blue leading-none mb-1">10+</span>
                  <span className="text-sm md:text-base font-bold text-brand-orange uppercase tracking-widest leading-none">Years</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 px-2">
              <h2 className="text-brand-teal font-extrabold tracking-widest uppercase text-sm md:text-base mb-3">About Our Company</h2>
              <h3 className="text-4xl md:text-5xl font-black text-brand-blue mb-8 leading-tight">Trusted Repair Experts in Bharatpur</h3>
              <p className="text-gray-600 text-lg md:text-xl mb-6 leading-relaxed font-medium">
                Saini Refrigeration & Electricals provides trusted refrigeration, appliance repair, and electrical services across Bharatpur. 
                We are dedicated to delivering high-quality workmanship with a focus on customer satisfaction and safety.
              </p>
              <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed font-medium">
                We handle ACs, refrigerators, washing machines, geysers, deep freezers, wiring, lighting, and earthing work with experienced technicians and affordable pricing.
              </p>
              
              <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-4 rounded-2xl">
                    <CheckCircle className="text-brand-blue h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xl text-gray-900 mb-1">1000+ Happy</h4>
                    <p className="text-base font-semibold text-gray-500">Customers served</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-4 rounded-2xl">
                    <Truck className="text-brand-orange h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xl text-gray-900 mb-1">Fast Service</h4>
                    <p className="text-base font-semibold text-gray-500">Right at your home</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 lg:py-28 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <h2 className="text-brand-teal font-extrabold tracking-widest uppercase text-sm md:text-base mb-3">Our Quality Work</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-blue mb-4">Project Gallery</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {images.gallery.map((src, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <img src={src} alt="Work example" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 bg-gray-200" />
                <div className="absolute inset-0 bg-brand-blue/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-full shadow-lg transform scale-50 group-hover:scale-100 transition duration-300 delay-100">
                    <Search className="text-brand-teal h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-brand-blue rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            
            {/* Contact Info */}
            <div className="w-full lg:w-5/12 p-10 sm:p-14 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-teal rounded-full opacity-50 blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-brand-orange font-extrabold tracking-widest uppercase text-sm mb-3">Contact Us</h2>
                <h3 className="text-4xl md:text-5xl font-black mb-4">Book Your Service</h3>
                <p className="text-blue-100 text-lg md:text-xl mb-12 font-medium">Get your appliances running perfectly again. Fast response guaranteed.</p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 bg-blue-900/50 p-6 rounded-2xl border border-blue-800">
                    <div className="bg-white/10 p-4 rounded-xl flex-shrink-0 text-brand-orange">
                      <PhoneCall size={32} />
                    </div>
                    <div>
                      <h4 className="font-extrabold pb-1 text-xl">Call Direct</h4>
                      <p className="text-blue-100 font-bold text-lg">8209640447, 9782311637</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="bg-white/10 p-4 rounded-xl flex-shrink-0 text-brand-orange">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="font-extrabold pb-1 text-xl">Address</h4>
                      <p className="text-blue-100 font-semibold text-base md:text-lg">Bapu Nagar, Vivek Vihar Colony,<br/>H.No. 186, Bharatpur, Rajasthan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="bg-white/10 p-4 rounded-xl flex-shrink-0 text-brand-orange">
                      <Clock size={28} />
                    </div>
                    <div>
                      <h4 className="font-extrabold pb-1 text-xl">Timing</h4>
                      <p className="text-blue-100 font-semibold text-base md:text-lg">Everyday: 9:00 AM – 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-14 relative z-10 flex flex-col sm:flex-row gap-4 w-full">
                <a href="tel:8209640447" className="w-full flex-1 bg-brand-orange hover:bg-orange-500 py-4 rounded-2xl font-extrabold text-xl text-center transition flex justify-center items-center gap-3">
                  <Phone size={24} /> Call Now
                </a>
                <a href="https://wa.me/918209640447" className="w-full flex-1 bg-[#25D366] hover:bg-[#1ebe5d] py-4 rounded-2xl font-extrabold text-xl text-center transition flex justify-center items-center gap-3 text-white">
                  <MessageSquare size={24} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-7/12 bg-white p-10 sm:p-14 lg:p-16">
              <h3 className="text-3xl font-black text-brand-blue mb-8">Send a Request</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-base font-bold text-gray-700 mb-2">Your Name</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-brand-teal/20 focus:border-brand-teal outline-none transition bg-gray-50 font-medium text-lg" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-base font-bold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-brand-teal/20 focus:border-brand-teal outline-none transition bg-gray-50 font-medium text-lg" placeholder="8209640447" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-base font-bold text-gray-700 mb-2">Select Service</label>
                  <div className="relative">
                    <select className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-brand-teal/20 focus:border-brand-teal outline-none transition bg-gray-50 font-bold text-lg text-gray-800 appearance-none cursor-pointer">
                      <option>AC Repair & Installation</option>
                      <option>Refrigerator & Deep Freezer</option>
                      <option>Washing Machine Repair</option>
                      <option>Geyser Service</option>
                      <option>Electrical Work & Wiring</option>
                      <option>Other Services</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-gray-500">
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-base font-bold text-gray-700 mb-2">Message (Optional)</label>
                  <textarea rows="4" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-brand-teal/20 focus:border-brand-teal outline-none transition bg-gray-50 font-medium text-lg resize-none" placeholder="Describe the issue with your appliance..."></textarea>
                </div>
                
                <button type="button" className="w-full bg-brand-teal hover:bg-teal-700 text-white py-5 rounded-xl font-extrabold text-xl transition shadow-xl hover:shadow-2xl mt-4 flex justify-center items-center gap-2">
                  Submit Request <ArrowRight size={24} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t-8 border-brand-teal pt-20 pb-10 text-gray-300 font-medium">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6 bg-gray-800 w-fit p-3 rounded-2xl">
                <div className="bg-brand-teal p-2 rounded-xl">
                  <Wrench className="text-white h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Saini.</h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Your trusted local experts for all refrigeration, home appliance, and electrical repair needs in Bharatpur.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-extrabold mb-8 text-xl uppercase tracking-widest text-brand-orange">Links</h4>
              <ul className="space-y-4 text-lg">
                <li><a href="#home" className="hover:text-white hover:underline transition">Home</a></li>
                <li><a href="#about" className="hover:text-white hover:underline transition">About Us</a></li>
                <li><a href="#services" className="hover:text-white hover:underline transition">Our Services</a></li>
                <li><a href="#contact" className="hover:text-white hover:underline transition">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-extrabold mb-8 text-xl uppercase tracking-widest text-brand-orange">Services</h4>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3"><ArrowRight size={18} className="text-brand-teal" /> AC Repair</li>
                <li className="flex items-center gap-3"><ArrowRight size={18} className="text-brand-teal" /> Refrigerator</li>
                <li className="flex items-center gap-3"><ArrowRight size={18} className="text-brand-teal" /> Washing Machine</li>
                <li className="flex items-center gap-3"><ArrowRight size={18} className="text-brand-teal" /> Electrical Fitting</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-extrabold mb-8 text-xl uppercase tracking-widest text-brand-orange">Contact</h4>
              <ul className="space-y-5 text-lg">
                <li className="flex items-start gap-4">
                  <MapPin className="text-brand-teal mt-1 flex-shrink-0 bg-gray-800 p-1.5 rounded-full" size={28} />
                  <span>Bapu Nagar, Vivek Vihar Colony, H.No. 186, Bharatpur, Rajasthan</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="text-brand-teal flex-shrink-0 bg-gray-800 p-1.5 rounded-full" size={28} />
                  <span>8209640447, 9782311637</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-base text-gray-500">
            <p>© 2026 Saini Refrigeration & Electricals. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
