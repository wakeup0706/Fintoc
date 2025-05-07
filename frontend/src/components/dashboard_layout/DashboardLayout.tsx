import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAppStore } from '../../store/appStore';
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const collapsed = useAppStore((state) => state.collapsed);

  return (
    <div className="flex bg-gray-100 transition-all duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hiddenb">
        <Topbar />
        <main className="overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;