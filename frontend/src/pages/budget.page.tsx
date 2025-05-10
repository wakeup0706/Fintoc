import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import GptButton from '../components/common/GptButton';
import MonthTable from '../components/budget_layout/Table';
import SpendingBudget from '../components/budget_layout/SpendingBudget';
import BudgetSummary from '../components/budget_layout/BudgetSummary';
import { Link } from 'react-router-dom';

const BudgetPage = () => {
  return (
    <DashboardLayout>
      <div className='w-full max-w-[1100px] mx-auto mt-20 mb-20'>
        <div className='flex justify-between w-[70%] items-center px-8'>
          <div className='md:text-xl text-ct-grey font-semibold'>Gastos</div>
        </div>
        <div className='grid grid-rows-1 md:grid-cols-[2fr_1fr] gap-4'>
          <div>
            <MonthTable />
            <div className='w-[70%] px-8 mt-8'>
              <div className='md:text-xl text-ct-grey font-semibold'>Categoría de  Gasto | Presupuesto</div>
            </div>
            <SpendingBudget />
          </div>
          <BudgetSummary />
        </div>
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

export default BudgetPage;