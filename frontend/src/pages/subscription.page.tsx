import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import GptButton from '../components/common/GptButton';
import TopSection from '../components/subscription_layout/Topsection';
import SubscriptionTable from '../components/subscription_layout/Table';
import UpcomingCharge from '../components/subscription_layout/UpcomingCharge';
import { Link } from 'react-router-dom';

const SubscriptionPage = () => {
  return (
    <DashboardLayout>
      <div className='w-full max-w-[1100px] mx-auto mt-20 mb-20'>
        <TopSection />
        <SubscriptionTable />
        <UpcomingCharge />
      </div>
      <div className="flex flex-col sm:flex-row max-w-[460px] gap-3 mx-auto justify-between items-center sm:mt-12 mt-6 text-center mb-12">
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

export default SubscriptionPage;