import Logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between pt-4 pb-2 sm:pt-6 sm:pb-4 px-6 space-y-4 md:space-y-0">

        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="max-w-[70px]"/>
          <span className="font-bold text-3xl text-ct-grey">gestiona</span>
        </div>

        <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
          <a href="#" className="text-gray-700 hover:text-primary text-2xl">Servicios</a>
          <a href="#" className="text-gray-700 hover:text-primary text-2xl">Aprende</a>
          <a href="#" className="text-primary font-semibold text-2xl">Registro</a>

        </nav>
      </div>
    </header>
  );
};

export default Header;
