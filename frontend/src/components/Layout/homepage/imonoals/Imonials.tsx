import React, { useState, useEffect } from 'react';
import ImonialCard from './ImonialSlider';
import ArticleAvatar from '../../../../assets/articel_avatar.jpg';
import nextArrow from '../../../../assets/icons/arrow2.svg';
const cardes = [
  {
    name: 'José Fuentes',
    image: ArticleAvatar,
    text: 'La aplicación registra todos mis gastos, me avisa cuando hay una diferencia en las facturas y me ayuda a reducirlas.',
  },
  {
    name: 'José Fuentes',
    image: ArticleAvatar,
    text: 'Pensé que esta aplicación no sería útil. Me equivoqué totalmente. Ahora ahorro mucho más.',
  },
  {
    name: 'José Fuentes',
    image: ArticleAvatar,
    text: 'Excelente app para finanzas personales. Muy intuitiva y práctica para llevar control de gastos.',
  },
  {
    name: 'José Fuentes',
    image: ArticleAvatar,
    text: 'Muy recomendada para quienes buscan reducir sus facturas mes a mes.',
  },
];

const ImonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(420);

  const getCardWidth = () => {
    const width = window.innerWidth;
    if (width < 376) return 100;
    return 420;
  }

  const handleNext = () => {
    if (currentIndex < cardes.length - 1-1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop back to start
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="px-4 pr-12 py-8 sm:py-16 max-w-6xl mx-auto bg-secondary rounded-tr-[70px] rounded-bl-[70px]">
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-ct-grey font-bold mb-4">Miles de personas ya están<br className='hidden sm:block'/> ahorrando con Gestiona</h2>
      </div>
      <p className="text-primary text-lg sm:text-xl max-w-[500px] text-center mx-auto p-1 sm:p-3 bg-[#AEE8FF] font-semibold mb-16 md:text-2xl">¡Comienza hoy totalmente gratis!</p>
      <div className=" relative w-full max-w-[52rem] mx-auto mr-40">
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
          >
            {cardes.map((t, idx) => (
              <ImonialCard key={idx} {...t} />
            ))}
          </div>
        </div>
        <div className=" absolute -right-14 top-[195px] -translate-y-full">
          <button
            onClick={handleNext}
            className=" rounded-full px-3 py-2 transition"
          > <img src={nextArrow} alt="nextArrow" className='w-10' /></button>
        </div>
      </div>
    </section>
  );
};

export default ImonialSlider;