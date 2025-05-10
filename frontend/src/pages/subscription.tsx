import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import GptButton from '../components/common/GptButton';
import TopSection from '../components/subscription_layout/Topsection';

const SubscriptionPage = () => {
  return (
    <DashboardLayout>
        <div className='w-full max-w-[1100px] mx-auto mt-12'>
            <TopSection/>
        </div>
        <GptButton />
    </DashboardLayout>
  );
};

export default SubscriptionPage;