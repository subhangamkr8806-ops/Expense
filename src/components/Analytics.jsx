import ExpenseChart from "./ExpenseChart";

function Analytics({ transactions = [] }) {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  const balance = income - expenses;

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Analytics
        </h1>
        <p className="mt-2 text-slate-500">
          Analyze your income and spending patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Income</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            {formatMoney(income)}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Expenses</p>
          <h2 className="mt-2 text-2xl font-bold text-rose-600">
            {formatMoney(expenses)}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Net Balance</p>
          <h2 className="mt-2 text-2xl font-bold text-violet-600">
            {formatMoney(balance)}
          </h2>
        </div>
      </div>

      <ExpenseChart transactions={transactions} />
    </div>
  );
}

export default Analytics;