
import React, { useState } from 'react';
import { useAppContext } from './AppContext';

const Admin: React.FC = () => {
  const { bookings, isAdminAuthenticated, loginAdmin, logoutAdmin, rooms } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
        <form onSubmit={(e) => { e.preventDefault(); if (username === 'admin' && password === 'admin123') loginAdmin(); }} className="bg-white p-8 rounded shadow-2xl w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input type="text" placeholder="admin" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border mb-4 rounded" />
          <input type="password" placeholder="admin123" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border mb-6 rounded" />
          <button className="w-full bg-navy-800 text-white py-3 rounded font-bold">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={logoutAdmin} className="text-red-500 font-bold">Logout</button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded shadow">
             <h3 className="font-bold mb-4 text-gray-500 uppercase">Recent Bookings</h3>
             <p className="text-gray-400 italic">No bookings yet.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
             <h3 className="font-bold mb-4 text-gray-500 uppercase">Rooms ({rooms.length})</h3>
             {rooms.map(r => <div key={r.id} className="p-2 border-b text-sm">{r.titleEn} - ${r.price}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
