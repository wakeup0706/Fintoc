import React, { useState, useRef, useEffect } from "react";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleClickOutside = () => {
    if (menuRef.current) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-left" ref={menuRef}>
      <div
        className="relative w-12 h-8 flex flex-col justify-center items-center cursor-pointer"
        onClick={toggleMenu}
      >
        <div
          className={`w-[45px] h-1 rounded mb-2 bg-primary transition-all duration-500 ease-in-out ${
            isOpen ? 'animate-stick-1-open' : 'animate-stick-1-close'
          }`}
        ></div>

        <div
          className={`w-[45px] h-1 rounded mb-2 bg-primary transition-all duration-500 ease-in-out ${
            isOpen ? 'animate-stick-2-open' : 'animate-stick-2-close'
          }`}
        ></div>

        <div
          className={`w-[45px] h-1 rounded mb-0 bg-primary transition-all duration-500 ease-in-out ${
            isOpen ? 'animate-stick-3-open' : 'animate-stick-3-close'
          }`}
        ></div>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-[20px] w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 transition-all transform opacity-0 scale-95"
          style={{
            transitionDuration: "300ms",
            transform: isOpen ? "scale(1)" : "scale(0.95)",
            opacity: isOpen ? 1 : 0,
          }}
          ref={menuRef}
        >
          <div className="py-1">
            <a
              href="#Servicios"
              className="block px-4 py-3 text-xl text-ct-grey hover:bg-gray-100"
            >
              Servicios
            </a>
            <a
              href="#Aprende"
              className="block px-4 py-3 text-xl text-ct-grey hover:bg-gray-100"
            >
              Aprende
            </a>
            <a
              href="signup"
              className="block px-4 py-3 text-xl text-ct-grey hover:bg-gray-100"
            >
              Registro
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuButton;