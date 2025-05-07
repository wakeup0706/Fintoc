import React, { ReactNode } from 'react';
import Topbar from './Topbar';
import { useAppStore } from '../../store/appStore';
import SidebarWrapper from './SidebarWrapper ';
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  
  const collapsed = useAppStore((state) => state.collapsed);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarWrapper />
      <div className={`flex-1 transition-all duration-300 flex flex-col overflow-hidden -ml-64 ${collapsed ? 'md:-ml-64' : 'md:ml-0'}`}>
        <Topbar />
        <main className={`overflow-y-auto p-6 ${collapsed ? 'md:px-24':'md:px-10'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;