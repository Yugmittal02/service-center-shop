import React from 'react';
import { Star, MapPin } from 'lucide-react';

export default function GoogleRating({ rating, reviewsCount, mapUrl }) {
  return (
    <a 
      href={mapUrl} 
      target="_blank" 
      rel="noreferrer"
      className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between border border-gray-200 group w-full h-full min-h-[120px]"
    >
      <div className="flex items-center gap-4">
        <div className="bg-blue-50 p-3.5 rounded-xl group-hover:bg-brand-blue transition duration-300 flex-shrink-0">
          <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-extrabold text-gray-900 leading-tight mb-1">Google Rating</h4>
          <div className="flex items-center gap-1.5">
            <span className="font-black text-gray-900 text-xl">{rating}</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-gray-500 font-semibold text-sm ml-1">({reviewsCount} reviews)</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-brand-teal group-hover:text-white transition duration-300 flex-shrink-0">
        <MapPin size={22} />
      </div>
    </a>
  );
}
