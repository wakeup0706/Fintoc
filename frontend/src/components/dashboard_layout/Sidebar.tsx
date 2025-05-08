import { Setting_Strocke, ChartPie_Strocke, Walle_Strocke, LogOut} from "../icons";
import SiderbarMenu from '../common/SiderbarMenu';
import SiderbarCuentas from '../common/SiderbarCuentas';
import ButtonPlus from '../common/ButtonPlus';

const cuenta = [
	{cuenta:"xxxx-xxxx", Saldo:"$7.256"},
	{cuenta:"xxxx-xxxx", Saldo:"$1.724"}
]

const Sidebar = ({collapse}:{collapse:boolean}) => {

  	return (
		<aside className={`min-w-80 bg-primary text-white relative rounded-br-2xl transition-all duration-300 ${collapse ? '-left-80' : 'left-0'} z-50`}>
			<div className='flex justify-between px-4 py-[17px] md:py-8 items-center'>
				<h1 className="text-md place-conten font-medium">Hola, Jacobo</h1>
				<div className='flex gap-2'>
					<ChartPie_Strocke className={`w-7 h-7 cursor-pointer`}/> 
					<Setting_Strocke className={`w-7 h-7 cursor-pointer`} />
				</div>
			</div>
			<nav className='bg-secondary px-4 pt-6 pb-9'>
				<ul className="space-y-4">
					<li><SiderbarMenu bgColor='primary' text='Dashboard' /></li>
					<li><SiderbarMenu bgColor='white' text='Suscripciones' /></li>
					<li><SiderbarMenu bgColor='white' text='Gastos' /></li>
					<li><SiderbarMenu bgColor='white' text='Saldos' /></li>
					<li><SiderbarMenu bgColor='white' text='Presupuestos' /></li>
				</ul>
			</nav>
			<div className='bg-white px-4 rounded-t-xl -mt-[10px]'>
				<div className='text-primary items-center justify-between flex py-2'>
					<span className='font-medium'>Cuentas</span>
					<span><Walle_Strocke className='w-7 h-7'/></span>
				</div>
			</div>
			<SiderbarCuentas cuentas={cuenta} />
			<div className='px-2 mt-10'>
				<ButtonPlus text='Agregar cuenta' bgColor='white' />
				<ButtonPlus text='Agregar Tarjeta de Crédito' bgColor='primary' />
			</div>
			<div className='absolute left-6 bottom-8 gap-5 flex items-center'>
				<span>Cerrar Sesión</span>
				<button className=''><LogOut className='w-6 h-6' /></button>
			</div>
		</aside>
  	);
};

export default Sidebar;