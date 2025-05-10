import DashboardLayout from '../components/dashboard_layout/DashboardLayout';
import GptButton from '../components/common/GptButton';

const SubscriptionPage = () => {
  return (
    <DashboardLayout>
        <div className='w-full max-w-[1100px] mx-auto mt-12'>
            <div className='w-full grid grid-cols-12 gap-8'>
                <div className='w-full sm:col-span-5 col-span-12 flex gap-4 px-4 sm:px-0'>
                    <button className='bg-primary py-3 rounded-full w-full text-white text-[15px] sm:text-xl max-h-[50px] font-bold hover:bg-secondary hover:text-primary'>
                        Próximos Cobros
                    </button>
                    <button className='bg-secondary py-3 rounded-full w-full text-primary text-[15px] sm:text-xl max-h-[50px] font-bold hover:bg-primary hover:text-secondary'>
                        Ver Todo
                    </button>
                </div>

                <div className='w-full sm:col-span-7 col-span-12 px-4 sm:px-0'>
                    <div className='flex flex-col gap-3 bg-primary rounded-3xl p-4 sm:p-8'>
                        <p className='text-[#0D99FF] sm:text-right text-center text-[16px] w-full sm:text-2xl font-bold'>¿Deseas bajar tus cobros de servicios?</p>
                        <p className='text-white sm:text-right text-center text-[16px] w-full sm:text-xl font-bold'>Nuestros expertos pueden negociar </p>
                        <p className='text-white sm:text-right text-center text-[16px] w-full sm:text-xl font-bold'>por ti a un mejor precio. </p>

                        <div className='flex justify-between mt-6'>
                            <div className=''></div>

                            <button className='rounded-full sm:px-7 px-5 py-1 bg-secondary hover:bg-white text-primary font-bold sm:text-xl text-[15px]'>
                                ¡Lo quiero!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <GptButton />
    </DashboardLayout>
  );
};

export default SubscriptionPage;