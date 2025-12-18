
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, ShieldCheck } from 'lucide-react';
import { useAppContext } from './AppContext';
import { HOTEL_INFO, TRANSLATIONS } from './constants';

const Footer: React.FC = () => {
  const { language } = useAppContext();
  const t = (key: string) => TRANSLATIONS[key][language];

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="space-y-6">
             <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-gold-500 shadow-lg">
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtizQDI2NhmoOaQnvyKvyXoLbfrnN1nOr37A&s" alt="Logo" className="w-full h-full object-contain scale-110" />
                </div>
                <div className="flex flex-col text-left">
                   <span className="font-serif text-2xl font-bold text-gold-400">Antalya</span>
                   <span className="text-xs tracking-widest text-gray-400 uppercase">Hotel Amman</span>
                </div>
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
               {language === 'en' 
                 ? "Experience luxury and comfort in the heart of Amman. A perfect blend of traditional hospitality and modern elegance."
                 : "جرب الفخامة والراحة في قلب عمان. مزيج مثالي من الضيافة التقليدية والأناقة الحديثة."}
             </p>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-6 border-b border-gold-500/30 pb-2 inline-block uppercase tracking-wider">
              {language === 'en' ? 'Explore' : 'استكشف'}
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-gold-400 transition">{t('home')}</Link></li>
              <li><Link to="/rooms" className="hover:text-gold-400 transition">{t('rooms')}</Link></li>
              <li><Link to="/facilities" className="hover:text-gold-400 transition">{t('facilities')}</Link></li>
              <li><Link to="/gallery" className="hover:text-gold-400 transition">{t('gallery')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-6 border-b border-gold-500/30 pb-2 inline-block uppercase tracking-wider">
              {t('contact')}
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin className="text-gold-500 shrink-0 mt-1" size={16} />
                <span>{HOTEL_INFO.location}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="text-gold-500 shrink-0" size={16} />
                <span dir="ltr">{HOTEL_INFO.phone}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="text-gold-500 shrink-0" size={16} />
                <span>{HOTEL_INFO.email}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-serif font-bold text-white mb-6 border-b border-gold-500/30 pb-2 inline-block uppercase tracking-wider">
              {language === 'en' ? 'Social Media' : 'تواصـل معنا'}
            </h3>
            <div className="flex space-x-4 space-x-reverse mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 transition shadow-lg"><Facebook size={20}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 transition shadow-lg"><Instagram size={20}/></a>
            </div>
            {/* Admin Link - Clear and accessible */}
            <Link 
              to="/admin" 
              className="group flex items-center gap-2 text-[10px] text-gray-500 hover:text-gold-500 transition-all uppercase tracking-[0.2em] border border-gray-800 p-2 px-4 rounded-full"
            >
              <ShieldCheck size={14} className="group-hover:rotate-12 transition-transform" />
              {language === 'en' ? 'Admin Management' : 'لوحة تحكم الإدارة'}
            </Link>
          </div>

        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-600 text-[10px] uppercase tracking-widest">
          <p>{t('footerText')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

