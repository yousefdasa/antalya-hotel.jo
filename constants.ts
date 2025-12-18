
import { RoomType, Language } from './types';

export const HOTEL_INFO = {
  name: "Antalya Hotel Amman",
  location: "Amman, Jordan",
  phone: "+962 7 9908 6087",
  email: "reservations@antalyahotelamman.com"
};

export const INITIAL_ROOMS = [
  {
    id: '1',
    type: RoomType.DELUXE,
    titleEn: 'Deluxe City View',
    titleAr: 'غرفة ديلوكس مطلة على المدينة',
    descriptionEn: 'Elegant 40sqm room with a stunning view of Amman.',
    descriptionAr: 'غرفة أنيقة بمساحة 40 متر مربع مع إطلالة خلابة على عمان.',
    price: 120,
    capacity: 2,
    amenities: ['wifi', 'ac', 'tv', 'minibar'],
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/498418018.jpg',
    available: true
  },
  {
    id: '2',
    type: RoomType.SUITE,
    titleEn: 'Royal Suite',
    titleAr: 'الجناح الملكي',
    descriptionEn: 'Experience ultimate luxury with private jacuzzi.',
    descriptionAr: 'جرب الرفاهية المطلقة مع جاكوزي خاص.',
    price: 350,
    capacity: 4,
    amenities: ['wifi', 'ac', 'tv', 'minibar', 'jacuzzi'],
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/498418012.jpg',
    available: true
  }
];

export const TRANSLATIONS: Record<string, any> = {
  heroTitle: { en: "Where Comfort Meets Elegance", ar: "حيث تلتقي الراحة بالأناقة" },
  heroSubtitle: { en: "Experience the heart of Amman in luxury.", ar: "استمتع بقلب عمان في فخامة." },
  bookNow: { en: "Book Now", ar: "احجز الآن" },
  home: { en: "Home", ar: "الرئيسية" },
  rooms: { en: "Rooms", ar: "الغرف" },
  facilities: { en: "Facilities", ar: "المرافق" },
  gallery: { en: "Gallery", ar: "المعرض" },
  contact: { en: "Contact", ar: "اتصل بنا" },
  night: { en: "/ night", ar: "/ ليلة" },
  footerText: { en: "© 2024 Antalya Hotel. All rights reserved.", ar: "© 2024 فندق أنطاليا. جميع الحقوق محفوظة." },
  aiPrompt: { en: "AI Concierge", ar: "المساعد الذكي" },
  // Added missing translation keys used in components
  viewRooms: { en: "View Rooms", ar: "عرض الغرف" },
  guests: { en: "Guests", ar: "ضيوف" },
  search: { en: "Book Your Stay", ar: "احجز إقامتك" },
  checkIn: { en: "Check In", ar: "موعد الوصول" },
  checkOut: { en: "Check Out", ar: "موعد المغادرة" },
  aboutUs: { en: "About Us", ar: "من نحن" },
  admin: { en: "Admin", ar: "الإدارة" }
};
