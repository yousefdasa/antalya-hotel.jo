import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, CheckCircle, Phone, Clock, MessageSquare, Tag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Booking, BookingStatus, Room } from '../types';

const COUNTRY_CODES = [
  { code: '+962', label: 'Jordan (الأردن)' },
  { code: '+966', label: 'Saudi Arabia (السعودية)' },
  { code: '+971', label: 'UAE (الإمارات)' },
  { code: '+965', label: 'Kuwait (الكويت)' },
  { code: '+974', label: 'Qatar (قطر)' },
  { code: '+973', label: 'Bahrain (البحرين)' },
  { code: '+968', label: 'Oman (عمان)' },
  { code: '+20', label: 'Egypt (مصر)' },
  { code: '+1', label: 'USA/Canada' },
  { code: '+44', label: 'UK' },
];

const ARRIVAL_TIMES = [
  'I don\'t know yet', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', 'After 17:00'
];

const SPECIAL_REQUESTS = [
  'None', 'Honeymoon', 'Anniversary', 'Birthday', 'Quiet Room', 'High Floor', 'Late Check-in'
];

const BookingPage: React.FC = () => {
  const { language, rooms, addBooking } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const t = (key: string) => TRANSLATIONS[key][language];

  const searchParams = new URLSearchParams(location.search);
  const initialRoomId = searchParams.get('roomId') || rooms[0]?.id;

  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+962');
  const [phone, setPhone] = useState('');
  const [arrivalTime, setArrivalTime] = useState(ARRIVAL_TIMES[0]);
  const [specialRequest, setSpecialRequest] = useState(SPECIAL_REQUESTS[0]);
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !selectedRoom) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays * selectedRoom.price : 0;
  };

  const total = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const newBooking: Booking = {
      id: Date.now().toString(),
      roomId: selectedRoom.id,
      customerName: name,
      customerEmail: email,
      countryCode,
      customerPhone: phone,
      checkIn,
      checkOut,
      guests,
      totalPrice: total,
      status: BookingStatus.PENDING,
      createdAt: new Date().toISOString(),
      arrivalTime,
      specialRequest,
      notes
    };

    addBooking(newBooking);
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (success) {
    return (
      <div className="min-h-screen pt-24 bg-stone-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center border-t-4 border-gold-500">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">
            {language === 'en' ? 'Booking Confirmed!' : 'تم تأكيد الحجز!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? `Thank you ${name}. Your reservation for the ${selectedRoom?.titleEn} is pending approval. Our concierge will contact you at ${countryCode} ${phone}.`
              : `شكراً ${name}. حجزك لـ ${selectedRoom?.titleAr} قيد الموافقة. سيتصل بك موظف الاستقبال على الرقم ${countryCode} ${phone}.`}
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-navy-900 text-white px-6 py-3 rounded-sm font-bold uppercase w-full hover:bg-gold-500 transition"
          >
            {language === 'en' ? 'Back Home' : 'العودة للرئيسية'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-stone-50 pb-20">
      <div className="bg-navy-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <h1 className="text-4xl font-serif font-bold relative z-10">{t('search')}</h1>
        <p className="text-gold-400 mt-2 relative z-10 tracking-widest uppercase text-xs">Antalya Luxury Collection</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Section: Dates & Guests */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-navy-900 mb-6 flex items-center gap-2 border-b pb-2">
                    <Calendar size={20} className="text-gold-500" />
                    {language === 'en' ? 'Stay Information' : 'معلومات الإقامة'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{t('checkIn')}</label>
                      <input 
                        type="date" 
                        required
                        className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm"
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{t('checkOut')}</label>
                      <input 
                        type="date" 
                        required
                        className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm"
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{t('guests')}</label>
                      <div className="relative">
                        <select 
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="w-full p-3 pl-10 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm appearance-none"
                        >
                          {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num} {language === 'en' ? 'Guests' : 'ضيوف'}</option>)}
                        </select>
                        <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Guest Details */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-navy-900 mb-6 flex items-center gap-2 border-b pb-2">
                    <Users size={20} className="text-gold-500" />
                    {language === 'en' ? 'Personal Details' : 'التفاصيل الشخصية'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{language === 'en' ? 'Full Name' : 'الاسم الكامل'}</label>
                      <input 
                        type="text" 
                        required
                        placeholder={language === 'en' ? 'John Doe' : 'أحمد محمد'}
                        className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="example@email.com"
                        className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-4 gap-2">
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{language === 'en' ? 'Code' : 'الرمز'}</label>
                        <select 
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm appearance-none bg-stone-50"
                        >
                          {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                        </select>
                      </div>
                      <div className="col-span-3">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{language === 'en' ? 'Phone Number' : 'رقم الهاتف'}</label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            required
                            placeholder="79 000 0000"
                            className="w-full pl-10 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Extra Preferences */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-navy-900 mb-6 flex items-center gap-2 border-b pb-2">
                    <Tag size={20} className="text-gold-500" />
                    {language === 'en' ? 'Preferences & Requests' : 'التفضيلات والطلبات'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{language === 'en' ? 'Estimated Arrival' : 'موعد الوصول المتوقع'}</label>
                      <div className="relative">
                        <select 
                          value={arrivalTime}
                          onChange={(e) => setArrivalTime(e.target.value)}
                          className="w-full pl-10 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm appearance-none"
                        >
                          {ARRIVAL_TIMES.map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                        <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{language === 'en' ? 'Special Occasion' : 'مناسبة خاصة'}</label>
                      <div className="relative">
                        <select 
                          value={specialRequest}
                          onChange={(e) => setSpecialRequest(e.target.value)}
                          className="w-full pl-10 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm appearance-none"
                        >
                          {SPECIAL_REQUESTS.map(req => <option key={req} value={req}>{req}</option>)}
                        </select>
                        <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{language === 'en' ? 'Additional Notes' : 'ملاحظات إضافية'}</label>
                    <div className="relative">
                      <textarea 
                        rows={3}
                        placeholder={language === 'en' ? 'E.g. Food allergies, extra pillows, airport pickup request...' : 'مثل: حساسية من الطعام، وسائد إضافية، طلب توصيل من المطار...'}
                        className="w-full pl-10 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-gold-500 outline-none text-sm resize-none"
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                      <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-navy-900 text-white font-bold py-4 rounded-sm uppercase tracking-widest hover:bg-gold-500 hover:text-navy-900 transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    {language === 'en' ? 'Complete Booking' : 'إتمام عملية الحجز'}
                    <span className="bg-white/20 px-3 py-1 rounded text-xs">${total}</span>
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-lg shadow-xl sticky top-24 overflow-hidden border border-gray-100">
                <div className="bg-navy-900 p-4 text-white">
                  <h3 className="text-lg font-serif font-bold text-center">
                    {language === 'en' ? 'Booking Summary' : 'ملخص الحجز'}
                  </h3>
                </div>
                
                <div className="p-6">
                   <div className="mb-6">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-2">{language === 'en' ? 'Selected Accomodation' : 'الغرفة المختارة'}</label>
                      <select 
                        value={selectedRoomId} 
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-sm text-sm outline-none focus:ring-1 focus:ring-gold-500"
                      >
                        {rooms.map(r => (
                          <option key={r.id} value={r.id}>{language === 'en' ? r.titleEn : r.titleAr}</option>
                        ))}
                      </select>
                   </div>

                   {selectedRoom && (
                     <>
                        <div className="relative h-40 rounded-sm overflow-hidden mb-6">
                          <img src={selectedRoom.imageUrl} alt="Room" className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2 bg-gold-500 text-navy-900 text-[10px] font-bold px-2 py-1 rounded uppercase">Featured</div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                             <span className="text-gray-500">{language === 'en' ? 'Rate per night' : 'سعر الليلة'}</span>
                             <span className="font-bold text-navy-900 font-mono">${selectedRoom.price}</span>
                          </div>
                          
                          {checkIn && checkOut && (
                             <div className="border-t border-dashed pt-4">
                               <div className="flex justify-between items-center mb-1">
                                  <span className="text-gray-500 text-xs">{language === 'en' ? 'Total Stay' : 'إجمالي الإقامة'}</span>
                                  <span className="text-navy-900 font-bold text-xl font-mono">${total}</span>
                               </div>
                               <p className="text-[10px] text-gray-400 text-center italic mt-2">
                                 {language === 'en' ? 'Prices include 16% sales tax and service charges' : 'الأسعار تشمل 16٪ ضريبة مبيعات ورسوم خدمة'}
                               </p>
                             </div>
                          )}
                        </div>
                     </>
                   )}
                </div>
                
                <div className="bg-stone-50 p-4 flex items-center gap-3 border-t">
                  <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <p className="text-[10px] leading-tight text-gray-500">
                    {language === 'en' 
                      ? 'Best rate guaranteed. Free cancellation up to 24 hours before check-in.' 
                      : 'ضمان أفضل سعر. إلغاء مجاني حتى 24 ساعة قبل موعد الوصول.'}
                  </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;