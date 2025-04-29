import React from 'react';
import List from './List';
import Instagram from '../../../assets/instagram.svg';
import Linkdin from '../../../assets/linkedin.svg';
import Logo_footer from '../../../assets/logo_footer.svg';

const Footer = () => {
  return (
    <footer className="bg-primary text-white rounded-t-[100px] py-14">
      
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center text-center sm:text-left">
        <List
          title="Características"
          items={[
            { label: "Administrar suscripciones", href: "#" },
            { label: "Metas financieras", href: "#" },
            { label: "Perspectivas sobre el gasto", href: "#" },
            { label: "Negociación de facturas", href: "#" },
            { label: "Presupuesto", href: "#" },
          ]}
        />
        <div className="grid grid-cols-2 gap-8 text-left">
          <List
            title="Acerca de"
            items={[
              { label: "Sobre nosotros", href: "#" },
              { label: "Actualizaciones de la empresa", href: "#" },
            ]}
          />
          <List
            title="Apoyo"
            items={[
              { label: "Seguridad", href: "#" },
              { label: "Contáctanos", href: "#" },
              { label: "Centro de ayuda", href: "#" },
              { label: "Afiliados", href: "#" },
              { label: "Condiciones de servicio", href: "#" },
              { label: "Contáctanos", href: "#" },
            ]}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-left space-y-4 md:space-y-0 ">
          <div className="flex space-x-8 text-2xl">
            <a href="#" className="hover:text-gray-300"><img src={Instagram} alt="Gestiona Logo" className="w-16" /></a>
            <a href="#" className="hover:text-gray-300"><img src={Linkdin} alt="Gestiona Logo" className="w-16" /></a>
          </div>
          <p className='font-bold'>© 2024–2025 Gestiona Todos los derechos reservados</p>
        </div>

        <div className="space-x-2 mt-6 md:mt-0">
          <img src={Logo_footer} alt="Gestiona Logo" className='w-72'/>
        </div>
      </div>

  </footer>
  );
};

export default Footer;