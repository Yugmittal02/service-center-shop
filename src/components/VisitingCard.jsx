import React from 'react';
import { Phone, MapPin, Wrench, Zap } from 'lucide-react';

export default function VisitingCard({ details }) {
  return (
    <div className="bg-white w-full max-w-4xl mx-auto rounded-2xl shadow-lg hover:shadow-xl transition duration-500 overflow-hidden border border-gray-200 group">
      {/* Top Teal Border */}
      <div className="h-1.5 bg-gradient-to-r from-brand-teal via-teal-500 to-brand-teal"></div>

      <div className="p-6 md:p-8">
        {/* Header: Logo + Name */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="Saini HomeCare" className="h-14 w-auto object-contain flex-shrink-0" />
            <div>
              <h2 className="text-brand-blue text-2xl font-black uppercase tracking-tight leading-none">Saini HomeCare</h2>
              <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mt-0.5">Repair • Service • Install • Care</h3>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
            <Zap size={14} className="text-brand-teal" />
            <span className="text-brand-teal font-bold text-xs">10+ Years</span>
          </div>
        </div>

        {/* Service Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {['AC', 'Fridge', 'Washing Machine', 'Geyser', 'Electrical Work'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-700 font-semibold rounded-full border border-gray-200 text-xs">{tag}</span>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-5"></div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-50 p-2.5 rounded-lg flex-shrink-0">
              <Phone size={18} className="text-brand-teal" fill="currentColor" />
            </div>
            <div>
              <div className="text-lg font-black text-gray-900">{details.phone1}</div>
              <div className="text-sm font-semibold text-gray-500">{details.phone2}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-teal-50 p-2.5 rounded-lg flex-shrink-0 mt-0.5">
              <MapPin size={18} className="text-brand-teal" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-0.5">Address</h4>
              <p className="text-gray-600 text-xs leading-relaxed">{details.address}</p>
            </div>
          </div>
        </div>

        {/* People */}
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-600">
          <span className="text-gray-400">Contact:</span> Jatin Saini & Dalchand
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-brand-teal text-white text-center py-2 text-[11px] font-bold tracking-widest uppercase">
        FAST SERVICE • TRUSTED QUALITY • CUSTOMER SATISFACTION
      </div>
    </div>
  );
}
