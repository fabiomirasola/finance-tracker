import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DailyData = {
  date: string;
  income: number;
  expense: number;
};

type Props = {
  data: DailyData[];
};

export default function IncomeExpenseChart({ data }: Props) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short' 
    })
  }));

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Revenus vs Dépenses</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart 
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={(value) => `${value}€`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => [`${value.toFixed(2)}€`, '']}
            labelStyle={{ color: '#374151', fontWeight: 'bold' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
            formatter={(value) => value === 'income' ? 'Revenus' : 'Dépenses'}
          />
          <Bar 
            dataKey="income" 
            fill="#10b981" 
            radius={[8, 8, 0, 0]}
            name="Revenus"
            maxBarSize={60}
          />
          <Bar 
            dataKey="expense" 
            fill="#ef4444" 
            radius={[8, 8, 0, 0]}
            name="Dépenses"
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}