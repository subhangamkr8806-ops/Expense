
import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#F43F5E",
  "#3B82F6",
  "#14B8A6",
  "#F97316",
];

function ExpenseChart({ transactions = [] }) {
  // Calculate expense totals for each category
  const categoryData = useMemo(() => {
    const totals = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((result, transaction) => {
        const category = transaction.category || "Other";

        result[category] =
          (result[category] || 0) + Number(transaction.amount || 0);

        return result;
      }, {});

    return Object.entries(totals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  // Calculate income and expense totals dynamically
  const comparisonData = useMemo(() => {
    const totals = transactions.reduce(
      (result, transaction) => {
        const amount = Number(transaction.amount || 0);

        if (transaction.type === "income") {
          result.income += amount;
        } else if (transaction.type === "expense") {
          result.expenses += amount;
        }

        return result;
      },
      { income: 0, expenses: 0 }
    );

    return [
      { name: "Income", amount: totals.income },
      { name: "Expenses", amount: totals.expenses },
    ];
  }, [transactions]);

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const hasExpenses = categoryData.length > 0;
  const hasTransactions = transactions.length > 0;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Expense Breakdown Pie Chart */}
      <section className="min-w-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            Expense Breakdown
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            See where your money goes
          </p>
        </div>

        {hasExpenses ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  cornerRadius={5}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => formatMoney(value)}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                  }}
                />

                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-72 flex-col items-center justify-center text-center">
            <span className="text-4xl">📊</span>
            <p className="mt-3 font-semibold text-slate-700">
              No expenses yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add an expense to see your category breakdown.
            </p>
          </div>
        )}
      </section>

      {/* Income vs Expenses Bar Chart */}
      <section className="min-w-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            Income vs Expenses
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Compare your money received and spent
          </p>
        </div>

        {hasTransactions ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 10, right: 8, left: 8, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  width={75}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `₹${(value / 1000).toLocaleString("en-IN")}k`
                      : `₹${value}`
                  }
                />

                <Tooltip
                  formatter={(value) => formatMoney(value)}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                  }}
                />

                <Bar
                  dataKey="amount"
                  name="Amount"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={75}
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#F43F5E" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-72 flex-col items-center justify-center text-center">
            <span className="text-4xl">📈</span>
            <p className="mt-3 font-semibold text-slate-700">
              No data available
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add income or expenses to compare your totals.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ExpenseChart;
