import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import GptButton from '../components/common/GptButton';
import TopSection from '../components/history_expensive_layout/Topsection';
import GroupedBarChart from '../components/history_expensive_layout/Barchart';
import SummaryTable from '../components/history_expensive_layout/SummaryTable';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  return (
    <DashboardLayout>
        <div className='max-w-[1100px] mx-auto mt-20'>
            <TopSection />
            <GroupedBarChart />
            <SummaryTable />
            <div className="flex flex-col sm:flex-row max-w-[460px] gap-3 mx-auto justify-between items-center sm:mt-12 mt-6 text-center mb-12">
              <Link to='/' className="text-primary underline">
                Términos y Condiciones
              </Link>
              <Link to='/' className="text-primary underline">
                Políticas de Privacidad
              </Link>
            </div>
            <GptButton />
        </div>
    </DashboardLayout>
  );
};

export default HistoryPage;