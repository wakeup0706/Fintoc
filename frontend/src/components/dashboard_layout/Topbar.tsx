import React from 'react';
import { Home_Strocke, } from "../icons";
import LogoComponent from '../common/LogoComponent';

const Topbar: React.FC = () => {

  return (
    <div className="rounded-br-md items-center py-5 shadow-md">
      <div className='px-4 sm:px-10 md:px-16 lg:px-24 mx-auto flex justify-between '>
        <LogoComponent imgSize="[50px]" textSize='xl' />
        <button onClick={()=>alert("home")}>
            <Home_Strocke className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;


