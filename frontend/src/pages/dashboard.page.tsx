import AddAccount from '../components/dashboard_layout/AddAccount';
import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import Gastos_Recientes from '../components/dashboard_layout/Gastos_Recientes';
import ProximoCobros from '../components/dashboard_layout/ProximoCobros';
import CustomLineChart from '../components/dashboard_layout/LineChart';
import { Premium } from '../components/icons';
import Presupuesto from '../components/dashboard_layout/Presupuesto';
import GptButton from '../components/common/GptButton';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div>
        <div className='flex justify-between w-full sm:w-[70%] sm:items-center px-8 flex-col sm:flex-row gap-1'>
          <div className='md:text-xl text-ct-grey font-semibold'>Buen Día,<span>Jacobo</span>.</div>
          <button className="text-sm cursor-pointer sm:text-lg bg-primary text-white font-semibold max-w-44 justify-center sm:max-w-full px-4 sm:px-8 py-2 mb-0 sm:mb-1 flex gap-2 rounded-full hover:bg-purple-800 transition"><Premium /><div>Hazte Premium</div></button>
        </div>
        <div className='justify-between grid grid-cols-1 md:grid-cols-[70%_30%] gap-5 pr-5 pl-5 sm:pl-0 pt-3'>
          <CustomLineChart />
          <AddAccount />
        </div>
      </div>
      <div className='mt-[20px]'>
        <div className='flex justify-between w-[70%] items-center px-8'>
          <div className='md:text-xl text-ct-grey font-semibold'>Gastos</div>
        </div>
        <div className='justify-between grid grid-cols-1 md:grid-cols-[70%_30%] gap-5 pt-3 pl-5 sm:pl-0 pr-5'>
          <Gastos_Recientes />
          <ProximoCobros />
        </div>
      </div>
      <div className='mt-[20px]'>
        <div className='flex justify-between items-center px-8'>
          <div className='md:text-2xl text-ct-grey font-semibold'>Presupuesto Abril</div>
        </div>
        <div className='pr-5 pt-5 pb-0 pl-5 sm:pl-0'>
          <Presupuesto />
        </div>
      </div>
      <GptButton />
    </DashboardLayout>
  );
};

export default DashboardPage;