import React from 'react';
import promoImage from '/placeholder.jpg';

// PromoCard component: displays a promotional image and caption
export default function PromoCard() {
  return (
    <div className="relative">
      {/* Promo image */}
      <img src={promoImage} alt="Promo Dish" className="rounded-xl w-full object-cover" loading="lazy" />
      {/* Caption overlay */}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
        Taco Tuesday Deal
      </div>
    </div>
  );
}