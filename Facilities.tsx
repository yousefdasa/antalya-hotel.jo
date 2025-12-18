import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Dumbbell, Utensils, Waves, Sprout, Car, Coffee } from 'lucide-react';

const Facilities: React.FC = () => {
  const { language } = useAppContext();
  const t = (key: string) => TRANSLATIONS[key][language];

  const facilityList = [
    {
      icon: <Waves size={32} />,
      titleEn: 'Infinity Pool',
      titleAr: 'مسبح إنفينيتي',
      descEn: 'Relax in our temperature-controlled rooftop pool with a view.',
      descAr: 'استرخِ في مسبحنا الموجود على السطح والمتحكم في درجة حرارته.',
      img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'
    },
    {
      icon: <Sprout size={32} />,
      titleEn: 'Royal Spa',
      titleAr: 'سبا ملكي',
      descEn: 'Traditional Turkish baths and modern therapeutic massages.',
      descAr: 'حمامات تركية تقليدية ومساج علاجي حديث.',
      img: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800'
    },
    {
      icon: <Utensils size={32} />,
      titleEn: 'Antalya Restaurant',
      titleAr: 'مطعم أنطاليا',
      descEn: 'Fine dining experience featuring Ottoman and International cuisine.',
      descAr: 'تجربة طعام فاخرة تتميز بالمأكولات العثمانية والعالمية.',
      img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
    },
    {
      icon: <Dumbbell size={32} />,
      titleEn: 'Fitness Center',
      titleAr: 'مركز اللياقة البدنية',
      descEn: 'State-of-the-art equipment for your daily workout routine.',
      descAr: 'أحدث المعدات لروتين تمارينك اليومية.',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-stone-50 pb-20">
      <div className="bg-navy-900 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>
        <h1 className="text-5xl font-serif font-bold relative z-10">{t('facilities')}</h1>
        <p className="text-gold-400 mt-2 tracking-widest uppercase text-sm relative z-10">Luxury Living Experience</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {facilityList.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-white rounded-sm overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
              <div className="md:w-1/2 h-64 overflow-hidden">
                <img src={item.img} alt={item.titleEn} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="text-gold-600 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-3">
                  {language === 'en' ? item.titleEn : item.titleAr}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === 'en' ? item.descEn : item.descAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;