
import { RoomType } from './types';

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
  },
  {
    id: '3',
    type: RoomType.FAMILY,
    titleEn: 'Family Executive Suite',
    titleAr: 'جناح عائلي فاخر',
    descriptionEn: 'Spacious rooms designed for the perfect family getaway.',
    descriptionAr: 'غرف واسعة مصممة لرحلة عائلية مثالية.',
    price: 220,
    capacity: 5,
    amenities: ['wifi', 'ac', 'tv', 'minibar', 'kitchen'],
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/498418021.jpg',
    available: true
  }
];

export const TRANSLATIONS: Record<string, any> = {
  heroTitle: { en: "The Crown of Luxury", ar: "تـاج الـفـخـامـة" },
  heroSubtitle: { en: "Experience unmatched 5-star elegance in the heart of Jordan's capital.", ar: "استمتع بأناقة 5 نجوم لا تضاهى في قلب العاصمة الأردنية." },
  bookNow: { en: "Book Your Stay", ar: "احجز إقامتك الآن" },
  home: { en: "Home", ar: "الرئيسية" },
  rooms: { en: "Suites", ar: "الأجنحة" },
  facilities: { en: "Services", ar: "الخدمات" },
  gallery: { en: "Gallery", ar: "المعرض" },
  contact: { en: "Contact", ar: "اتصل بنا" },
  night: { en: "/ night", ar: "/ ليلة" },
  footerText: { en: "© 2024 Antalya Hotel Amman. Luxury Collection.", ar: "© 2024 فندق أنطاليا عمان. مجموعة الفخامة." },
  aiPrompt: { en: "Concierge", ar: "المساعد الذكي" },
  guests: { en: "Guests", ar: "ضيوف" },
  viewRooms: { en: "View All Suites", ar: "عرض كافة الأجنحة" }
};

