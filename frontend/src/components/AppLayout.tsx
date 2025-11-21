
import { Outlet, Link } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-xl font-bold mb-8">Finance Tracker</h1>
        <nav className="flex flex-col gap-4">
          <Link className="hover:text-blue-500" to="/">Dashboard</Link>
          <Link className="hover:text-blue-500" to="/transactions">Transactions</Link>
          <Link className="hover:text-blue-500" to="/categories">Categories</Link>
          <Link className="hover:text-blue-500" to="/profile">Profile</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}