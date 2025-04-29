import React, { useState } from 'react';
import ImonialCard from './ImonialSlider';
import ArticleAvatar from '../../../../assets/articel_avatar.jpg';
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
  const cardWidth = 420;

  const handleNext = () => {
    if (currentIndex < cardes.length - 1-1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop back to start
    }
  };

  return (
    <section className="px-4 py-16 max-w-6xl mx-auto bg-secondary rounded-tr-[70px] rounded-bl-[70px]">
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl text-ct-grey font-bold mb-4">Miles de personas ya están<br/> ahorrando con Gestiona</h2>
      </div>
      <p className="text-primary text-xl max-w-[500px] text-center mx-auto p-3 bg-[#AEE8FF] font-semibold mb-16 md:text-2xl">Invertimos pagos por suscripciones</p>
      <div className="w-full max-w-4xl mx-auto mr-40">
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
        <div className="flex justify-end mt-4">
          <button
            onClick={handleNext}
            className="bg-primary text-white rounded-full p-3 hover:bg-primary transition"
          >
            ➤
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImonialSlider;