import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { LayoutDashboard, Settings, Image as ImageIcon, LogOut, Trash2, Plus, RefreshCw, Phone, Menu, X, Tag, IndianRupee, FileText, CheckCircle, Users, Search, Download, MessageCircle } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

export default function Admin() {
  const { appData, updateSiteDetails, addService, updateService, deleteService, updateBookingStatus, addCoupon, toggleCouponStatus, deleteCoupon, deleteBooking, updateNotepad, addManualBooking, updateCommissionPercent } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('bookings');
  const [localSiteDetails, setLocalSiteDetails] = useState(appData.siteDetails || {});
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Completion Modal State
  const [completeModal, setCompleteModal] = useState(null);
  const [modalCostOfGoods, setModalCostOfGoods] = useState('');
  const [modalCostOfService, setModalCostOfService] = useState('');
  const [modalServices, setModalServices] = useState([]);
  const [modalApplianceModel, setModalApplianceModel] = useState('');
  const [modalNotes, setModalNotes] = useState('');

  // Manual Booking Modal State
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualCostOfGoods, setManualCostOfGoods] = useState('');
  const [manualCostOfService, setManualCostOfService] = useState('');

  // Users Tab State
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const invoiceRef = useRef(null);
  const [invoiceData, setInvoiceData] = useState(null);

  const commPct = appData.commissionPercent || 10;

  useEffect(() => {
    setLastRefresh(new Date());
    setLocalSiteDetails(appData.siteDetails || {});
  }, [appData]);

  const handleSiteDetailsSave = (e) => {
    e.preventDefault();
    updateSiteDetails(localSiteDetails);
    toast.success('Site details updated!');
  };

  const handleDeleteService = (id, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteService(id);
      toast.success('Service deleted!');
    }
  };

  // Open modal instead of window.prompt
  const handleBookingStatusChange = (booking, newStatus) => {
    if (newStatus === 'Completed' && booking.status !== 'Completed') {
      setCompleteModal(booking);
      setModalCostOfGoods('');
      setModalCostOfService('');
      setModalServices([booking.service]);
      setModalApplianceModel('');
      setModalNotes('');
    } else {
      updateBookingStatus(booking.id, newStatus);
      toast.info(`Status changed to ${newStatus}`);
    }
  };

  const handleCompleteSubmit = () => {
    if (!completeModal) return;
    const goods = parseFloat(modalCostOfGoods) || 0;
    const serviceCost = parseFloat(modalCostOfService) || 0;
    const pay = goods + serviceCost;
    
    updateBookingStatus(completeModal.id, 'Completed', pay, {
      applianceModel: modalApplianceModel,
      completionNotes: modalNotes,
      completedServices: modalServices,
      costOfGoods: goods,
      costOfService: serviceCost
    });
    toast.success(`Booking completed! Payment: ₹${pay}, Commission: ₹${Math.round(serviceCost * commPct / 100)}`);
    setCompleteModal(null);
  };

  const toggleModalService = (title) => {
    setModalServices(prev => prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]);
  };

  const pendingCount = (appData.bookings || []).filter(b => b.status === 'Pending').length;
  const completedBookings = (appData.bookings || []).filter(b => b.status === 'Completed');
  
  const totalRevenue = completedBookings.reduce((sum, b) => sum + (parseFloat(b.paymentReceived) || 0), 0);
  const totalCommission = completedBookings.reduce((sum, b) => sum + (parseFloat(b.commissionEarned) || 0), 0);

  // Group users by phone
  const usersByPhone = (appData.bookings || []).reduce((acc, booking) => {
    const phone = booking.phone;
    if (!phone) return acc;
    if (!acc[phone]) acc[phone] = { phone, name: booking.name, bookings: [] };
    acc[phone].bookings.push(booking);
    return acc;
  }, {});
  
  const usersList = Object.values(usersByPhone)
    .filter(u => {
      const q = searchQuery.toLowerCase();
      return (u.name || '').toLowerCase().includes(q) || u.phone.includes(q);
    })
    .sort((a, b) => b.bookings.length - a.bookings.length);
    
  const [selectedUserPhone, setSelectedUserPhone] = useState(null);

  // Invoice Generation Logic
  const handleGenerateInvoice = async (booking, user) => {
    setInvoiceData({ booking, user });
    setIsGeneratingInvoice(true);
    
    // Give react time to render the hidden invoice
    setTimeout(async () => {
      if (invoiceRef.current) {
        try {
          const imgData = await htmlToImage.toJpeg(invoiceRef.current, { quality: 0.95, pixelRatio: 2 });
          
          // Trigger download
          const link = document.createElement('a');
          link.download = `Invoice_${booking.id}.jpg`;
          link.href = imgData;
          link.click();
          
          // Open WhatsApp - clean phone number
          const cleanPhone = user.phone.replace(/\D/g, '').replace(/^0+/, '');
          const phoneWithCode = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
          const text = `Hello ${user.name},\n\nHere is the summary of your service on ${new Date(booking.date).toLocaleDateString()}:\n\nService: ${booking.service}\nAmount: ₹${booking.paymentReceived}\n\nPlease find the attached detailed invoice image.\n\nThank you for choosing Saini Refrigeration!`;
          const waLink = `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(text)}`;
          window.open(waLink, '_blank');
          
          toast.success('Invoice generated and WhatsApp opened!');
        } catch (error) {
          console.error("Invoice generation failed", error);
          toast.error('Failed to generate invoice image.');
        } finally {
          setIsGeneratingInvoice(false);
          setInvoiceData(null);
        }
      }
    }, 500);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ===== COMPLETION MODAL ===== */}
      {completeModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={() => setCompleteModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setCompleteModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X size={20} /></button>
            <h3 className="text-xl font-black text-gray-900 mb-1">Complete Booking</h3>
            <p className="text-sm text-gray-500 mb-5">Customer: <strong>{completeModal.name}</strong> | {completeModal.phone}</p>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Services Provided (select all that apply)</label>
              <div className="grid grid-cols-2 gap-2">
                {(appData.services || []).map(s => (
                  <button key={s.id} type="button" onClick={() => toggleModalService(s.title)}
                    className={`p-2.5 rounded-lg border-2 text-left text-sm font-semibold transition ${modalServices.includes(s.title) ? 'border-brand-teal bg-brand-teal/5 text-brand-teal' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Appliance Model & Extra Details</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" value={modalApplianceModel} onChange={e => setModalApplianceModel(e.target.value)} placeholder="Model No. (e.g., LG-XYZ123)" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
                <input type="text" value={modalNotes} onChange={e => setModalNotes(e.target.value)} placeholder="Repair notes or warranty details..." className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Payment Breakdown</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">Cost of Goods (₹)</label>
                  <input type="number" value={modalCostOfGoods} onChange={e => setModalCostOfGoods(e.target.value)} placeholder="0" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-brand-teal outline-none text-lg font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">Cost of Service (₹)</label>
                  <input type="number" value={modalCostOfService} onChange={e => setModalCostOfService(e.target.value)} placeholder="0" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-brand-teal outline-none text-lg font-bold" autoFocus />
                </div>
              </div>
            </div>

            {(modalCostOfGoods || modalCostOfService) ? (
              <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-200">
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">Total Payment</span><span className="font-bold text-green-600">₹{(parseFloat(modalCostOfGoods) || 0) + (parseFloat(modalCostOfService) || 0)}</span></div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">Commission ({commPct}% on Service)</span><span className="font-bold text-blue-600">₹{Math.round((parseFloat(modalCostOfService) || 0) * commPct / 100)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Services</span><span className="font-bold text-gray-900">{modalServices.join(', ') || '-'}</span></div>
              </div>
            ) : null}

            <div className="flex gap-3">
              <button onClick={() => setCompleteModal(null)} className="px-5 py-2.5 rounded-lg border border-gray-300 font-bold text-sm text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleCompleteSubmit} disabled={!modalCostOfGoods && !modalCostOfService} className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 ${(modalCostOfGoods || modalCostOfService) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                <CheckCircle size={16} /> Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MANUAL BOOKING MODAL ===== */}
      {showManualModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={() => setShowManualModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowManualModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X size={20} /></button>
            <h3 className="text-xl font-black text-brand-teal mb-1 flex items-center gap-2"><Plus size={20} /> Add Manual Entry</h3>
            <p className="text-sm text-gray-500 mb-5">Create a completed booking manually.</p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                addManualBooking({
                  name: form.customerName.value,
                  phone: form.phone.value,
                  service: form.service.value,
                  costOfGoods: manualCostOfGoods,
                  costOfService: manualCostOfService,
                  message: form.message.value
                });
                setShowManualModal(false);
                setManualCostOfGoods('');
                setManualCostOfService('');
                toast.success('Manual entry added!');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Customer Name *</label>
                  <input required name="customerName" type="text" placeholder="John Doe" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number *</label>
                  <input required name="phone" type="tel" placeholder="9999999999" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Service *</label>
                <select required name="service" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm bg-white">
                  <option value="">Select Service...</option>
                  {(appData.services || []).map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Payment Breakdown</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Cost of Goods (₹)</label>
                    <input type="number" value={manualCostOfGoods} onChange={e => setManualCostOfGoods(e.target.value)} placeholder="0" className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm font-bold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Cost of Service (₹) *</label>
                    <input required type="number" value={manualCostOfService} onChange={e => setManualCostOfService(e.target.value)} placeholder="0" className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm font-bold" />
                  </div>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Total Payment:</span>
                  <span className="font-bold text-green-600">₹{(parseFloat(manualCostOfGoods) || 0) + (parseFloat(manualCostOfService) || 0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Commission ({commPct}% on Service):</span>
                  <span className="font-bold text-blue-600">₹{Math.round((parseFloat(manualCostOfService) || 0) * commPct / 100)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Note / Details</label>
                <input name="message" type="text" placeholder="Optional notes..." className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowManualModal(false)} className="px-5 py-2.5 rounded-lg border border-gray-300 font-bold text-sm text-gray-600 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-brand-teal hover:bg-teal-700 text-white py-2.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> Save Manual Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-300 ease-in-out w-64 bg-gray-900 text-white flex flex-col shadow-xl z-50 flex-shrink-0`}>
        <div className="p-5 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black text-brand-teal">Saini Admin</h2>
            <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest font-bold">Control Panel</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { key: 'bookings', icon: <LayoutDashboard size={18} />, label: 'Bookings', badge: pendingCount },
            { key: 'payments', icon: <IndianRupee size={18} />, label: 'Payments & Comm.' },
            { key: 'users', icon: <Users size={18} />, label: 'Customers' },
            { key: 'coupons', icon: <Tag size={18} />, label: 'Coupons' },
            { key: 'notepad', icon: <FileText size={18} />, label: 'Notepad' },
            { key: 'services', icon: <ImageIcon size={18} />, label: 'Services' },
            { key: 'general', icon: <Settings size={18} />, label: 'General' },
          ].map(tab => (
            <button key={tab.key}
              onClick={() => { setActiveTab(tab.key); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-semibold text-sm transition ${activeTab === tab.key ? 'bg-brand-teal text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              <span className="flex items-center gap-2.5">{tab.icon} {tab.label}</span>
              {tab.badge > 0 && <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{tab.badge}</span>}
            </button>
          ))}
        </nav>
        
        {/* Auto-refresh indicator */}
        <div className="px-4 py-2 border-t border-gray-800 text-[10px] text-gray-500 flex items-center gap-1.5">
          <RefreshCw size={10} className="animate-spin" /> Auto-sync: {lastRefresh.toLocaleTimeString()}
        </div>

        <div className="p-3 border-t border-gray-800">
          <Link to="/" className="w-full flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2.5 rounded-lg font-semibold text-sm transition">
            <LogOut size={16} /> Back to Site
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center sticky top-0 z-30 shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-gray-900 mr-3">
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-black text-brand-blue">Saini Admin</h2>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
        
        {/* ========== BOOKINGS TAB ========== */}
        {activeTab === 'bookings' && (
          <div>
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Booking Requests</h3>
                <p className="text-gray-500 text-sm">Manage incoming service requests. Set to Completed to record payment.</p>
              </div>
              <div className="text-sm text-gray-400 font-medium">{(appData.bookings || []).length} total</div>
            </div>

            {/* Quick Dashboard Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-xs font-bold text-orange-500 uppercase">Pending</p>
                <h4 className="text-2xl font-black text-orange-700">{pendingCount}</h4>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-500 uppercase">In Progress</p>
                <h4 className="text-2xl font-black text-blue-700">{(appData.bookings || []).filter(b => b.status === 'In Progress').length}</h4>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-xs font-bold text-green-500 uppercase">Completed</p>
                <h4 className="text-2xl font-black text-green-700">{completedBookings.length}</h4>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase">Revenue</p>
                <h4 className="text-2xl font-black text-gray-900">₹{totalRevenue}</h4>
              </div>
            </div>

            {/* Manual Booking Button */}
            <div className="mb-8">
              <button onClick={() => setShowManualModal(true)} className="bg-brand-teal hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition flex items-center gap-2 shadow-sm">
                <Plus size={18} /> Add Manual Booking Entry
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {(appData.bookings || []).length === 0 ? (
                <div className="p-10 text-center text-gray-400 font-semibold">No booking requests yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                        <th className="p-4">Customer</th>
                        <th className="p-4">Service</th>
                        <th className="p-4">Message / Coupon</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(appData.bookings || []).map(booking => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                          <td className="p-4">
                            <p className="font-bold text-sm text-gray-900">{booking.name}</p>
                            <p className="text-xs text-gray-500">{booking.phone}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{new Date(booking.date).toLocaleString()}</p>
                          </td>
                          <td className="p-4 font-semibold text-sm text-gray-800">{booking.service}</td>
                          <td className="p-4">
                            <p className="text-gray-500 text-xs max-w-[200px] truncate" title={booking.message}>{booking.message || '-'}</p>
                            {booking.coupon && <span className="inline-block mt-1 bg-brand-teal/10 text-brand-teal text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-teal/20">Coupon: {booking.coupon}</span>}
                            {booking.isManual && <span className="inline-block mt-1 bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200 ml-1">Manual Entry</span>}
                          </td>
                          <td className="p-4">
                            <select 
                              value={booking.status}
                              onChange={(e) => handleBookingStatusChange(booking, e.target.value)}
                              className={`font-bold text-xs px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                                booking.status === 'Completed' ? 'border-green-200 text-green-700 bg-green-50' : 
                                booking.status === 'In Progress' ? 'border-blue-200 text-blue-700 bg-blue-50' : 
                                'border-orange-200 text-orange-700 bg-orange-50'
                              }`}
                            >
                              <option>Pending</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                              <option>Cancelled</option>
                            </select>
                            {booking.status === 'Completed' && (
                              <p className="text-[10px] font-bold text-gray-500 mt-1 whitespace-nowrap">Paid: ₹{booking.paymentReceived}</p>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <a href={`tel:${booking.phone}`} className="text-brand-teal hover:bg-teal-50 p-1.5 rounded-lg transition border border-brand-teal/20" title="Call Customer">
                                <Phone size={16} /> <span className="sr-only">Call</span>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== PAYMENTS TAB ========== */}
        {activeTab === 'payments' && (
          <div>
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Payments & Commissions</h3>
                <p className="text-gray-500 text-sm">Track revenue and agent commissions automatically.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div className="bg-green-100 text-green-600 p-4 rounded-xl"><IndianRupee size={28} /></div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue</p>
                  <h4 className="text-3xl font-black text-gray-900">₹{totalRevenue}</h4>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl"><IndianRupee size={28} /></div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Commission ({commPct}%)</p>
                  <h4 className="text-3xl font-black text-gray-900">₹{totalCommission}</h4>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Commission Rate</p>
                <div className="flex items-center gap-2">
                  <input type="number" value={commPct} onChange={e => updateCommissionPercent(e.target.value)} className="w-20 px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-brand-teal outline-none text-lg font-black text-center" />
                  <span className="text-xl font-black text-gray-500">%</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Applied on Cost of Service only</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {completedBookings.length === 0 ? (
                <div className="p-10 text-center text-gray-400 font-semibold">No completed payments yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                        <th className="p-4">Completed Date</th>
                        <th className="p-4">Customer & Service</th>
                        <th className="p-4 text-right">Payment Recv.</th>
                        <th className="p-4 text-right">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedBookings.map(booking => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                          <td className="p-4">
                            <p className="font-bold text-sm text-gray-900">{new Date(booking.completedDate || booking.date).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">{new Date(booking.completedDate || booking.date).toLocaleTimeString()}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-sm text-gray-900">{booking.name} {booking.isManual && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-1 font-bold border border-gray-200">Manual</span>}</p>
                            <p className="text-xs text-gray-500">{booking.service}</p>
                          </td>
                          <td className="p-4 text-right font-black text-green-600">₹{booking.paymentReceived || 0}</td>
                          <td className="p-4 text-right font-black text-blue-600">₹{booking.commissionEarned || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== COUPONS TAB ========== */}
        {activeTab === 'coupons' && (
          <div>
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Coupon Manager</h3>
                <p className="text-gray-500 text-sm">Generate coupons and track their usage.</p>
              </div>
            </div>
            
            <div className="bg-brand-teal/5 p-5 rounded-xl border border-brand-teal/20 mb-8">
              <h4 className="text-base font-bold text-brand-teal mb-3 flex items-center gap-2"><Plus size={18} /> Generate New Coupon</h4>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = e.target;
                  addCoupon({
                    code: f.code.value,
                    discountType: f.discountType.value,
                    discountValue: f.discountValue.value,
                    discountText: f.discountType.value === 'percentage' ? `${f.discountValue.value}% OFF` : `₹${f.discountValue.value} Flat OFF`
                  });
                  f.reset();
                  toast.success('Coupon created successfully!');
                }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-3"
              >
                <input required name="code" type="text" placeholder="Code (e.g. SAINI10)" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm uppercase" />
                <select required name="discountType" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm bg-white">
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
                <input required name="discountValue" type="number" placeholder="Value (e.g. 10)" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
                <button type="submit" className="bg-brand-teal hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition whitespace-nowrap">Create</button>
              </form>
            </div>

            <div className="space-y-6">
              {(appData.coupons || []).map(coupon => (
                <div key={coupon.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <h4 className="text-xl font-black text-gray-900 tracking-wider font-mono">{coupon.code}</h4>
                      <p className="text-sm font-bold text-brand-orange">{coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} Flat OFF`}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-500">Uses: {(coupon.usages || []).length}</span>
                      <button 
                        onClick={() => toggleCouponStatus(coupon.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {coupon.isActive ? 'Active' : 'Inactive'}
                      </button>
                      <button 
                        onClick={() => { if(window.confirm(`Delete coupon "${coupon.code}"?`)) { deleteCoupon(coupon.id); toast.success('Coupon deleted!'); } }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition"
                      >
                        <Trash2 size={14} className="inline" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Coupon Usage List */}
                  <div className="p-4">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Usage History</h5>
                    {(coupon.usages || []).length === 0 ? (
                      <p className="text-sm text-gray-400 italic">This coupon hasn't been used yet.</p>
                    ) : (
                      <ul className="space-y-2">
                        {(coupon.usages || []).map((usage, idx) => (
                          <li key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-100 last:border-0">
                            <div>
                              <p className="text-sm font-bold text-gray-800">{usage.customerName}</p>
                              <p className="text-xs text-gray-500">{usage.service}</p>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{new Date(usage.date).toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
              {(appData.coupons || []).length === 0 && (
                <div className="text-center text-gray-400 font-semibold py-8">No coupons generated yet.</div>
              )}
            </div>
          </div>
        )}

        {/* ========== NOTEPAD TAB ========== */}
        {activeTab === 'notepad' && (
          <div className="h-full flex flex-col">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Admin Notepad</h3>
                <p className="text-gray-500 text-sm">Jot down tasks, reminders, and notes. Auto-saves as you type.</p>
              </div>
            </div>
            <textarea 
              value={appData.notepad || ''}
              onChange={(e) => updateNotepad(e.target.value)}
              className="flex-1 w-full p-6 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 outline-none text-gray-800 resize-none shadow-inner bg-yellow-50/30 leading-relaxed"
              placeholder="Type your notes here..."
            ></textarea>
          </div>
        )}

        {/* ========== GENERAL TAB ========== */}
        {activeTab === 'general' && (
          <div className="max-w-3xl">
            <h3 className="text-2xl font-black text-gray-900 mb-6">General Details</h3>
            <form onSubmit={handleSiteDetailsSave} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: 'Phone 1', key: 'phone1' },
                  { label: 'Phone 2', key: 'phone2' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">{f.label}</label>
                    <input type="text" value={localSiteDetails[f.key] || ''} onChange={e => setLocalSiteDetails({...localSiteDetails, [f.key]: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none text-sm" />
                  </div>
                ))}
              </div>

              {[
                { label: 'Address', key: 'address' },
                { label: 'Hero Title', key: 'heroTitle' },
                { label: 'Hero Subtitle', key: 'heroSubtitle' },
                { label: 'Hero Image URL', key: 'heroImage' },
                { label: 'Timing', key: 'timing' },
                { label: 'Google Rating', key: 'googleRating' },
                { label: 'Google Reviews Count', key: 'googleReviewsCount' },
                { label: 'Justdial URL', key: 'justdialUrl' },
                { label: 'Google Maps URL', key: 'googleMapsUrl' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">{f.label}</label>
                  <input type="text" value={localSiteDetails[f.key] || ''} onChange={e => setLocalSiteDetails({...localSiteDetails, [f.key]: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none text-sm" />
                </div>
              ))}

              <div className="pt-4 border-t border-gray-100">
                <button type="submit" className="bg-brand-teal hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {/* ========== SERVICES TAB ========== */}
        {activeTab === 'services' && (
          <div>
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Services & Images</h3>
                <p className="text-gray-500 text-sm">{(appData.services || []).length} services configured</p>
              </div>
            </div>
            
            {/* Add New Service */}
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-8">
              <h4 className="text-base font-bold text-brand-blue mb-3 flex items-center gap-2"><Plus size={18} /> Add New Service</h4>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  addService({
                    title: form.title.value,
                    description: form.description.value,
                    price: form.price.value,
                    basePrice: parseFloat(form.basePrice.value) || 0,
                    image: form.image.value || '/images/hero_repair.png',
                    icon: 'Wrench'
                  });
                  form.reset();
                  toast.success('Service added!');
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <input required name="title" type="text" placeholder="Service Title (e.g., RO Repair)" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
                <input required name="price" type="text" placeholder="Price text (e.g., Starts at ₹199)" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
                <input required name="basePrice" type="number" placeholder="Base Price ₹ (e.g., 199)" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
                <input name="image" type="text" placeholder="Image URL (optional)" className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm" />
                <input required name="description" type="text" placeholder="Short description..." className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm sm:col-span-2" />
                <div className="sm:col-span-3">
                  <button type="submit" className="bg-brand-teal hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center gap-2">
                    <Plus size={16} /> Add Service
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Services */}
            <div className="space-y-4">
              {(appData.services || []).map(service => (
                <div key={service.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-5 items-start relative group">
                  {/* Delete button */}
                  <button 
                    onClick={() => handleDeleteService(service.id, service.title)}
                    className="absolute top-3 right-3 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 p-2 rounded-lg transition opacity-60 group-hover:opacity-100" 
                    title="Delete Service"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="w-full md:w-1/4 flex-shrink-0">
                    <img src={service.image} alt={service.title} className="w-full h-32 object-cover rounded-lg bg-gray-100 mb-2" />
                    <input 
                      type="text" value={service.image} 
                      onChange={(e) => updateService({...service, image: e.target.value})}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 focus:border-brand-teal outline-none" 
                      placeholder="Image URL" 
                    />
                  </div>
                  <div className="w-full md:w-3/4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Title</label>
                        <input type="text" value={service.title} onChange={(e) => updateService({...service, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm font-semibold" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Price Text</label>
                        <input type="text" value={service.price} onChange={(e) => updateService({...service, price: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm font-semibold text-brand-orange" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Base ₹</label>
                        <input type="number" value={service.basePrice || 0} onChange={(e) => updateService({...service, basePrice: parseFloat(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm font-semibold text-green-600" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                      <textarea value={service.description} onChange={(e) => updateService({...service, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-teal outline-none text-sm resize-none" rows="2"></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* ========== USERS TAB ========== */}
        {activeTab === 'users' && (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Customer Profiles</h3>
                <p className="text-gray-500 text-sm">Grouped by mobile number. {usersList.length} unique customers.</p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name or phone..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-brand-teal outline-none text-sm"
                />
              </div>
            </div>

            {selectedUserPhone ? (
              <div>
                <button onClick={() => setSelectedUserPhone(null)} className="mb-4 text-brand-teal font-bold text-sm hover:underline flex items-center gap-1">
                  &larr; Back to Customers
                </button>
                {usersList.filter(u => u.phone === selectedUserPhone).map(user => (
                  <div key={user.phone} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h4 className="text-xl font-black text-gray-900">{user.name || 'Unknown Name'}</h4>
                        <p className="text-gray-500 font-bold">{user.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Spent</p>
                        <h4 className="text-xl font-black text-green-600">₹{user.bookings.reduce((sum, b) => sum + (parseFloat(b.paymentReceived) || 0), 0)}</h4>
                      </div>
                    </div>
                    <h5 className="font-bold text-gray-700 mb-3 border-b pb-2">Booking History ({user.bookings.length})</h5>
                    <div className="space-y-4">
                      {user.bookings.sort((a,b) => new Date(b.date) - new Date(a.date)).map(b => (
                        <div key={b.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                          <div>
                            <p className="font-bold text-sm text-gray-900">{b.service} {b.completedServices?.length > 1 && <span className="text-xs text-gray-500 font-normal">and +{b.completedServices.length - 1} more</span>}</p>
                            <p className="text-xs text-gray-500">{new Date(b.date).toLocaleString()}</p>
                            {b.applianceModel && <p className="text-xs text-gray-600 mt-1 font-semibold">Model: {b.applianceModel}</p>}
                            {b.completionNotes && <p className="text-xs text-gray-500 mt-0.5 italic">Note: {b.completionNotes}</p>}
                          </div>
                          <div className="text-right flex-shrink-0 flex flex-col items-end gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${b.status === 'Completed' ? 'bg-green-100 text-green-700' : b.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                              {b.status}
                            </span>
                            {b.status === 'Completed' && (
                              <>
                                <p className="font-black text-gray-900 text-sm">₹{b.paymentReceived}</p>
                                <button 
                                  onClick={() => handleGenerateInvoice(b, user)}
                                  disabled={isGeneratingInvoice}
                                  className="mt-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isGeneratingInvoice && invoiceData?.booking.id === b.id ? (
                                    <><RefreshCw size={12} className="animate-spin" /> Generating...</>
                                  ) : (
                                    <><MessageCircle size={12} /> WhatsApp Bill</>
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {usersList.length === 0 ? (
                  <div className="p-10 text-center text-gray-400 font-semibold">No customers found.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {usersList.map(user => (
                      <div key={user.phone} onClick={() => setSelectedUserPhone(user.phone)} className="bg-gray-50 hover:bg-brand-teal/5 border border-gray-200 hover:border-brand-teal/30 p-4 rounded-xl cursor-pointer transition">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{user.name || 'Unknown Name'}</h4>
                            <p className="text-sm font-semibold text-gray-500">{user.phone}</p>
                          </div>
                          <div className="bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded-lg">
                            {user.bookings.length} Bookings
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">Last seen: {new Date(Math.max(...user.bookings.map(b => new Date(b.date)))).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        </div>
      </div>
      
      {/* Hidden Invoice Template - INLINE STYLES ONLY (no Tailwind) to avoid oklch parsing issues */}
      {invoiceData && (
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1 }}>
          <div ref={invoiceRef} style={{ width: '800px', padding: '40px', backgroundColor: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1f2937', border: '1px solid #f3f4f6' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', borderBottom: '3px solid #0d9488', paddingBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0d9488', marginBottom: '4px', letterSpacing: '-0.5px' }}>SAINI REFRIGERATION</h1>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280', letterSpacing: '3px', textTransform: 'uppercase' }}>& Electricals</p>
                <div style={{ marginTop: '16px', fontSize: '12px', color: '#9ca3af' }}>
                  <p style={{ marginBottom: '4px' }}>📞 {localSiteDetails.phone1 || '8209640447'}, {localSiteDetails.phone2 || '9782311637'}</p>
                  <p>📍 {localSiteDetails.address || 'Bapu Nagar, Bharatpur, Rajasthan'}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#d1d5db', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '8px' }}>Invoice</h2>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>#INV-{invoiceData.booking.id.slice(-6)}</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Date: {new Date(invoiceData.booking.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                {invoiceData.booking.completedDate && (
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Completed: {new Date(invoiceData.booking.completedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                )}
              </div>
            </div>

            {/* Bill To */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Billed To:</p>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#111827' }}>{invoiceData.user.name || 'Valued Customer'}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Phone: +91 {invoiceData.user.phone}</p>
            </div>

            {/* Service Details Table */}
            <div style={{ marginBottom: '32px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              <table style={{ width: '100%', textAlign: 'left', fontSize: '14px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0d9488', color: '#ffffff' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'left' }}>Description</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'left' }}>Model</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
                    <td style={{ padding: '16px', fontWeight: 600, color: '#111827' }}>
                      {invoiceData.booking.completedServices?.length > 1 
                        ? invoiceData.booking.completedServices.join(', ') 
                        : invoiceData.booking.service
                      }
                      {invoiceData.booking.completionNotes && (
                        <span style={{ display: 'block', fontSize: '12px', fontStyle: 'italic', color: '#9ca3af', marginTop: '4px' }}>Note: {invoiceData.booking.completionNotes}</span>
                      )}
                    </td>
                    <td style={{ padding: '16px', color: '#6b7280' }}>{invoiceData.booking.applianceModel || '-'}</td>
                    <td style={{ padding: '16px', textAlign: 'right', fontWeight: 700, color: '#111827' }}>{parseFloat(invoiceData.booking.costOfService) || parseFloat(invoiceData.booking.paymentReceived) || 0}</td>
                  </tr>
                  {invoiceData.booking.costOfGoods > 0 && (
                    <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
                      <td style={{ padding: '16px', fontWeight: 600, color: '#111827' }}>Parts / Materials</td>
                      <td style={{ padding: '16px', color: '#6b7280' }}>-</td>
                      <td style={{ padding: '16px', textAlign: 'right', fontWeight: 700, color: '#111827' }}>{invoiceData.booking.costOfGoods}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '48px' }}>
              <div style={{ width: '50%', backgroundColor: '#f9fafb', padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6' }}>
                {invoiceData.booking.costOfGoods > 0 && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: '#6b7280' }}>
                      <span>Cost of Service:</span>
                      <span style={{ fontWeight: 700 }}>₹{parseFloat(invoiceData.booking.costOfService) || 0}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#6b7280' }}>
                      <span>Cost of Goods:</span>
                      <span style={{ fontWeight: 700 }}>₹{invoiceData.booking.costOfGoods}</span>
                    </div>
                  </>
                )}
                {invoiceData.booking.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#16a34a' }}>
                    <span>Discount:</span>
                    <span style={{ fontWeight: 700 }}>-₹{invoiceData.booking.discount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 900, color: '#111827', borderTop: '2px solid #e5e7eb', paddingTop: '12px', marginTop: '4px' }}>
                  <span>Total Paid:</span>
                  <span style={{ color: '#16a34a' }}>₹{invoiceData.booking.paymentReceived}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #e5e7eb', fontSize: '12px', color: '#9ca3af' }}>
              <p style={{ fontWeight: 700, color: '#6b7280', marginBottom: '4px' }}>Thank you for choosing Saini Refrigeration & Electricals!</p>
              <p>For any queries, contact us at {localSiteDetails.phone1 || '8209640447'}</p>
              <p style={{ marginTop: '12px', fontStyle: 'italic' }}>This is a system-generated invoice.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
