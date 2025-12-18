
import React from 'react';
import { useAppContext } from './AppContext';
import { TRANSLATIONS } from './constants';

const Footer: React.FC = () => {
  const { language } = useAppContext();
  return (
    <footer className="bg-navy-900 text-white py-12 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-400 text-sm">{TRANSLATIONS.footerText[language]}</p>
      </div>
    </footer>
  );
};
export default Footer;
