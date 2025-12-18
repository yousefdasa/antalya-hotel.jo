import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from './AppContext';
import { TRANSLATIONS } from './constants';

const BookingPage: React.FC = () => {
  const { language, rooms } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('roomId') || rooms[0]?.id;
  const [success, setSuccess] = useState(false);
  const selectedRoom = rooms.find(r => r.id === roomId);

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 animate-fade-in">
        <div className="bg-white p-12 rounded shadow-2xl text-center">
           <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
           <h2 className="text-2xl font-bold mb-4">{language === 'ar' ? 'تم طلب الحجز!' : 'Booking Requested!'}</h2>
           <button onClick={() => navigate('/')} className="bg-navy-900 text-white px-8 py-3 font-bold uppercase">OK</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-stone-50 pb-20 animate-fade-in">
      <div className="max-w-xl mx-auto bg-white p-8 shadow-xl border-t-4 border-gold-500">
        <h1 className="text-3xl font-serif font-bold text-center mb-8">{TRANSLATIONS.bookNow[language]}</h1>
        <form onSubmit={(e) => { e.preventDefault(); setSuccess(true); }} className="space-y-6">
          <input type="text" placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'} className="w-full p-3 border rounded outline-none focus:border-gold-500" required />
          <input type="email" placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'} className="w-full p-3 border rounded outline-none focus:border-gold-500" required />
          <input type="tel" placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone'} className="w-full p-3 border rounded outline-none focus:border-gold-500" required />
          <div className="p-4 bg-gray-50 rounded text-sm text-gray-600">
            {language === 'ar' ? 'الغرفة المختارة:' : 'Selected:'} <span className="font-bold">{language === 'en' ? selectedRoom?.titleEn : selectedRoom?.titleAr}</span>
          </div>
          <button type="submit" className="w-full bg-gold-500 text-navy-900 font-bold py-4 uppercase tracking-widest">
            {language === 'ar' ? 'تأكيد الطلب' : 'Confirm Request'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default BookingPage;