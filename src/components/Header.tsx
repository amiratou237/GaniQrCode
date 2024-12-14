import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-600 text-white px-6 py-4 rounded-b-3xl shadow-lg">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Bienvenue sur le générateur de Qr code d'Amiratou!</h1>
        <div className="relative">
          <FiSearch className="absolute top-2 left-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Recherche"
            className="w-full pl-10 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 shadow"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
