import React from 'react';

// Définir les types des props (si besoin)
interface MaintenanceProps {
  message?: string;
}

const Maintenance: React.FC<MaintenanceProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Page en Maintenance</h1>
        <p className="mt-4 text-lg text-gray-600">{message || "Nous reviendrons bientôt. Merci pour votre patience !"}</p>
      </div>
    </div>
  );
};

export default Maintenance;
