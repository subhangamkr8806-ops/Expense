
const navigation = [
  { name: "Dashboard", icon: "▦" },
  { name: "Transactions", icon: "↔" },
  { name: "Analytics", icon: "▥" },
  { name: "Settings", icon: "⚙" },
];

function Sidebar({
  isOpen,
  onClose,
  activePage = "Dashboard",
  onNavigate,
}) {
  function handleNavigation(page) {
    if (onNavigate) {
      onNavigate(page);
    }

    if (onClose) {
      onClose();
    }
  }

  return (
    <>
      {/* Mobile background overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#102F27] text-white shadow-2xl
           transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:shrink-0 lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br
             from-emerald-400 to-teal-600 text-2xl font-bold text-white shadow-lg">
              ₹
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-wide">
                SpendWise
              </h2>
              <p className="text-xs text-emerald-200/70">
                Personal Finance
              </p>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/60">
            Main Menu
          </p>

          {navigation.map((item) => {
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNavigation(item.name)}
                aria-current={isActive ? "page" : undefined}
                className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition duration-200 ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/30"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center text-xl">
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.name}
                </span>

                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white" />
                )}
              </button>
            );
          })}

          {/* Monthly budget card */}
          {/* <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold">
                Monthly Budget
              </span>
              <span className="text-lg">◉</span>
            </div>

            <p className="text-2xl font-bold">₹20,000</p>

            <p className="mt-1 text-xs text-slate-300">
              Sample monthly budget
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-0 rounded-full bg-linear-to-r from-emerald-400 to-teal-300" />
            </div>

            <p className="mt-3 text-xs text-emerald-200">
              Add your expenses to get started
            </p>
          </div> */}
        </nav>

        {/* Account section */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-amber-300 to-orange-500 font-bold text-slate-900">
              U
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                Your Account
              </p>
              <p className="text-xs text-slate-400">
                Personal Wallet
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
