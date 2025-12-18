
export enum Language {
  EN = 'en',
  AR = 'ar'
}

export enum RoomType {
  DELUXE = 'Deluxe Room',
  SUITE = 'Royal Suite',
  FAMILY = 'Family Suite',
  EXECUTIVE = 'Executive Room'
}

export interface Room {
  id: string;
  type: RoomType;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
  available: boolean;
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled'
}

export interface Booking {
  id: string;
  roomId: string;
  customerName: string;
  customerEmail: string;
  countryCode: string;
  customerPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  // Added optional fields to support detailed booking information from pages/Booking.tsx
  arrivalTime?: string;
  specialRequest?: string;
  notes?: string;
}
