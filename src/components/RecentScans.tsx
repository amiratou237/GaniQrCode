import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const RecentScans: React.FC = () => {
  const scans = [
    { type: 'Lien', url: 'https://www.plannersdar.com/', date: '12.02.2023' },
    { type: 'Menu', url: 'Restaurant', date: '12.02.2023' },
    { type: 'Billets concert', url: 'Evenement', date: '12.02.2023' },
  ];

  return (
    <section className="px-6 mt-6">
      <h2 className="text-lg font-medium text-gray-700 mb-3">Scans Récents</h2>
      <div className="space-y-4">
        {scans.map((scan, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{scan.type}</p>
              <p className="text-xs text-gray-500">{scan.url}</p>
              <p className="text-xs text-gray-400">{scan.date}</p>
            </div>
            <FiChevronRight className="text-gray-400" size={20} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentScans;
