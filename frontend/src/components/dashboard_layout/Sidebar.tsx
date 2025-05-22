import { Walle_Strocke, LogOut} from "../icons";
import SiderbarMenu from '../common/SiderbarMenu';
import SiderbarCuentas from '../common/SiderbarCuentas';
import ButtonPlus from '../common/ButtonPlus';
import { NotificationPopover } from "../common/NotificationPopover";
import { SettingPopover } from "../common/SettingPopover";
import { useNavigate } from "react-router-dom";
import { menuButton } from "../../store/appStore";
import { useAppStore } from "../../store";

const cuenta = [
	{cuenta:"xxxx-xxxx", Saldo:"$7.256"},
	{cuenta:"xxxx-xxxx", Saldo:"$1.724"}
]

const menuButtons =[
	{text : "dashboard", url: "/dashboard"},
	{text : "Suscripciones", url: "/subscription"},
	{text : "Gastos", url: "/history-expensive"},
	{text : "Saldos", url: "/balances"},
	{text : "Presupuestos", url: "/budget"},
];

const Sidebar = ({collapse}:{collapse:boolean}) => {

	const { authUser, logout } = useAppStore.authStore.getState();

	const navigator = useNavigate();
	const { setActiveIndex, activeIndex } = menuButton((state) => state);

	const handleSettingClick = (action: string) => {
		console.log("Setting action:", action);
		if (action === "logout") {
			logout();
		}
	};

  	return (
		<aside className={`min-w-80 text-white h-full overflow-y-auto relative transition-all duration-300 ${collapse ? '-left-[22rem]' : 'left-0'} z-50 bg-gradient-main`}>
			<div className='flex justify-between px-4 py-[9px] md:py-6 items-center'>
				<h1 className="text-xl place-conten font-medium">Hola, <span>{authUser?.first_name}</span></h1>
				<div className='flex gap-1'>
					<NotificationPopover />
					<SettingPopover onClick={handleSettingClick} />
				</div>
			</div>
			<nav className='bg-secondary px-4 pt-6 pb-9'>
				<ul className="space-y-4">
					{menuButtons.map((val, index) => (
						<li key={index}>
						<SiderbarMenu
							text={val.text}
							active={activeIndex === index}
							onClick={() => {setActiveIndex(index); navigator(val.url)}}
						/>
						</li>
					))}
					</ul>
			</nav>
			<div className='bg-white px-4 rounded-t-xl -mt-[10px]'>
				<div className='text-primary items-center justify-between flex py-2'>
					<span className='font-medium'>Cuentas</span>
					<span><Walle_Strocke className='w-7 h-7'/></span>
				</div>
			</div>
			<SiderbarCuentas cuentas={cuenta} />
			<div className='px-2 mt-10 flex flex-col gap-5'>
				<ButtonPlus text='Agregar cuenta' bgColor='white' onClick={() => console.log('Agregar Tarjeta de Crédito clicked')}/>
				<ButtonPlus text='Agregar Tarjeta de Crédito' bgColor='transparent' onClick={() => console.log('Agregar Tarjeta de Crédito clicked')} />
			</div>
			<div className='md:absolute mt-5 mb-5 justify-center left-20 bottom-8 gap-5 flex items-center'>
				<span>Cerrar Sesión</span>
				<button onClick={logout}><LogOut className='w-6 h-6' /></button>
			</div>
		</aside>
  	);
};

export default Sidebar;