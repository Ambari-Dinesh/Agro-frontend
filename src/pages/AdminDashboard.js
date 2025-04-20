import { Outlet, Navigate } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);

  console.log(user)

  if (user.role !== "admin"||!user  ) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavBar />
      <div className="py-8 px-6 text-center">
        <h1 className="text-4xl font-semibold text-blue-600 mb-4">
          Welcome, <span className="text-indigo-700">{user.name}</span>!
        </h1>
        <p className="text-xl text-gray-600">
          You are logged in as an admin. Explore the dashboard to manage orders and products.
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
