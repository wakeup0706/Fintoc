import { Download, Vector } from "../icons";

const TopSection = () => {
  return (
    <div className='flex justify-between w-full sm:items-center pl-8 flex-col sm:flex-row gap-1' >

        <div className='flex gap-4 px-0'>
            <button className='bg-primary py-3 rounded-full w-full text-white text-[15px] sm:text-xl font-bold'>
                Este Mes
            </button>
            <button className='bg-secondary py-3 rounded-full w-full text-primary text-[15px] sm:text-xl font-bold hover:bg-hoverColor hover:text-white'>
                Mes Anterior
            </button>
        </div>

        <button className=" bg-primary text-white font-semibold pl-8 pr-3 py-2 rounded-full hover:bg-hoverColor transition block"><div className="flex gap-2 justify-between items-center w-72">Agregar Inversión<Download className="w-6 h-6" /></div></button>
    
    </div>
  );
};

export default TopSection;
