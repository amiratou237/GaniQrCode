import React from 'react';

const QRCodeScanner: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800">Scan Code Here</h2>
      <div className="mt-4 flex justify-center">
        <div className="w-32 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center">
          <p className="text-sm text-gray-500">QR Code</p>
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
        Scan QR Code
      </button>
    </div>
  );
};

export default QRCodeScanner;
