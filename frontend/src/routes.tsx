import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Transactions from "./pages/transactions/Transactions";
import Categories from "./pages/categories/Categories";
import Profile from "./pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/",
    element: <AppLayout/>,
    children:[
      {index: true, element: <Dashboard/>},
      {path: "transactions", element: <Transactions/>},
      {path: "categories", element: <Categories/>},
      {path: "profile", element: <Profile/>},
    ]
  }
]);

export default router;