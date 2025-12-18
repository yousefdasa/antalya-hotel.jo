import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Room, Booking, BookingStatus } from './types';
import { INITIAL_ROOMS } from './constants';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  rooms: Room[];
  addRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  resetDatabase: () => void;
  exportDatabase: () => void;
  importDatabase: (jsonData: string) => Promise<boolean>;
  syncCode: string;
  setSyncCode: (code: string) => void;
  pushToCloud: () => Promise<string>;
  pullFromCloud: (code: string) => Promise<boolean>;
  isSyncing: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const CLOUD_API_BASE = 'https://api.npoint.io/bins';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncCode, setSyncCode] = useState(() => localStorage.getItem('antalya_sync_code') || '');
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => localStorage.getItem('adminAuth') === 'true');

  useEffect(() => {
    const storedRooms = localStorage.getItem('rooms');
    const storedBookings = localStorage.getItem('bookings');
    if (storedRooms) setRooms(JSON.parse(storedRooms));
    if (storedBookings) setBookings(JSON.parse(storedBookings));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('rooms', JSON.stringify(rooms));
    localStorage.setItem('antalya_sync_code', syncCode);
  }, [bookings, rooms, syncCode]);

  useEffect(() => {
    localStorage.setItem('adminAuth', String(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  useEffect(() => {
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const addBooking = (booking: Booking) => setBookings(prev => [booking, ...prev]);
  const updateBookingStatus = (id: string, status: BookingStatus) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  const addRoom = (room: Room) => setRooms(prev => [...prev, room]);
  const updateRoom = (updatedRoom: Room) => setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
  const deleteRoom = (id: string) => setRooms(prev => prev.filter(r => r.id !== id));
  const loginAdmin = () => setIsAdminAuthenticated(true);
  const logoutAdmin = () => setIsAdminAuthenticated(false);

  const pushToCloud = async () => {
    setIsSyncing(true);
    try {
      const data = { rooms, bookings, updatedAt: new Date().toISOString() };
      const response = await fetch(CLOUD_API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const newCode = result.id || result.binId;
      setSyncCode(newCode);
      return newCode;
    } catch (error) { throw error; } finally { setIsSyncing(false); }
  };

  const pullFromCloud = async (code: string) => {
    setIsSyncing(true);
    try {
      const response = await fetch(`${CLOUD_API_BASE}/${code}`);
      const data = await response.json();
      if (data.rooms) setRooms(data.rooms);
      if (data.bookings) setBookings(data.bookings);
      setSyncCode(code);
      return true;
    } catch (error) { return false; } finally { setIsSyncing(false); }
  };

  const resetDatabase = () => {
    setRooms(INITIAL_ROOMS);
    setBookings([]);
    setSyncCode('');
  };

  const exportDatabase = () => {
    const data = { rooms, bookings, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `antalya_db_backup.json`;
    a.click();
  };

  const importDatabase = async (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.rooms) setRooms(data.rooms);
      if (data.bookings) setBookings(data.bookings);
      return true;
    } catch (e) { return false; }
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage, rooms, addRoom, updateRoom, deleteRoom,
      bookings, addBooking, updateBookingStatus,
      isAdminAuthenticated, loginAdmin, logoutAdmin, resetDatabase,
      exportDatabase, importDatabase,
      syncCode, setSyncCode, pushToCloud, pullFromCloud, isSyncing
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};