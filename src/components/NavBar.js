import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 

const NavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    
    localStorage.removeItem("authToken");
 
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white sticky top-0 z-50 w-full p-4 shadow-md">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="logo" alt="Logo" className="h-10" />
          <h1 className="text-xl font-bold">Agro Farm</h1>
        </div>

        {/* Desktop nav items */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex gap-6 text-lg font-semibold">
            <Link to={"/home"}>
              <li className="cursor-pointer hover:text-green-600 transition duration-200">Home</li>
            </Link>
            <Link to={"/"}>
              <li className="cursor-pointer hover:text-green-600 transition duration-200">Products</li>
            </Link>
            <Link to={"/track-order"}>
              <li className="cursor-pointer hover:text-green-600 transition duration-200">Orders</li>
            </Link>
          </ul>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Mobile icon */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 hover:text-green-600 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu*/}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-4">
          <ul className="flex flex-col gap-4">
            <Link to={"/home"}>
              <li className="text-lg font-semibold cursor-pointer">Home</li>
            </Link>
            <Link to={"/"}>
              <li className="text-lg font-semibold cursor-pointer">Products</li>
            </Link>
            <Link to={"/track-order"}>
              <li className="text-lg font-semibold cursor-pointer">Orders</li>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-md mt-4"
            >
              Logout
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
