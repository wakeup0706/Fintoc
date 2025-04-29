import React from "react";
import SmartPhon from "../../../../assets/Smartphone1.png"
import PriceList from "./PriceList";

import Spotify from "../../../../assets/icons/Spotify.svg";
import Prime from "../../../../assets/icons/Prime.svg";
import Office from "../../../../assets/icons/Office.svg";
import Canva from "../../../../assets/icons/Canva.svg";
import Metlife from "../../../../assets/icons/Metlife.svg";
import Movistar from "../../../../assets/icons/Movistar.svg";
import Entel from "../../../../assets/icons/Entel.svg";
import VTR from "../../../../assets/icons/VTR.svg";
import WOM from "../../../../assets/icons/WOM.svg";

const subscriptions = [
  { name: "Spotify", prop: "Mensual", price: "$4.990", icon: Spotify },
  { name: "Amazon Prime", prop: "Mensual", price: "$12.990", icon: Prime },
  { name: "Office 365", prop: "Anual", price: "$75.000", icon: Office },
  { name: "Canva", prop: "Mensual", price: "$12.000", icon: Canva },
  { name: "Metlife", prop: "Mensual",  price: "$29.990", icon: Metlife },
];
const subscriptions2 = [
  { name: "Movistar", prop: "Mensual", price: "$15.990", icon: Movistar },
  { name: "Entel", prop: "Mensual", price: "$12.990", icon: Entel },
  { name: "VTR", prop: "Mensual", price: "$75.000", icon: VTR },
  { name: "WOM", prop: "Mensual", price: "$12.000", icon: WOM },
];

export default function FinancialSection() {
  return (
    <section className="bg-[#f8f8f8] py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-ct-grey mb-8 text-center">
        Gestiona convierte el caos financiero <br /> en claridad y control
      </h2>
      <div className=" relative mt-20">
      <div className=" absolute w-full xl:w-11/12 inset-1/2 -translate-y-2/4 -translate-x-2/4 h-[1100px] sm:h-[500px] md:h-[740px] mt-40 bg-secondary rounded-tl-[70px] rounded-br-[70px] z-1"></div>
        <div className="text-center mb-20 px-4">
          <div className="relative w-full flex justify-center">
            <div className="w-[486px] md:w-[724px]">
              <div className="absolute z-20 w-40 sm:w-52 md:w-72 left-24 sm:left-auto">
                <img
                  src={SmartPhon}
                  alt="Phone"
                  className="w-full h-auto rounded-xl shadow-xl"
                />
              </div>
              <div className="relative left-0 sm:left-24 md:left-32 z-10 mt-80 sm:mt-0 md:mt-24">
                <PriceList lists={subscriptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-12 md:gap-6 max-w-6xl mx-auto">
          <div className="relative z-10 sm:mt-0">
            <PriceList lists={subscriptions2} />
          </div>
          <div className="text-center md:text-right max-w-md z-10">
            <h3 className="text-primary font-bold text-3xl mb-2">
              Con Gestiona, reduce tus cuentas de celular, TV o Internet.
            </h3>
            <p className="text-ct-grey text-xl font-bold pl-0 sm:pl-40">
              Permítenos administrar tus boletas y conseguir el mejor descuento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}