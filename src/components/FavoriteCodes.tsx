import React from 'react';
import { AiOutlineQrcode } from 'react-icons/ai';

const FavoriteCodes: React.FC = () => {
  const favorites = ['WiFi', 'Portfolio', 'Famille', 'Contact'];

  return (
    <section className="px-6 mt-4">
      <h2 className="text-lg font-medium text-gray-700 mb-3">Mes Qr code favoris</h2>
      <div className="grid grid-cols-4 gap-4">
        {favorites.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-purple-100 text-purple-600 p-4 rounded-lg shadow-md"
          >
            <AiOutlineQrcode size={30} />
            <span className="text-sm font-medium mt-2">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoriteCodes;
