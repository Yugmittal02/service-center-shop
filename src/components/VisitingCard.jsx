import React from 'react';
import { Phone, MapPin, Wrench, Zap } from 'lucide-react';

export default function VisitingCard({ details }) {
  return (
    <div className="bg-white w-full max-w-4xl mx-auto rounded-2xl shadow-lg hover:shadow-xl transition duration-500 overflow-hidden border border-gray-200 group">
      {/* Top Red Border */}
      <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

      <div className="p-6 md:p-8">
        {/* Header: Logo + Name */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gray-900 w-14 h-14 rounded-full flex items-center justify-center border-3 border-red-600 shadow-md flex-shrink-0">
              <div className="text-white text-xl font-black italic">SR</div>
            </div>
            <div>
              <h2 className="text-red-600 text-2xl font-black uppercase tracking-tight leading-none">Saini</h2>
              <h3 className="text-gray-800 text-sm font-bold">Refrigeration & Electricals</h3>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            <Zap size={14} className="text-red-500" />
            <span className="text-red-600 font-bold text-xs">10+ Years</span>
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
            <div className="bg-red-50 p-2.5 rounded-lg flex-shrink-0">
              <Phone size={18} className="text-red-600" fill="currentColor" />
            </div>
            <div>
              <div className="text-lg font-black text-gray-900">{details.phone1}</div>
              <div className="text-sm font-semibold text-gray-500">{details.phone2}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-red-50 p-2.5 rounded-lg flex-shrink-0 mt-0.5">
              <MapPin size={18} className="text-red-600" />
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
      <div className="bg-red-600 text-white text-center py-2 text-[11px] font-bold tracking-widest uppercase">
        FAST SERVICE • TRUSTED QUALITY • CUSTOMER SATISFACTION
      </div>
    </div>
  );
}
