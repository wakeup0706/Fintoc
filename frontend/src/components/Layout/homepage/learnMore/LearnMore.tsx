import FAQItem from './FAQitem';
const FAQs = [
  {
    question: "¿Qué es Gestiona.io?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  },
  {
    question: "¿En qué países está disponible Gestiona.io?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  },
  {
    question: "¿Cuáles suscripciones puede detectar Gestiona.io?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  },
  {
    question: "¿Puedo cancelar una suscripción directamente desde Gestiona.io?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  },
  {
    question: "¿Gestiona.io es gratis?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  },
  {
    question: "¿Puedo usar Gestiona.io si estoy en Chile?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  },
  {
    question: "¿Qué tan frecuente se actualiza la información?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  },
  {
    question: "¿Qué hago si detectaron una suscripción que ya cancelé?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  },
  {
    question: "¿Puedo confiar en que mis datos están protegidos?",
    answer: "Absolutamente. Seguimos estándares internacionales de seguridad, cifrado de extremo a extremo y no compartimos tu información con terceros."
  }
]
const LearnMore = () => {
  return (
    <section className="px-4 py-16 max-w-4xl mx-auto rounded-tr-[70px] rounded-bl-[70px]">
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl text-ct-grey font-bold mb-4">Conoce más sobre nosotros</h2>
      </div>
      <p className="text-primary text-xl font-semibold mt-10 sm:mt-16 mb-6 md:text-2xl text-center">
        Preguntas Frecuentes
      </p>
      <div className="max-w-6xl mx-auto">
        {
        FAQs.map((con, index)=>(
          <FAQItem
            key= {index}
            question={con.question}
            answer={con.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default LearnMore;