import React from "react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin shadow-xl"></div>
        <div className="absolute inset-2 rounded-full bg-black bg-opacity-80"></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
