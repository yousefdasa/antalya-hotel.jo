
import React from 'react';
import { useAppContext } from './AppContext';
import { HOTEL_INFO } from './constants';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const { language } = useAppContext();
  return (
    <div className="pt-24 min-h-screen bg-stone-50 p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-xl text-center">
        <h1 className="text-4xl font-serif font-bold mb-12">Contact Us</h1>
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-4"><MapPin className="text-gold-500" /> {HOTEL_INFO.location}</div>
          <div className="flex items-center justify-center gap-4"><Phone className="text-gold-500" /> {HOTEL_INFO.phone}</div>
          <div className="flex items-center justify-center gap-4"><Mail className="text-gold-500" /> {HOTEL_INFO.email}</div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
