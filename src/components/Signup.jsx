
import { useState } from "react";

function Signup({ onSignup, onLoginClick }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    if (typeof onSignup !== "function") {
      setError("Signup is not connected to App.jsx yet.");
      return;
    }

    onSignup({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone: phone.trim(),
    });
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
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Spend<span className="text-emerald-600">Wise</span>
              </h1>
              <p className="text-sm text-slate-600">
                Track Smarter. Spend Better.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-10 lg:mt-16">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Your financial journey starts here
            </p>

            <h2 className="max-w-lg text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              Start Your Financial Journey
            </h2>

            <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
              Create your account and take control of your income and expenses.
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

          <div className="relative z-10 mt-10 rounded-3xl border border-white/80 bg-white/80 p-5 shadow-lg backdrop-blur sm:max-w-sm lg:ml-12">
            <p className="text-sm font-medium text-slate-500">
              Build better money habits
            </p>

            <div className="mt-4 flex h-14 items-end gap-3">
              {[35, 55, 42, 70, 48, 80, 63, 95].map(
                (height, index) => (
                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className="flex-1 rounded-t-lg bg-linear-to-t from-emerald-500 to-teal-300"
                  />
                )
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-500">
                Your money. Your goals.
              </span>
              <span className="font-bold text-emerald-600">
                SpendWise ↗
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
        </section>

        {/* RIGHT PANEL */}
        <section className="flex items-center justify-center px-5 py-8 sm:px-10 lg:px-12">
          <div className="w-full max-w-lg">
            <div className="mb-7 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Create Your Account
              </h2>
              <p className="mt-3 text-slate-500">
                Join SpendWise and manage your finances easily
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.target.value)
                    }
                    placeholder="Enter first name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(event) =>
                      setLastName(event.target.value)
                    }
                    placeholder="Enter last name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="signupEmail"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>
                <input
                  id="signupEmail"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="signupPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="flex rounded-xl border border-slate-200 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
                  <input
                    id="signupPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Create a password"
                    className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 text-sm font-semibold text-slate-500 hover:text-emerald-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Use at least 6 characters.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm Password
                </label>

                <div className="flex rounded-xl border border-slate-200 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Confirm your password"
                    className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="px-4 text-sm font-semibold text-slate-500 hover:text-emerald-600"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Optional phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone Number (Optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              {/* Consent */}
              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) => setAgree(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-emerald-600"
                />
                <span>
                  I agree to the{" "}
                  <span className="font-semibold text-emerald-700">
                    Terms &amp; Conditions
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-emerald-700">
                    Privacy Policy
                  </span>
                  .
                </span>
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700"
              >
                Create Account
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onLoginClick}
                className="font-bold text-emerald-600 hover:text-emerald-700"
              >
                Login
              </button>
            </p>

            <p className="mt-5 text-center text-xs text-slate-400">
              Your financial journey starts with SpendWise.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signup;
