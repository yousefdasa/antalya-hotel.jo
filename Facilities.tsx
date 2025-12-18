
import React from 'react';
import { useAppContext } from './AppContext';
import { TRANSLATIONS } from './constants';
import { Waves, Utensils, Dumbbell } from 'lucide-react';

const Facilities: React.FC = () => {
  const { language } = useAppContext();
  return (
    <div className="pt-24 min-h-screen bg-stone-50 p-8 animate-fade-in text-center">
      <h1 className="text-4xl font-serif font-bold text-navy-900 mb-12">{TRANSLATIONS.facilities[language]}</h1>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 shadow rounded"><Waves size={40} className="mx-auto text-gold-500 mb-4" /><h3>Rooftop Pool</h3></div>
        <div className="bg-white p-8 shadow rounded"><Utensils size={40} className="mx-auto text-gold-500 mb-4" /><h3>Turkish Cuisine</h3></div>
        <div className="bg-white p-8 shadow rounded"><Dumbbell size={40} className="mx-auto text-gold-500 mb-4" /><h3>Premium Gym</h3></div>
      </div>
    </div>
  );
};
export default Facilities;
