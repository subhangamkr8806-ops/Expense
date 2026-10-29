
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function Transactions({
  transactions = [],
  onAddTransaction,
  onDeleteTransaction,
}) {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Manage Your Money
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">
          Transactions
        </h1>

        <p className="mt-2 text-slate-500">
          Add, search, filter and delete your transactions.
        </p>
      </section>

      {/* Add Transaction Form */}
      <ExpenseForm onAddTransaction={onAddTransaction} />

      {/* All Transactions */}
      <ExpenseList
        transactions={transactions}
        onDeleteTransaction={onDeleteTransaction}
      />
    </div>
  );
}

export default Transactions;
