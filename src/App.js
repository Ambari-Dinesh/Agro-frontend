import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Catalogue from "./pages/Catalogue";
import PlaceOrder from "./pages/PlaceOrder";
import TrackOrder from "./pages/TrackOrder";
import AdminAddProduct from "./admin/AdminAddProduct";
import AdminOrders from "./admin/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import { UserProvider } from "./UserContext";
import { Toaster } from "react-hot-toast"; // Import Toaster
import './output.css';
import Home from "./pages/Home";


function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Catalogue />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
          </Routes>
        </Router>
      </UserProvider>
      <Toaster/>
    </>
  );
}

export default App;
