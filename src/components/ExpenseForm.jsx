
import { useState } from "react";

function ExpenseForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  function handleSubmit(event) {
    event.preventDefault();

    // Validate form data
    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    if (!["expense", "income"].includes(type)) {
      alert("Please select a valid transaction type.");
      return;
    }

    // Create a new transaction
    const newTransaction = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    };

    // Send transaction to App.jsx
    if (typeof onAddTransaction === "function") {
      onAddTransaction(newTransaction);
    } else {
      alert("Unable to add transaction. Please check App.jsx.");
      return;
    }

    // Reset form to default values
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="mb-5 text-xl font-bold text-slate-800">
        Add Transaction
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Description */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <input
            type="text"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="e.g. Groceries"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Amount (₹)
          </label>

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="500"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            required
          />
        </div>

        {/* Transaction Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Transaction Type
          </label>

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
            required
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Education">Education</option>
            <option value="Salary">Salary</option>
            <option value="Assets">Assets</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-5 w-full rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-5 py-3 font-semibold text-white shadow-md transition hover:from-emerald-700 hover:to-teal-700 sm:w-auto"
      >
        + Add Transaction
      </button>
    </form>
  );
}

export default ExpenseForm;
