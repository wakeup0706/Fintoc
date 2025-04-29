import Profile_first from "../../../assets/profile_first.svg";
import Descubre from "../../../assets/descubre.jpg";
const TopSection = () => {
  return (
    <section className="bg-primary text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        <div className="w-full sm:w-1/2 mb-10 sm:mb-0">
          <h1 className="text-4xl lg:leading-normal sm:text-2xl font-extrabold mb-6 lg:text-5xl">Descubre y <br />
            controla todas <br />
            <span className="bg-[#AEE8FF] text-primary px-2 rounded">
              tus suscripciones
            </span>
          </h1>
          <p className="text-base sm:text-lg mb-6">
            Conecta tu cuenta bancaria o gmail y deja que Gestiona.io detecte automáticamente
            los servicios que se están cobrando cada mes.
          </p>
          <button className="bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
            Empieza gratis
          </button>
        </div>

        <div className="w-full md:w-1/2 relative flex justify-center">
          <div className="relative">
            <img
              src={Profile_first}
              alt="Phone and coffee"
              className="rounded-lg max-w-full h-auto"
            />
            <div className="absolute inset-1/2 max-w-md w-full" >
              <img src={Descubre} alt="Descubre" className="rounded-br-[80px] -translate-y-1/2 -translate-x-1/2 rounded-tl-[80px] max-w-full h-auto" />
              <div className="absolute -top-64 -left-64 w-28 h-28 border-[22px] border-white rounded-full translate-x-6 translate-y-6"></div>
              <div className="absolute -bottom-48 left-28 w-16 h-16 border-[14px] border-white rounded-full translate-x-6 translate-y-6"></div>
              <div className="absolute -bottom-32 left-44 w-28 h-28 border-4 border-[22px] border-white rounded-full"></div>
              </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopSection;