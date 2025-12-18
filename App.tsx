import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './Navbar';
import Footer from './Footer';
import AIConcierge from './AIConcierge';
import Home from './Home';
import Rooms from './Rooms';
import BookingPage from './Booking';
import Admin from './Admin';
import Contact from './Contact';
import Facilities from './Facilities';
import Gallery from './Gallery';

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => (
    <>
        <Navbar />
        <div className="min-h-[80vh]">{children}</div>
        <AIConcierge />
        <Footer />
    </>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
          <Route path="/booking" element={<Layout><BookingPage /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};
export default App;