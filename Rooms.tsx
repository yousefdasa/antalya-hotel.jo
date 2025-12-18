import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { TRANSLATIONS } from './constants';

const Rooms: React.FC = () => {
  const { language, rooms } = useAppContext();
  const navigate = useNavigate();
  const t = (key: string) => TRANSLATIONS[key][language];

  return (
    <div className="pt-24 min-h-screen bg-stone-50 pb-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-navy-900 text-center mb-12">{t('rooms')}</h1>
        <div className="grid gap-12">
          {rooms.map(room => (
            <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img src={room.imageUrl} alt={room.titleEn} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">{room.type}</span>
                  <h3 className="text-2xl font-serif font-bold text-navy-900 mt-2 mb-4">{language === 'en' ? room.titleEn : room.titleAr}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{language === 'en' ? room.descriptionEn : room.descriptionAr}</p>
                </div>
                <div className="flex justify-between items-center pt-6 border-t mt-8">
                  <span className="text-2xl font-bold text-navy-900">${room.price} <span className="text-xs text-gray-400">{t('night')}</span></span>
                  <button onClick={() => navigate(`/booking?roomId=${room.id}`)} className="bg-navy-900 text-white px-8 py-3 rounded-sm font-bold uppercase text-xs">
                    {t('bookNow')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Rooms;