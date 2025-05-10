import { Download, Vector } from "../icons";

const TopSection = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <div className='flex justify-between w-full sm:items-center flex-col sm:flex-row gap-1'>
      <div className='flex gap-4'>
        <button
          onClick={() => setActiveTab("current")}
          className={`py-2 px-4 rounded-full text-[15px] sm:text-xl ${
            activeTab === "current"
              ? "bg-primary text-white hover:bg-hoverColor"
              : "bg-secondary text-primary hover:text-hoverColor"
          }`}
        >
          Este Mes
        </button>
        <button
          onClick={() => setActiveTab("previous")}
          className={`py-2 px-4 rounded-full text-[15px] sm:text-xl ${
            activeTab === "previous"
              ? "bg-primary text-white hover:bg-hoverColor"
              : "bg-secondary text-primary hover:text-hoverColor"
          }`}
        >
          Mes Anterior
        </button>
      </div>

      <button className="bg-primary text-white pl-8 pr-3 py-2 rounded-full hover:bg-hoverColor transition block">
        <div className="flex gap-6 justify-between items-center">
          Agregar Inversión
          <Download className="w-6 h-6" />
        </div>
      </button>
    </div>
  );
};

export default TopSection; 