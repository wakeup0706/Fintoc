import React from 'react';

import { Home_Strocke, } from "../icons";
import LogoComponent from '../common/LogoComponent';

const Topbar: React.FC = () => {

  return (
    <div className="flex justify-between rounded-b-md items-center px-[4%] py-5 shadow-md">
        <LogoComponent imgSize="[50px]" textSize='xl' />
        <button onClick={()=>alert("home")}>
            <Home_Strocke className="w-6 h-6" />
        </button>
    </div>
  );
};

export default Topbar;