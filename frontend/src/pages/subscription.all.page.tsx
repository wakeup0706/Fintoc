import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import GptButton from '../components/common/GptButton';
import TopSection from '../components/all_subscription_layout/Topsection';
import SubscriptionTable from '../components/all_subscription_layout/SubscriptionTable';
import ServiceTable from '../components/all_subscription_layout/ServiceTable';
import UpcomingCharge from '../components/all_subscription_layout/UpcomingCharge';

const AllsubscriptionPages = () => {
  return (
    <DashboardLayout>
			<div className='w-full max-w-[1100px] mx-auto mt-20 mb-20'>
				<TopSection />
				<SubscriptionTable />
				<ServiceTable />
				<UpcomingCharge />
			</div>

			<GptButton />
    </DashboardLayout>
  );
};

export default AllsubscriptionPages;