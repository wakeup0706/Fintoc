import React, { useEffect, useState } from "react";
import { getSubscriptionRecent } from "../../utils/apis/add_account/charts";

type ProximoCobrosProps = {
  isConnected: boolean;
};

const ProximoCobros_data = [
  { category: "Smartfit", date: "29/04/25", amount: "12.990" },
  { category: "Movistar", date: "29/04/25", amount: "15.990" },
  { category: "Disney", date: "29/04/25", amount: "10.990" },
];


const ProximoCobros: React.FC<ProximoCobrosProps> = ({ isConnected }) => {
  const [transactions, setTransactions] = useState<
    { category: string; date: string; amount: string }[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isConnected) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getSubscriptionRecent();
          if (response && response.upcomingWeek && response.upcomingWeek.length > 0) {
            const formattedData = response.upcomingWeek.map(
              (item: { category: string; date: string; amount: number }) => ({
                category: item.category,
                date: item.date,
                amount: item.amount.toFixed(2),
              })
            );
            setTransactions(formattedData.upcomingWeek);
          } else {
            setTransactions(null); // No data
          }
        } catch (error) {
          console.error("Error fetching upcoming charges:", error);
          setTransactions(null);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isConnected]);

  return (
    <div className="rounded-l-2xl bg-secondary w-full overflow-hidden">
      <div className="bg-ct-grey py-3 text-white text-xl font-bold pl-8">Próximos cobros</div>
      {isConnected ? (
        loading ? (
          <div className="text-center text-black font-semibold text-lg h-[300px] flex items-center justify-center">
            Cargando datos...
          </div>
        ) : transactions ? (
          <div className="w-full text-left text-sm p-4">
            <div className="text-ct-grey font-semibold border-b-2 border-gray-500 grid grid-flow-col py-2">
              Siguientes 7 días
            </div>
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="text-ct-grey font-semibold border-b-2 border-gray-500 pt-3 pb-2"
              >
                <div className="grid justify-between grid-flow-col">
                  <span>{tx.category}</span>
                  <span>{tx.date}</span>
                </div>
                <div className="grid justify-between grid-flow-col">
                  <span> </span>
                  <span className="text-primary">${tx.amount}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-black font-semibold text-lg h-[300px] flex flex-col items-center justify-center">
            <p>No hay datos disponibles</p>
            <button className="bg-primary text-white font-semibold px-8 py-2 mt-4 rounded-full hover:bg-hoverColor transition">
              Vincular Cuenta
            </button>
          </div>
        )
      ) : (
        <div className="text-center text-black font-semibold text-lg h-[300px] flex flex-col items-center justify-center">
          <p>Conecta tu cuenta de Belvo o Gmail</p>
          <button className="bg-primary text-white font-semibold px-8 py-2 mt-4 rounded-full hover:bg-hoverColor transition">
            Vincular Cuenta
          </button>
        </div>
      )}
      {transactions && (
        <div className="flex justify-center py-4">
          <button className="bg-primary text-white font-semibold px-8 py-2 rounded-full hover:bg-hoverColor transition">
            Ver Más
          </button>
        </div>
      )}
    </div>
  );
};

export default ProximoCobros;