import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
            isOpen ? "animate-stick-1-open" : "animate-stick-1-close"
          }`}
        ></div>
        <div
          className={`w-[45px] h-1 rounded mb-2 bg-primary transition-all duration-500 ease-in-out ${
            isOpen ? "animate-stick-2-open" : "animate-stick-2-close"
          }`}
        ></div>
        <div
          className={`w-[45px] h-1 rounded mb-0 bg-primary transition-all duration-500 ease-in-out ${
            isOpen ? "animate-stick-3-open" : "animate-stick-3-close"
          }`}
        ></div>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-5 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 transition-all transform"
          style={{
            transitionDuration: "300ms",
            transform: "scale(1)",
            opacity: 1,
          }}
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
              href=""
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
                setIsOpen(false);
              }}
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