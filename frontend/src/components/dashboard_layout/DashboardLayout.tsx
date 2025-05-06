import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
        <Topbar />
        <div className="flex-col overflow-hidden mt-6">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6">
            {children}
            </main>
        </div>
    </>
  );
};

export default DashboardLayout;