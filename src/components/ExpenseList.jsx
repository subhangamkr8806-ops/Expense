
import { useMemo, useState } from "react";

function ExpenseList({ transactions = [], onDeleteTransaction }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        filterType === "all" || transaction.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [transactions, search, filterType]);

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      {/* Heading */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Recent Transactions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredTransactions.length} transaction(s) found
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search description or category..."
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3
           text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <select
          value={filterType}
          onChange={(event) => setFilterType(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
        >
          <option value="all">All transactions</option>
          <option value="income">Income only</option>
          <option value="expense">Expenses only</option>
        </select>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center">
          <div className="text-4xl">🧾</div>
          <p className="mt-3 font-semibold text-slate-700">
            No transactions found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Add a transaction or change your search.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-wrap items-center gap-3 py-4 transition hover:bg-slate-50"
            >
              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${
                  transaction.type === "income"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {transaction.type === "income" ? "↗" : "↘"}
              </div>

              {/* Transaction Details */}
              <div className="min-w-0 flex-1">
                <p className="break-words font-semibold text-slate-800">
                  {transaction.description}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {transaction.category} · {transaction.date}
                </p>
              </div>

              {/* Amount */}
              <p
                className={`text-sm font-bold sm:text-base ${
                  transaction.type === "income"
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "−"}
                {formatMoney(transaction.amount)}
              </p>

              {/* Delete */}
              <button
                type="button"
                onClick={() => onDeleteTransaction?.(transaction.id)}
                aria-label={`Delete ${transaction.description}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExpenseList;
