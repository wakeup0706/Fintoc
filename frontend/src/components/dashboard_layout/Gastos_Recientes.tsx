import React, { useEffect, useState } from "react";
import { getSubscriptionRecent } from "../../utils/apis/add_account/charts";

type GastosRecientesProps = {
  isConnected: boolean;
};

const transactions = [
  { date: "24/04/25", name: "Netflix", category: "Streaming", amount: "12.990" },
  { date: "24/04/25", name: "Cafetería", category: "Comidas", amount: "12.990" },
  { date: "24/04/25", name: "HBO Max", category: "Streaming", amount: "12.990" },
  { date: "24/04/25", name: "HBO Max", category: "Streaming", amount: "12.990" },
];

const Gastos_Recientes: React.FC<GastosRecientesProps> = ({ isConnected }) => {
  const [transactions, setTransactions] = useState<
    { date: string; name: string; category: string; amount: string }[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isConnected) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getSubscriptionRecent();
          if (response && response.length > 0) {
            const formattedData = response.map(
              (item: { date: string; name: string; category: string; amount: number }) => ({
                date: item.date,
                name: item.name,
                category: item.category,
                amount: item.amount.toFixed(2),
              })
            );
            setTransactions(formattedData.pastWeek);
          } else {
            setTransactions(null); // No data
          }
        } catch (error) {
          console.error("Error fetching recent subscriptions:", error);
          setTransactions(null);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isConnected]);

  return (
    <div className="rounded-2xl bg-secondary w-full overflow-hidden">
      <div className="bg-ct-grey py-3 text-white text-xl font-bold pl-8">Recientes</div>
      {isConnected ? (
        loading ? (
          <div className="text-center text-black font-semibold text-lg h-[300px] flex items-center justify-center">
            Cargando datos...
          </div>
        ) : transactions ? (
          <div className="w-full text-left text-sm p-4">
            <div className="text-ct-grey font-semibold border-b-2 border-gray-500 grid grid-flow-col text-center">
              <div className="py-2">Fecha</div>
              <div className="py-2">Nombre</div>
              <div className="py-2">Categoría</div>
              <div className="py-2">Monto</div>
            </div>
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="bg-white rounded-full grid grid-flow-col text-center my-3 items-center"
              >
                <div>{tx.date}</div>
                <div>{tx.name}</div>
                <div>{tx.category}</div>
                <div>
                  <span className="bg-ct-grey text-white font-bold py-1.5 w-full rounded-full inline-block">
                    ${tx.amount}
                  </span>
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
      {isConnected && transactions && (
        <div className="flex justify-center py-4">
          <button className="bg-primary text-white font-semibold px-8 py-2 rounded-full hover:bg-hoverColor transition">
            Vincular Cuenta
          </button>
        </div>
      )}
    </div>
  );
};

export default Gastos_Recientes;