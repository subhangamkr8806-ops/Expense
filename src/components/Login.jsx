
import { useState } from "react";

function Login({ onLogin, onSignupClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Connect this form to your authentication logic.
    if (typeof onLogin === "function") {
      onLogin({ email: email.trim(), password, rememberMe });
    } else {
      setError(
        "Login authentication is not connected yet. Connect this page to your login logic."
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT PANEL */}
        <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-teal-50 to-emerald-100 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-2xl font-bold text-white shadow-lg">
              ₹
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Spend<span className="text-emerald-600">Wise</span>
              </h1>
              <p className="text-sm text-slate-600">
                Track Smarter. Spend Better.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 lg:mt-16">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Personal Finance Manager
            </p>

            <h2 className="max-w-lg text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              Take Control of Your Finances
            </h2>

            <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
              Track your income, manage expenses, and build a better financial future.
            </p>
          </div>

          <div className="relative z-10 mt-10 space-y-6">
            {[
              {
                icon: "↗",
                title: "Track Expenses",
                text: "Record income and expenses easily.",
                color: "bg-emerald-100 text-emerald-700",
              },
              {
                icon: "◔",
                title: "Visual Insights",
                text: "Understand spending with charts.",
                color: "bg-violet-100 text-violet-700",
              },
              {
                icon: "◎",
                title: "Manage Your Money",
                text: "Keep your finances organized.",
                color: "bg-amber-100 text-amber-700",
              },
              {
                icon: "✓",
                title: "Simple Dashboard",
                text: "See your balance at a glance.",
                color: "bg-sky-100 text-sky-700",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative finance card */}
          <div className="relative z-10 mt-10 rounded-3xl border border-white/80 bg-white/80 p-5 shadow-lg backdrop-blur sm:max-w-sm lg:ml-12">
            <p className="text-sm font-medium text-slate-500">
              Your finances, simplified
            </p>
            <div className="mt-4 flex h-14 items-end gap-3">
              {[35, 55, 42, 70, 48, 80, 63, 95].map((height, index) => (
                <div
                  key={index}
                  style={{ height: `${height}%` }}
                  className="flex-1 rounded-t-lg bg-linear-to-t from-emerald-500 to-teal-300"
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-500">
                Stay on top of spending
              </span>
              <span className="font-bold text-pink-800">
                SpendWise ↗
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
        </section>

        {/* RIGHT PANEL */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Welcome Back
              </h2>
              <p className="mt-3 text-cyan-500">
                Login to your SpendWise account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-slate-200 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3.5 outline-none placeholder:text-slate-400"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 py-3 text-sm font-semibold text-slate-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    className="h-4 w-4 accent-emerald-600"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setError("Password recovery needs to be connected to your authentication system.")
                  }
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
                >
                  {error}
                </p>
              )}

              {/* Login */}
              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-200
                 transition hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700 active:translate-y-0 cursor-pointer"
              >
                Login
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm text-slate-400">Secure sign in</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSignupClick}
                className="font-bold text-purple-500 hover:text-purple-700 cursor-pointer"
              >
                Sign Up
              </button>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Manage your finances with clarity and confidence.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
