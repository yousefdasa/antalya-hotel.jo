
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useAppContext } from './AppContext';
import { Language } from './types';
import { TRANSLATIONS } from './constants';

const Navbar: React.FC = () => {
  const { language, setLanguage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.AR : Language.EN);
  };

  const t = (key: string) => TRANSLATIONS[key][language];

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/rooms', label: t('rooms') },
    { path: '/facilities', label: t('facilities') },
    { path: '/gallery', label: t('gallery') },
    { path: '/contact', label: t('contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-navy-900/95 backdrop-blur-sm text-white shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-gold-500 shadow-inner">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtizQDI2NhmoOaQnvyKvyXoLbfrnN1nOr37A&s" className="w-full h-full object-contain" alt="Logo" />
             </div>
             <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-gold-400 leading-none">Antalya</span>
                <span className="text-[10px] tracking-widest text-gray-400 mt-1 uppercase">Hotel Amman</span>
             </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors ${isActive(link.path) ? 'text-gold-400' : 'text-gray-300 hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
            <button onClick={toggleLanguage} className="flex items-center gap-1 text-gold-400 uppercase text-xs font-bold">
               <Globe size={16} /> {language === Language.EN ? 'AR' : 'EN'}
            </button>
            <Link to="/rooms" className="bg-gold-500 text-navy-900 px-5 py-2 rounded-sm font-bold text-xs uppercase">
               {t('bookNow')}
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-400 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
