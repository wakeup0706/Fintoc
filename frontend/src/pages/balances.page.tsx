import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import GptButton from '../components/common/GptButton';
import { Link } from 'react-router-dom';
import SubscriptionTable from '../components/balances_layout/Subscirption';

const BalancesPage = () => {
  return (
    <DashboardLayout>
      <div className='w-full max-w-[1100px] mx-auto mt-20 mb-20'>
        <div className='flex justify-between w-[70%] items-center px-8'>
          <div className='md:text-xl text-ct-grey font-semibold'>Saldos</div>
        </div>
        <SubscriptionTable />
      </div>
      <div className="flex flex-col sm:flex-row max-w-[460px] gap-3 mx-auto justify-between items-center sm:mt-12 mt-6 text-center">
        <Link to='/' className="text-primary underline">
          Términos y Condiciones
        </Link>
        <Link to='/' className="text-primary underline">
          Políticas de Privacidad
        </Link>
      </div>
      <GptButton />
    </DashboardLayout>
  );
};

export default BalancesPage;