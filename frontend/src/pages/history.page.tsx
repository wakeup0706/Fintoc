import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import GptButton from '../components/common/GptButton';
import TopSection from '../components/history_expensive_layout/Topsection';
import GroupedBarChart from '../components/history_expensive_layout/Barchart';
import SummaryTable from '../components/history_expensive_layout/SummaryTable';

const HistoryPage = () => {
  return (
    <DashboardLayout>
        <div className='max-w-[1100px] mx-auto mt-20'>
            <TopSection />
            <GroupedBarChart />
            <SummaryTable />
            <GptButton />
        </div>
    </DashboardLayout>
  );
};

export default HistoryPage;