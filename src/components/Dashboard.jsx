
import SummaryCard from "./SummaryCard";
import ExpenseList from "./ExpenseList";

function Dashboard({
  transactions = [],
  totals = { income: 0, expenses: 0 },
  onDeleteTransaction,
  onLogout,
}) {
  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const balance = totals.income - totals.expenses;

  return (
    <div className="space-y-8">
      {/* Dashboard Heading and Logout */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Personal Finance
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-800"> 
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Here's an overview of your finances.
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-5 py-3 
          font-semibold text-rose-600 transition hover:bg-rose-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2  xl:grid-cols-4">
        <SummaryCard
          title="Total Income"
          amount={formatMoney(totals.income)}
          icon="↗"
          color="emerald"
        />

        <SummaryCard
          title="Total Expenses"
          amount={formatMoney(totals.expenses)}
          icon="↘"
          color="rose"
        />

        <SummaryCard
          title="Available Balance"
          amount={formatMoney(balance)}
          icon="₹"
          color="violet"
        />

        <SummaryCard
          title="Total Transactions"
          amount={transactions.length}
          icon="#"
          color="amber"
        />
      </div>

      {/* Recent Transactions */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest income and expenses.
          </p>
        </div>

        <ExpenseList
          transactions={transactions.slice(0, 5)}
          onDeleteTransaction={onDeleteTransaction}
        />
      </section>
    </div>
  );
}

export default Dashboard;
