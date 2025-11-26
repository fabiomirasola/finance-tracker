import { Outlet, NavLink } from "react-router-dom";

export default function AppLayout() {

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-2 rounded-lg transition-all 
    ${isActive 
      ? "bg-green-500 text-gray-200"  
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 shadow-md p-6">
        <div className="mb-8 pb-4 border-b-2 border-gray-600">
          <h1 className="text-2xl text-white font-bold flex-col flex items-center gap-2">
            <span className="text-3xl">🍀</span>
            Finance Tracker
          </h1>
        </div>

        <nav className="flex flex-col gap-3">
          <NavLink to="/" className={linkClasses}>
            <span className="text-xl">📊</span>
            Dashboard
          </NavLink>

          <NavLink to="/transactions" className={linkClasses}>
            <span className="text-xl">💸</span>
            Transactions
          </NavLink>

          <NavLink to="/categories" className={linkClasses}>
            <span className="text-xl">🏷️</span>
            Categories
          </NavLink>

          <NavLink to="/profile" className={linkClasses}>
            <span className="text-xl">👤</span>
            Profile
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}