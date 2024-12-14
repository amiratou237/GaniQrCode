import React from 'react';
import { NavLink } from 'react-router-dom'; // Import pour gérer les liens
import {AiOutlineScan, AiOutlineQrcode, AiOutlineHome, AiOutlineHistory, AiOutlineUser } from 'react-icons/ai';

const BottomNavigation: React.FC = () => {
  const navItems = [
    { icon: <AiOutlineHome size={24} />, label: 'Accueil', route: '/' },
    { icon: <AiOutlineQrcode size={24} />, label: 'Générer', route: '/generate' },
    { icon: <AiOutlineScan size={24} />, label: 'Scan', route: '/scan', special: true },
    { icon: <AiOutlineHistory size={24} />, label: 'Historique', route: '/history' },
    { icon: <AiOutlineUser size={24} />, label: 'Compte', route: '/account' },
  ];

  return (
    <nav className="bg-white shadow-t p-4 flex justify-between items-center fixed bottom-0 inset-x-0">
      {navItems.map((item, index) =>
        item.special ? (
          // Style spécial pour le bouton "Scan"
          <NavLink
            to={item.route}
            key={index}
            className={({ isActive }) =>
              `relative flex flex-col items-center bg-purple-500 text-white rounded-full p-4 h-16 w-16 shadow-md transform translate-y-[-30%] hover:bg-purple-600 ${
                isActive ? 'bg-purple-600' : ''
              }`
            }
          >
            {item.icon}
            <span className="text-xs font-bold">{item.label}</span>
          </NavLink>
        ) : (
          // Style standard pour les autres boutons
          <NavLink
            to={item.route}
            key={index}
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-400 hover:text-purple-600 ${
                isActive ? 'text-purple-600' : ''
              }`
            }
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </NavLink>
        )
      )}
    </nav>
  );
};

export default BottomNavigation;
