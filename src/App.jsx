
import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Analytics from "./components/Analytics";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  // Authentication state: always show Login when localhost opens
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState("login");
  const [currentUser, setCurrentUser] = useState("");

  // Navigation state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // Load transactions from localStorage
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Unable to load transactions:", error);
      return [];
    }
  });

  // Save transactions whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.error("Unable to save transactions:", error);
    }
  }, [transactions]);

  // Register a new account, then return to Login
  function handleSignup(newUser) {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem("spendwiseUsers") || "[]"
      );

      if (!Array.isArray(savedUsers)) {
        alert("Unable to read saved accounts. Please try again.");
        return;
      }

      const email = newUser.email.trim().toLowerCase();

      const emailExists = savedUsers.some(
        (user) =>
          user.email.toLowerCase() === email
      );

      if (emailExists) {
        alert("An account with this email already exists. Please log in.");
        setAuthPage("login");
        return;
      }

      const userToSave = {
        ...newUser,
        email,
      };

      localStorage.setItem(
        "spendwiseUsers",
        JSON.stringify([...savedUsers, userToSave])
      );

      // Do not open Dashboard automatically
      setIsLoggedIn(false);
      setCurrentUser("");
      setAuthPage("login");

      alert("Account created successfully! Please log in.");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Unable to create your account. Please try again.");
    }
  }

  // Log in using the registered email and password
  function handleLogin({ email, password }) {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem("spendwiseUsers") || "[]"
      );

      if (!Array.isArray(savedUsers)) {
        alert("Unable to read accounts. Please try again.");
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();

      const user = savedUsers.find(
        (item) =>
          item.email.toLowerCase() === normalizedEmail &&
          item.password === password
      );

      if (!user) {
        alert("Invalid email or password. Please try again.");
        return;
      }

      setCurrentUser(user.email);
      setIsLoggedIn(true);
      setAuthPage("login");
      setActivePage("Dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Unable to log in. Please try again.");
    }
  }

  // Log out and return to Login
  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser("");
    setAuthPage("login");
    setSidebarOpen(false);
    setActivePage("Dashboard");
  }

  // Add transaction
  function addTransaction(newTransaction) {
    setTransactions((previous) => [
      newTransaction,
      ...previous,
    ]);

    setActivePage("Transactions");
  }

  // Delete transaction
  function deleteTransaction(id) {
    setTransactions((previous) =>
      previous.filter(
        (transaction) => transaction.id !== id
      )
    );
  }

  // Calculate income and expenses
  const totals = useMemo(() => {
    return transactions.reduce(
      (result, transaction) => {
        const amount = Number(transaction.amount) || 0;

        if (transaction.type === "income") {
          result.income += amount;
        } else if (transaction.type === "expense") {
          result.expenses += amount;
        }

        return result;
      },
      {
        income: 0,
        expenses: 0,
      }
    );
  }, [transactions]);

  // Show Login or Signup before the main application
  if (!isLoggedIn) {
    if (authPage === "signup") {
      return (
        <Signup
          onSignup={handleSignup}
          onLoginClick={() => setAuthPage("login")}
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onSignupClick={() => setAuthPage("signup")}
      />
    );
  }

  // Render selected application page
  function renderPage() {
    switch (activePage) {
      case "Dashboard":
        return (
          <Dashboard
            transactions={transactions}
            totals={totals}
            onDeleteTransaction={deleteTransaction}
            onLogout={handleLogout}
          />
        );

      case "Transactions":
        return (
          <Transactions
            transactions={transactions}
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
          />
        );

      case "Analytics":
        return (
          <Analytics transactions={transactions} />
        );

      case "Settings":
        return (
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Preferences
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-800">
              Settings
            </h1>

            <div className="mt-6 rounded-xl border border-slate-200 p-4">
              <h2 className="font-semibold text-slate-800">
                Currency
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Indian Rupee (INR ₹)
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 p-4">
              <h2 className="font-semibold text-slate-800">
                Signed in as
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {currentUser}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const confirmed = window.confirm(
                  "Delete all transactions? This cannot be undone."
                );

                if (confirmed) {
                  setTransactions([]);
                }
              }}
              className="mt-6 rounded-xl bg-rose-50 px-5 py-3 font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              Clear All Transactions
            </button>
          </section>
        );

      default:
        return (
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800">
              Page not found
            </h1>

            <button
              type="button"
              onClick={() => setActivePage("Dashboard")}
              className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Back to Dashboard
            </button>
          </section>
        );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setSidebarOpen(false);
        }}
      />

      {/* Main application */}
      <div className="min-w-0 flex-1">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
