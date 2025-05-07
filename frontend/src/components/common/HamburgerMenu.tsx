import React from "react";

const HamburgerMenu: React.FC = () => {
  return (
    <div
      className="inline-block cursor-pointer transition-transform duration-300 hover:scale-110 rounded-full p-2 hover:bg-gray-200"
    >
      <div className="w-6 h-[2px] bg-gray-800 my-1 transition-all duration-300"></div>
      <div className="w-6 h-[2px] bg-gray-800 my-1 transition-opacity duration-300"></div>
      <div className="w-6 h-[2px] bg-gray-800 my-1 transition-all duration-300"></div>
    </div>
  );
};

export default HamburgerMenu;