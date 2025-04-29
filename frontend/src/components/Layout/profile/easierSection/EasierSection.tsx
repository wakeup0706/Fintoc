import React from 'react';
import Loop from "../../../../assets/loop.svg";
import Detencion1 from "../../../../assets/detencion(1).svg";
import Detencion2 from "../../../../assets/detencion(2).svg";
import Detencion3 from "../../../../assets/detencion(3).svg";
import Netflix from "../../../../assets/Netflix.svg";
import Uber from "../../../../assets/Uber.svg";
import Spotify from "../../../../assets/Spotify.svg";
import SmartFit from "../../../../assets/SmartFit.svg";
import WOM from "../../../../assets/WOM.svg";
import MercadoLibre from "../../../../assets/MercadoLibre.svg";
import Step from './Step';

const EasierSection= () => {
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ct-grey mb-4">
          Gestionar tus suscripciones y pagos<br/> ahora es mas fácil
        </h2>
        <p className="text-primary text-2xl font-semibold mb-16 md:text-4xl">
          Invertimos pagos por suscripciones
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          
          <div className="flex flex-col space-y-12 w-full md:w-1/2">
            <Step
            icon = {Detencion1}
            title = "Detención automática de suscripciones y cobros"
            description = "Identifica suscripciones y cobros recurrentes con solo conectar tu cuenta bancaria."
            href_url = "#"
            />
            <Step
            icon = {Detencion2}
            title = "Panel de Control claro e intuitivo"
            description = "Todo lo que pagas, en un solo lugar. Administra tus suscripciones y cobros frecuentes fácilmente."
            href_url = "#"
            />
            <Step
            icon = {Detencion3}
            title = "Alertas Personalizadas"
            description = "Recibe notificaciones antes de cada cobro recurrente, administra o cancela aquellos que ya no usas."
            href_url = "#"
            />
          </div>

          <div className="relative w-full md:w-1/2 flex justify-center">
            <img src={Loop} alt="Netflix" />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-primary text-2xl font-bold mb-6">
            Conoce todas las suscripciones que puedes gestionar
          </h3>
          <div className="flex flex-wrap justify-center content-evenly items-center gap-10 grayscale">
            <img src={Netflix} alt="Netflix" className="h-8" />
            <img src={Uber} alt="Uber" className="h-8" />
            <img src={Spotify} alt="Spotify" className="h-8" />
            <img src={SmartFit} alt="SmartFit" className="h-8" />
            <img src={WOM} alt="WOM" className="h-8" />
            <img src={MercadoLibre} alt="MercadoLibre" className="h-8" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default EasierSection;