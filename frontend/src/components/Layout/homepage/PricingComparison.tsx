import { Check, X } from 'lucide-react';
import ArrowIco from '../../../assets/icons/arrow1.svg';
import Button from '../../common/Button';
import HelpButton from '../../common/HelpButton';

const features = [
  {
    title: 'Detección de Pagos recurrentes. Celular, Creditos etc.',
    free: true,
    pro: true,
    description: 'Identificamos automáticamente todas tus suscripciones y pagos periódicos, como servicios, arriendos, membresías o cuentas.'
  },
  {
    title: 'Notificaciones ilimitadas por cada suscripción.',
    free: false,
    pro: true,
    description: 'Te avisamos con antelación antes de que un pago automático sea cobrado. Así evitas sorpresas y mantienes el control.'
  },
  {
    title: 'Cancelación automática de servicios',
    free: false,
    pro: true,
    description: 'Gestionas las bajas de servicios por ti, sin tener que pasar por procesos largos o confusos. Sólo eliges y listo.'
  },
  {
    title: 'Score financiero personalizado',
    free: false,
    pro: true,
    description: 'Obtén una puntuación mensual de salud financiera basada en tus hábitos de gasto. Ideal para entender y mejorar tu perfil económico.'
  },
  {
    title: 'Reporte mensual en PDF',
    free: false,
    pro: true,
    description: 'Recibe un resumen descargable y ordenado de tus movimientos, ideal para presupuestos, impuestos o control personal.'
  }
];

export default function PricingComparison() {
  return (
    <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto">
      <div className="text-center mb-6 sm:mb-12">
        <h2 className="text-2xl md:text-4xl text-ct-grey font-bold mb-4">Conoce nuestros planes y gestiona<br/> tus pagos y suscripciones</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6 sm:mb-12">
        <div className="bg-secondary rounded-2xl p-6 text-center w-full h-full md:w-1/3">
          <h3 className="text-2xl font-bold text-primary mb-2">Únete gratis</h3>
          <p className=" text-gray-700 mb-4 text-lg w-50 font-bold">Gestiona fácil, rápido y sin complicaciones.</p>
          <HelpButton
            title="Gestionar Gratis"
            textColor="white"
            bgColor="primary"
            borderColor="secondary"
            otherStyle="text-base font-sm w-[150px] h-[37px] mx-auto"
          />
        </div>
        <div className="bg-secondary rounded-2xl p-6 text-center h-full w-full md:w-1/3">
          <h3 className="text-2xl font-bold text-primary mb-2">Sé un Pro</h3>
          <div className='flex justify-center gap-6'>
            <div>
              <p className="text-sm text-gray-700 font-bold">Mensual</p>
              <p className="text-xl font-bold bg-white rounded-full px-2 text-ct-grey">$1.990</p>
            </div>
            <div>
              <p className="text-sm text-gray-700 font-bold">Anual</p>
              <p className="text-xl font-bold bg-white rounded-full px-2 text-ct-grey mb-4">$9.990</p>
            </div>
          </div>
          <HelpButton
            title="Prueba gratis por 7 días"
            textColor="white"
            bgColor="primary"
            borderColor="secondary"
            otherStyle="text-base font-sm w-[210px] h-[37px] mx-auto"
          />
        </div>
      </div>
      <p className="text-center text-primary font-semibold mb-6 text-xl sm:text-2xl max-w-[600px] mx-auto">Compara y elige el plan que más te conviene <img src={ArrowIco} alt="ArrowIco" className='w-6 sm:w-8 h-6 sm:h-8 float-right animate-bounce' /></p>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-xl sm:text-2xl font-semibold text-ct-grey">
              <th className="p-4">Funciones</th>
              <th className="p-4 text-center">Gratis</th>
              <th className="p-4 text-center">Pro</th>
              <th className="p-4">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-t border-gray-400 text-sm">
                <td className="py-4 px-2 font-semibold text-ct-grey text-base align-top w-1/4">{feature.title}</td>
                <td className="py-4 px-2 text-center w-1/12">
                  {feature.free ? <Check className="text-primary mx-auto" /> : <X className="text-red-500 mx-auto" />}
                </td>
                <td className="py-4 px-2 text-center w-1/12">
                  {feature.pro ? <Check className="text-primary mx-auto" /> : <X className="text-red-500 mx-auto" />}
                </td>
                <td className="py-4 px-2 text-ct-grey w-1/2 text-sm">{feature.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
