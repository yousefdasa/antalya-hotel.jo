import React from 'react';
import { useAppContext } from '../context/AppContext';

const Gallery: React.FC = () => {
    const { language } = useAppContext();
    const images = [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/630410933.jpg?k=63476dd76f3b787b67c4913e79cb1165c2a234e85adcdbb3c93062bf52b2a3b8&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/630412403.jpg?k=d9076f30eb47fa759436c84e6099feaab07529b02fe9bb3255a2588cda70a0fd&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/630411560.jpg?k=eac322966bef686deea8d6a829354dd46bf4b3b01e7b988ae261a295d7b1d469&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/701365581.jpg?k=9b3d24ca9567ee0364460d41d1ede46efb9a0e9854e1bb5e181686a50057497e&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/630410963.jpg?k=4c99cc2125e2c8ea310635b08746e08cff592ec75c1c7870eb6d8c275c207c9a&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/675396411.jpg?k=684387c186d291667ba87ce27ca51fa60c50a6601233ff37469dcc49ac69e805&o=',
    ];

    return (
        <div className="pt-24 min-h-screen bg-stone-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold text-navy-900 mb-2">
                        {language === 'en' ? 'Our Gallery' : 'معرض الصور'}
                    </h1>
                    <p className="text-gold-600 font-sans tracking-widest uppercase text-xs">
                        {language === 'en' ? 'A Glimpse of Perfection' : 'لمحة من الكمال'}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                     {images.map((src, i) => (
                         <div key={i} className="group relative overflow-hidden rounded-sm shadow-2xl aspect-[4/5] bg-gray-200">
                             <img 
                                src={src} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                alt={`Antalya Detail ${i + 1}`}
                                loading="lazy"
                             />
                             <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6">
                                 <div className="border border-gold-500/50 w-full h-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-700">
                                     <span className="text-white text-xs tracking-[0.3em] uppercase font-bold text-center">
                                         Antalya Luxury Collection
                                     </span>
                                 </div>
                             </div>
                         </div>
                     ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;