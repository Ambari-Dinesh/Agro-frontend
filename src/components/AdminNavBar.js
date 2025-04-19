import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-green-700">Admin Panel</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link to="/admin/orders" className="hover:text-green-600 transition">Orders</Link>
          <Link to="/admin/add-product" className="hover:text-green-600 transition">Add Product</Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-2xl">
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-4 text-lg font-medium">
          <Link to="/admin/orders" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
          <Link to="/admin/add-product" onClick={() => setMobileMenuOpen(false)}>Add Product</Link>
          <button
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
};

export default AdminNavBar;
