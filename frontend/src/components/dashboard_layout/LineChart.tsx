import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getSubscriptionEachMonth } from '../../utils/apis/add_account/charts';

type CustomLineChartProps = {
  isConnected: boolean;
};

// const data = [
//   { name: '', value: 55 },
//   { name: 'JAN', value: 45 },
//   { name: 'FEB', value: 65 },
//   { name: 'MAR', value: 5 },
//   { name: 'APR', value: 63 },
//   { name: 'MAY', value: 50 },
//   { name: 'JUN', value: 60 },
//   { name: 'JUL', value: 70 },
//   { name: 'AUG', value: 85 },
//   { name: 'SEP', value: 30 },
//   { name: 'OCT', value: 65 },
//   { name: 'NOV', value: 38 },
//   { name: 'DEC', value: 54 },
//   { name: '', value: 38 },
// ];

const CustomLineChart: React.FC<CustomLineChartProps> = ({ isConnected }) => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isConnected) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getSubscriptionEachMonth();
          if (response && response.length > 0) {
            const formattedData = response.map((item: { month: string; total: number }) => ({
              name: item.month.toUpperCase(),
              value: item.total,
            }));
            setChartData(formattedData);
          } else {
            setChartData(null); // No data
          }
        } catch (error) {
          console.error('Error fetching subscription data:', error);
          setChartData(null);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isConnected]);

  return (
    <div className="rounded-xl overflow-hidden p-4" style={{ backgroundColor: '#2c2c2c' }}>
      {isConnected ? (
        loading ? (
          <div className="text-center text-white font-semibold text-lg h-[300px] flex items-center justify-center">
            Cargando datos...
          </div>
        ) : chartData ? (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#333',
                    border: 'none',
                    color: 'white',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00FFFF"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-white font-semibold text-lg h-[300px] flex items-center justify-center">
            No hay datos disponibles
          </div>
        )
      ) : (
        <div className="text-center text-white font-semibold text-lg h-[300px] flex items-center justify-center">
          Conecta tu cuenta de Belvo o Gmail
        </div>
      )}
    </div>
  );
};

export default CustomLineChart;