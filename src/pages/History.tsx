import React from 'react';
import Maintenance from '../components/Maintenance';
import BottomNavigation from '../components/BottomNavigation';

const History: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1"></div> {/* Spacer for content */}
        <Maintenance />
      <BottomNavigation />
    </div>
  );
};

export default History;
