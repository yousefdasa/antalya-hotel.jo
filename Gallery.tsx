
import React from 'react';

const Gallery: React.FC = () => {
  const imgs = [
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/630410933.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/630412403.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/630411560.jpg"
  ];
  return (
    <div className="pt-24 min-h-screen bg-stone-50 p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {imgs.map((src, i) => <img key={i} src={src} className="w-full h-80 object-cover shadow-lg rounded" alt="Hotel" />)}
      </div>
    </div>
  );
};
export default Gallery;
