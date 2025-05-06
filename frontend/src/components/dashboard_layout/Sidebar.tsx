import React from 'react';
import { useAppStore } from '../../store/appStore';
import { Setting_Strocke, Home_Strocke, ChartPie_Strocke, Walle_Strocke, } from "../icons";

const Sidebar: React.FC = () => {
  const collapsed = useAppStore((state) => state.collapsed);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  return (
    <aside className={`bg-primary text-white h-screen rounded-r-2xl transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} p-4`}>
			<div className='flex justify-between'>
				<h1 className="text-md place-conten font-medium mb-8">{collapsed ? '' : 'Hola, Jacobo'}</h1>
				<div className='flex gap-2'>
					<ChartPie_Strocke className={`${collapsed ? 'w-6 h-6' : 'w-7 h-7'}`}/> 
					<Setting_Strocke className={`${collapsed ? 'w-6 h-6' : 'w-7 h-7'}`} />
				</div>
			</div>
			<nav className='bg-white'>
				<ul className="space-y-4">
					<li><Home_Strocke className="inline mr-2" /> {!collapsed && 'Dashboard'}</li>
					<li><Setting_Strocke className="inline mr-2" /> {!collapsed && 'Suscripciones'}</li>
					<li><Walle_Strocke className="inline mr-2" /> {!collapsed && 'Saldos'}</li>
					<li><ChartPie_Strocke className="inline mr-2" /> {!collapsed && 'Presupuesto'}</li>
				</ul>
			</nav>
			<button onClick={toggleSidebar}>
					<ChartPie_Strocke />
			</button>
    </aside>
  );
};

export default Sidebar;