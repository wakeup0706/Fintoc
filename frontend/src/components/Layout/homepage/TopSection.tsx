import Profile_first from "../../../assets/profile_first.svg";
import Descubre from "../../../assets/descubre.jpg";
import Button from "../../common/Button";
const TopSection = () => {
  return (
    <section className="bg-primary text-white rounded-xl mt-10 md:mt-24 pb-10 sm:pb-16 py-16 sm:px-6 md:px-12 max-w-full overflow-hidden px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 sm:mb-0">
          <h1 className="text-xl lg:leading-normal sm:text-2xl font-extrabold mb-6 lg:text-4xl">Descubre y <br className="hidden md:block" />
            controla todas <br />
            <span className="bg-[#AEE8FF] text-primary px-2 rounded mt-2">
              tus suscripciones
            </span>
          </h1>
          <p className="text-base md:text-lg mb-6">
            Conecta tu cuenta bancaria o gmail y deja que Gestiona.io detecte automáticamente
            los servicios que se están cobrando cada mes.
          </p>
          <Button title="Empieza gratis" bgColor="white" px="6" py="2" otherStyle="sm:py-3"/>
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
              <div className="absolute -top-40 sm:-top-64 -left-48 sm:-left-64 w-16 h-16 sm:w-28 sm:h-28 border-[15px] sm:border-[22px] border-white rounded-full translate-x-6 translate-y-6"></div>
              <div className="absolute -bottom-28 sm:-bottom-48 left-16 sm:left-28 w-16 h-16 border-[14px] border-white rounded-full translate-x-6 translate-y-6"></div>
              <div className="absolute -bottom-32 left-44 w-28 h-28 border-[22px] border-white rounded-full"></div>
              </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopSection;