import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { BookingStatus, RoomType, Room } from '../types';
import { 
  Users, DollarSign, Calendar, Cloud, RefreshCw, Copy, Check, 
  Plus, Edit2, Trash2, X, Phone, MessageSquare, Clock, 
  Database, Download, Upload, AlertTriangle, ShieldCheck
} from 'lucide-react';

const Admin: React.FC = () => {
  const { 
    bookings, isAdminAuthenticated, loginAdmin, logoutAdmin, updateBookingStatus, 
    rooms, addRoom, updateRoom, deleteRoom, resetDatabase,
    exportDatabase, importDatabase,
    syncCode, pushToCloud, pullFromCloud, isSyncing 
  } = useAppContext();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'rooms' | 'database'>('dashboard');
  const [inputSyncCode, setInputSyncCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Room Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomForm, setRoomForm] = useState<Partial<Room>>({
    type: RoomType.DELUXE,
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    price: 0,
    capacity: 2,
    amenities: ['wifi', 'ac'],
    imageUrl: '',
    available: true
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') loginAdmin();
    else alert('خطأ في البيانات');
  };

  const handlePush = async () => {
    try {
      const code = await pushToCloud();
      alert(`تم رفع البيانات بنجاح! كود المزامنة الخاص بك هو: ${code}`);
    } catch (e) {
      alert('حدث خطأ في المزامنة السحابية. يرجى تجربة النسخ الاحتياطي اليدوي.');
    }
  };

  const handlePull = async () => {
    const success = await pullFromCloud(inputSyncCode);
    if (success) alert('تمت مزامنة البيانات بنجاح!');
    else alert('كود المزامنة غير صحيح');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const success = await importDatabase(content);
      if (success) alert('تم استيراد قاعدة البيانات بنجاح!');
      else alert('الملف غير صالح');
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(syncCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const openAddForm = () => {
    setEditingRoom(null);
    setRoomForm({ type: RoomType.DELUXE, titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', price: 0, capacity: 2, amenities: ['wifi', 'ac'], imageUrl: '', available: true });
    setIsFormOpen(true);
  };

  const openEditForm = (room: Room) => {
    setEditingRoom(room);
    setRoomForm(room);
    setIsFormOpen(true);
  };

  const handleRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom) updateRoom({ ...editingRoom, ...roomForm } as Room);
    else addRoom({ ...roomForm, id: Date.now().toString() } as Room);
    setIsFormOpen(false);
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6 text-center">دخول الإدارة</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-gold-500 outline-none" />
            <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-gold-500 outline-none" />
            <button className="w-full bg-navy-800 text-white py-3 rounded font-bold hover:bg-navy-900 transition shadow-lg">دخول</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <ShieldCheck className="text-gold-500" /> إدارة أنطاليا هوتيل
          </h1>
          <div className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-100 flex-wrap justify-center overflow-hidden">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded transition-colors ${activeTab === 'dashboard' ? 'bg-navy-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>الإحصائيات</button>
            <button onClick={() => setActiveTab('rooms')} className={`px-4 py-2 rounded transition-colors ${activeTab === 'rooms' ? 'bg-navy-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>الغرف</button>
            <button onClick={() => setActiveTab('bookings')} className={`px-4 py-2 rounded transition-colors ${activeTab === 'bookings' ? 'bg-navy-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>الحجوزات</button>
            <button onClick={() => setActiveTab('database')} className={`px-4 py-2 rounded transition-colors ${activeTab === 'database' ? 'bg-gold-500 text-navy-900 font-bold shadow-md' : 'text-navy-900 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-1"><Database size={16}/> البيانات</div>
            </button>
            <div className="w-px bg-gray-200 mx-2 my-1 hidden md:block"></div>
            <button onClick={logoutAdmin} className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded transition-colors">خروج</button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 font-medium">إجمالي الحجوزات</p>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={20} /></div>
               </div>
               <p className="text-3xl font-bold text-navy-900">{bookings.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 font-medium">إجمالي الغرف</p>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Users size={20} /></div>
               </div>
               <p className="text-3xl font-bold text-navy-900">{rooms.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 font-medium">إجمالي الإيرادات</p>
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={20} /></div>
               </div>
               <p className="text-3xl font-bold text-navy-900">${bookings.reduce((s, b) => s + b.totalPrice, 0)}</p>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy-900">إدارة الغرف والأجنحة</h2>
              <button onClick={openAddForm} className="bg-gold-500 text-navy-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gold-600 transition shadow-md"><Plus size={18} /> إضافة غرفة جديدة</button>
            </div>

            {isFormOpen && (
              <div className="bg-white p-6 rounded-xl shadow-xl border border-gold-100 animate-fade-in mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-navy-900">{editingRoom ? 'تعديل بيانات الغرفة' : 'إضافة غرفة جديدة'}</h3>
                  <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-red-500"><X size={24} /></button>
                </div>
                <form onSubmit={handleRoomSubmit} className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نوع الغرفة</label>
                    <select value={roomForm.type} onChange={(e) => setRoomForm({...roomForm, type: e.target.value as RoomType})} className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-gold-500">
                      {Object.values(RoomType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
                    <input type="text" value={roomForm.imageUrl} onChange={(e) => setRoomForm({...roomForm, imageUrl: e.target.value})} className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-gold-500" required />
                  </div>
                  <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (English)</label>
                      <input type="text" value={roomForm.titleEn} onChange={(e) => setRoomForm({...roomForm, titleEn: e.target.value})} className="w-full p-2 border rounded" required />
                    </div>
                    <div dir="rtl">
                      <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (عربي)</label>
                      <input type="text" value={roomForm.titleAr} onChange={(e) => setRoomForm({...roomForm, titleAr: e.target.value})} className="w-full p-2 border rounded text-right" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">السعر ($)</label>
                    <input type="number" value={roomForm.price} onChange={(e) => setRoomForm({...roomForm, price: parseInt(e.target.value)})} className="w-full p-2 border rounded" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">السعة</label>
                    <input type="number" value={roomForm.capacity} onChange={(e) => setRoomForm({...roomForm, capacity: parseInt(e.target.value)})} className="w-full p-2 border rounded" required />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-navy-900 text-white py-3 rounded-lg font-bold hover:bg-gold-500 hover:text-navy-900 transition shadow-lg">حفظ الغرفة</button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {rooms.map(room => (
                 <div key={room.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                    <div className="h-40 relative">
                      <img src={room.imageUrl} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                         <button onClick={() => openEditForm(room)} className="p-2 bg-white rounded-full text-navy-900"><Edit2 size={16} /></button>
                         <button onClick={() => deleteRoom(room.id)} className="p-2 bg-white rounded-full text-red-600"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-gold-600 font-bold uppercase">{room.type}</p>
                      <h3 className="font-bold text-navy-900 line-clamp-1">{room.titleAr}</h3>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-fade-in">
             <div className="overflow-x-auto">
               <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4">الضيف</th>
                      <th className="p-4">الاتصال</th>
                      <th className="p-4">الوصول</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-navy-900">{b.customerName}</div>
                          <div className="text-[10px] text-gray-400 font-mono">#{b.id.slice(-6)}</div>
                        </td>
                        <td className="p-4 text-xs text-gray-600">
                           <div>{b.countryCode} {b.customerPhone}</div>
                           <div className="text-[10px] text-gray-400">{b.customerEmail}</div>
                        </td>
                        <td className="p-4 text-xs font-medium">{b.checkIn}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span>
                        </td>
                        <td className="p-4">
                          {b.status === 'Pending' && (
                            <button onClick={() => updateBookingStatus(b.id, BookingStatus.CONFIRMED)} className="bg-navy-900 text-white px-3 py-1 rounded text-[10px] font-bold">تأكيد</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-6 animate-fade-in">
            {/* System Health Section */}
            <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4 text-navy-900">
                     <ShieldCheck className="text-green-500" />
                     <h3 className="font-bold">حالة قاعدة البيانات المحلية</h3>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">نوع التخزين:</span>
                        <span className="font-bold text-blue-600">IndexedDB Engine</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">حالة الاتصال:</span>
                        <span className="font-bold text-green-500">نشط (Online)</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">آخر مزامنة محلية:</span>
                        <span className="font-bold">{new Date().toLocaleTimeString()}</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4 text-navy-900">
                     <RefreshCw className={isSyncing ? "animate-spin text-gold-500" : "text-gold-500"} />
                     <h3 className="font-bold">المزامنة السحابية</h3>
                  </div>
                  <div className="space-y-4">
                     {syncCode ? (
                        <div className="p-3 bg-stone-50 rounded-lg flex items-center justify-between">
                           <span className="text-xs font-mono font-bold tracking-widest">{syncCode}</span>
                           <button onClick={copyToClipboard} className="text-gray-400 hover:text-gold-500">
                             {copySuccess ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
                           </button>
                        </div>
                     ) : (
                        <p className="text-xs text-gray-400 italic">لا يوجد كود مزامنة حالي</p>
                     )}
                     <button onClick={handlePush} disabled={isSyncing} className="w-full py-2 bg-navy-900 text-white rounded-lg text-sm font-bold shadow-md hover:bg-navy-800 disabled:opacity-50">تحديث السحابة الآن</button>
                  </div>
               </div>
            </div>

            {/* Manual Backup Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gold-100">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gold-100 text-gold-600 rounded-2xl shadow-inner">
                     <Download size={32} />
                  </div>
                  <div>
                     <h3 className="text-xl font-serif font-bold text-navy-900">النسخ الاحتياطي اليدوي (Offline)</h3>
                     <p className="text-sm text-gray-500">قم بتحميل بياناتك كملف أو استرجاعها في أي وقت دون الحاجة لإنترنت.</p>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 bg-stone-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                     <Download size={40} className="mx-auto text-gray-400 mb-4" />
                     <h4 className="font-bold mb-2">تصدير البيانات</h4>
                     <p className="text-xs text-gray-500 mb-6">احصل على ملف JSON يحتوي على كافة الغرف والحجوزات.</p>
                     <button onClick={exportDatabase} className="px-8 py-3 bg-white border-2 border-navy-900 text-navy-900 rounded-xl font-bold hover:bg-navy-900 hover:text-white transition shadow-sm flex items-center gap-2 mx-auto">
                        <Download size={18}/> تحميل النسخة الآن
                     </button>
                  </div>

                  <div className="p-6 bg-stone-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                     <Upload size={40} className="mx-auto text-gray-400 mb-4" />
                     <h4 className="font-bold mb-2">استيراد البيانات</h4>
                     <p className="text-xs text-gray-500 mb-6">ارفع ملف نسخة احتياطية سابقة لاستبدال البيانات الحالية.</p>
                     <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".json" />
                     <button onClick={() => fileInputRef.current?.click()} className="px-8 py-3 bg-gold-500 text-navy-900 rounded-xl font-bold hover:bg-gold-600 transition shadow-md flex items-center gap-2 mx-auto">
                        <Upload size={18}/> اختيار ملف ورفعه
                     </button>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="text-red-500 shrink-0" size={20} />
                  <div>
                     <p className="text-xs text-red-800 font-bold">منطقة الخطر</p>
                     <p className="text-[10px] text-red-600">يمكنك تهيئة النظام وحذف كافة البيانات المحلية. هذا الإجراء لا يمكن التراجع عنه.</p>
                     <button onClick={resetDatabase} className="mt-2 text-[10px] text-red-600 font-bold underline">تهيئة النظام بالكامل</button>
                  </div>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;