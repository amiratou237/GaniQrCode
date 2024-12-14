import React from 'react';
import Header from '../components/Header';
import FavoriteCodes from '../components/FavoriteCodes';
import RecentScans from '../components/RecentScans';
import BottomNavigation from '../components/BottomNavigation';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <FavoriteCodes />
      <RecentScans />
      <div className="flex-1"></div> {/* Spacer for content */}
      <BottomNavigation />
    </div>
  );
};

export default Home;
