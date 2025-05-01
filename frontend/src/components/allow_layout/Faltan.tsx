import Rectangle from "../../assets/Rectangle.jpg";
import Logo from "../../assets/logoWhite.svg";
const Faltan = () => {
  return (
    <section className="-mb-7 sm:-mb-6 md:-mb-16">
      <div className=" relative max-w-4xl mx-8 md:mx-auto">
        <div className="absolute top-2 sm:top-10 md:top-24 lg:top-36 xl:top-48">
          <div className="bg-[#361BD0] p-2 sm:p-3 rounded-lg sm:rounded-xl max-w-[46px] sm:max-w-[75px] lg:max-w-[94px]">
            <img src={Logo} alt="logo" className="h-[30px] sm:h-[50px] lg:h-[70px] w-[30px] sm:w-[50px] lg:w-[70px]"/>
          </div>
          <p className="text-white text-[12px] sm:text-[18px] lg:text-[22px] font-bold">gestiona</p>
        </div>
        <div className="absolute top-[80px] sm:top-[200px] md:top-[300px] lg:top-[430px] xl:top-[580px] 2xl:top-[720px]">
          <p className="text-primary bg-[#AEE8FF] text-[20px] sm:text-[30px] lg:text-[40px] max-w-[270px] sm:max-w-[380px] lg:max-w-[490px] font-bold py-0 px-6">¡FALTAN POCOS DÍAS!</p>
          <p className="text-white text-[16px] sm:text-[24px] lg:text-[28px] font-bold py-0 px-1 sm:px-6 max-w-[600px] lg:max-w-[740px] my-2">Millones de personas pierden dinero en suscripciones olvidadas. Eso está por cambiar.</p>
        </div>
      </div>
      <img src={Rectangle} alt="" className="w-screen"/>
    </section>
  );
};

export default Faltan;