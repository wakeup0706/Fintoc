import Logo from "../../assets/logo.svg";

const Top = () => {
  return (
    <section className="my-8">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-center pt-4 pb-2 sm:pt-6 sm:pb-4 px-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="max-w-[80px]"/>
          <span className="font-bold text-4xl text-ct-grey">gestiona</span>
        </div>
      </div>
    </section>
  );
};

export default Top;
