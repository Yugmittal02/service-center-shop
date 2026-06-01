import React from 'react';
import { ExternalLink, Star, CheckCircle } from 'lucide-react';

export default function JustdialProfile({ url }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noreferrer"
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col sm:flex-row border border-gray-200 group w-full relative h-full min-h-[120px]"
    >
      <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 sm:w-2/5 flex flex-col justify-center items-center text-white text-center">
        <h3 className="text-2xl font-black mb-1">Justdial</h3>
        <p className="font-bold text-orange-100 text-xs tracking-widest uppercase mb-3">Verified Profile</p>
        <div className="bg-white text-orange-500 font-black text-xl px-4 py-1.5 rounded-lg shadow-inner flex items-center gap-2">
          5.0 <Star fill="currentColor" size={16} className="text-yellow-400" />
        </div>
      </div>
      <div className="p-6 sm:w-3/5 flex flex-col justify-center bg-white z-10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="text-xl font-extrabold text-gray-900 group-hover:text-orange-500 transition">Jatin Saini</h4>
            <p className="text-gray-500 font-bold text-sm">Saini Refrigeration & Electricals</p>
          </div>
          <div className="bg-gray-100 p-2.5 rounded-lg group-hover:bg-orange-50 transition flex-shrink-0">
            <ExternalLink size={20} className="text-gray-400 group-hover:text-orange-500 transition" />
          </div>
        </div>
        <div className="space-y-1.5 mt-1">
          <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
            <CheckCircle size={16} className="text-green-500" /> JD Verified
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
            <CheckCircle size={16} className="text-green-500" /> Quick Response
          </div>
        </div>
      </div>
    </a>
  );
}
