import React from 'react';
import { useAppContext } from '../context/AppContext';
import { HOTEL_INFO, TRANSLATIONS } from '../constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const { language } = useAppContext();
  const t = (key: string) => TRANSLATIONS[key][language];

  return (
    <div className="pt-24 min-h-screen bg-stone-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-navy-900 mb-4">{t('contact')}</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-white p-10 rounded-sm shadow-xl border-t-4 border-gold-500 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold text-navy-900 mb-8 pb-4 border-b">
                {language === 'en' ? 'Get in Touch' : 'تواصل معنا'}
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="bg-stone-50 p-4 rounded-full text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-navy-900 uppercase text-xs tracking-widest mb-1">{language === 'en' ? 'Address' : 'العنوان'}</span>
                    <span className="text-gray-600">{HOTEL_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-stone-50 p-4 rounded-full text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Phone size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-navy-900 uppercase text-xs tracking-widest mb-1">{language === 'en' ? 'Reservations' : 'الحجوزات'}</span>
                    <span className="text-gray-600 font-mono" dir="ltr">{HOTEL_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-stone-50 p-4 rounded-full text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Mail size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-navy-900 uppercase text-xs tracking-widest mb-1">Email</span>
                    <span className="text-gray-600">{HOTEL_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <a 
                href="https://maps.app.goo.gl/vDy1wtCaDj5bJNXs7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-navy-900 text-white font-bold py-4 px-6 rounded-sm hover:bg-gold-500 hover:text-navy-900 transition-all shadow-lg gap-2 uppercase tracking-widest"
              >
                <MapPin size={18} /> {language === 'en' ? 'Open in Google Maps' : 'افتح في خرائط جوجل'}
              </a>
            </div>
          </div>
          
          <div className="bg-white p-2 rounded-sm shadow-xl h-[500px] lg:h-auto overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.975440266023!2d35.9106!3d31.9539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d198a67%3A0x3030303030303030!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sjo!4v1600000000000!5m2!1sen!2sjo" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              title="Hotel Location"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;