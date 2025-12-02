import { useEffect, useState } from "react";
import IncomeExpenseChart from "../../components/IncomeExpenseChart";
import { getDailyTotals } from "../../services/transactions";


type DailyData = {
  date: string;
  income: number;
  expense: number;
};

export default function Dashboard() {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const totals = await getDailyTotals(4);
        setDailyData(totals);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  console.log(dailyData);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <IncomeExpenseChart data={dailyData} />
    </div>
  );
}