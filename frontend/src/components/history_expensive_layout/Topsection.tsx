import { useState } from "react";
import { Filter } from "../icons";

const TopSection = () => {
  const [selected, setSelected] = useState<"historico" | "mes">("historico");

  return (
    <div className='w-full flex justify-between sm:px-0 px-4'>
      <div className='flex gap-2'>
        <button
          className={`py-3 px-6 rounded-full w-full text-[14px] sm:text-[17px] max-h-[50px] transition
            ${selected === "historico"
              ? "bg-primary text-white"
              : "bg-gray-100 text-primary hover:bg-gray-200"}
          `}
          onClick={() => setSelected("historico")}
        >
          Histórico
        </button>
        <button
          className={`py-3 px-6 rounded-full w-full text-[14px] sm:text-[17px] max-h-[50px] transition
            ${selected === "mes"
              ? "bg-primary text-white"
              : "bg-gray-100 text-primary hover:bg-gray-200"}
          `}
          onClick={() => setSelected("mes")}
        >
          Este Mes
        </button>
      </div>

      <div className='px-4 flex items-center justify-center rounded-full text-primary cursor-pointer hover:bg-gray-100'>
        <Filter className='w-24 h-6' />
      </div>
    </div>
  );
};

export default TopSection;