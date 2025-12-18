import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useAppContext } from './AppContext';
import { TRANSLATIONS } from './constants';

const Home: React.FC = () => {
  const { language } = useAppContext();
  const t = (key: string) => TRANSLATIONS[key][language];
  const heroImage = "https://cf.bstatic.com/xdata/images/hotel/max1024x768/630411930.jpg?k=11a0570f2dd6cce51a6c0fa764c3d0e06a43583349207c42f539d838d5f5ce0b&o=";

  return (
    <div className="animate-fade-in">
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImage} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-navy-900/40"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="mb-6 flex justify-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="text-gold-500 fill-current" size={24} />)}
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 uppercase">{t('heroTitle')}</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">{t('heroSubtitle')}</p>
          <Link to="/rooms" className="px-10 py-4 bg-gold-500 text-navy-900 font-bold uppercase tracking-widest hover:bg-gold-400 transition shadow-xl rounded-sm">
            {t('bookNow')}
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;