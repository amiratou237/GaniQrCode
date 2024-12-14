import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
