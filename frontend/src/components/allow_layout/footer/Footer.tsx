import List from './List';
import Instagram from '../../../assets/instagram.svg';
import Linkdin from '../../../assets/linkedin.svg';
import Logo_footer from '../../../assets/logo_footer.svg';

const Footer = () => {
  return (
    <footer className=" relative bg-primary text-white rounded-t-[40px] md:rounded-t-[70px] py-8 md:py-14 z-10">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-left space-y-0 mt-0 mb-5 md:my-5">
          <div className="flex space-x-8 text-2xl mx-auto md:ml-0 my-2">
            <a href="#" className="hover:text-gray-300"><img src={Instagram} alt="Gestiona Logo" className="w-10 sm:w-16" /></a>
            <a href="#" className="hover:text-gray-300"><img src={Linkdin} alt="Gestiona Logo" className="w-10 sm:w-16" /></a>
          </div>
          <p className='font-bold mt-0'>© 2024–2025 Gestiona Todos los derechos reservados</p>
        </div>
        <List
          title="Acerca de"
          items={[
            { label: "Sobre nosotros", href: "#" },
            { label: "Términos y condiciones", href: "#" },
            { label: "Política de privacidad", href: "#" },
          ]}
        />
      </div>
      <div className="max-w-4xl space-x-2 mt-0 mx-auto px-6">
        <img src={Logo_footer} alt="Gestiona Logo" className='w-52 md:w-72 mx-auto md:mr-0 md:ml-auto'/>
      </div>
    </footer>
  );
};

export default Footer;