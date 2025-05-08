import AddAccount from '../components/dashboard_layout/AddAccount';
import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import Gastos_Recientes from '../components/dashboard_layout/Gastos_Recientes';
import ProximoCobros from '../components/dashboard_layout/ProximoCobros';
import CustomLineChart from '../components/dashboard_layout/LineChart';
import { Premium } from '../components/icons';
import Presupuesto from '../components/dashboard_layout/Presupuesto';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div>
        <div className='flex justify-between w-[70%] items-center px-8'>
          <div className='md:text-xl font-semibold'>Buen Día,<span>Jacobo</span>.</div>
          <div className=' rounded-full text-lg font-medium gap-2 items-center flex text-white bg-primary px-4 py-2'><Premium />Hazte Premium</div>
        </div>
        <div className='grid-cols-[70%_30%] justify-between grid gap-5 p-5'>
          <CustomLineChart />
          <AddAccount />
        </div>
      </div>
      <div className='mt-[20px]'>
        <div className='flex justify-between w-[70%] items-center px-8'>
          <div className='md:text-2xl font-semibold'>Gastos</div>
        </div>
        <div className='grid-cols-[70%_30%] justify-between grid gap-5 p-5'>
          <Gastos_Recientes />
          <ProximoCobros />
        </div>
      </div>
      <div className='mt-[20px]'>
        <div className='flex justify-between items-center px-8'>
          <div className='md:text-2xl font-semibold'>Presupuesto Abril</div>
        </div>
        <div className='p-5 pr-0'>
          <Presupuesto />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;