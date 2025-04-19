import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { UserContext } from "../UserContext";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation for accessing passed state
import {toast} from "react-hot-toast";
import NavBar from "../components/NavBar";

function PlaceOrder() {
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    contact: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the passed product data

  const product = location.state?.product; // Access the passed product data
  form.productId=product.id

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id || !user?.name) {
      setMessage("You must be logged in to place an order.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        product_id: form.productId,
        quantity: parseInt(form.quantity),
        contact: form.contact,
        address: form.address,
        user_id: user.id,
        buyer_name: user.name
      };


      await axios.post("/orders", payload);
      toast.success("Order placed successfully!");
      setForm({ productId: "", quantity: "", contact: "", address: "" });
       // Navigate to the home page or another page after success
    } catch (err) {
      
      setMessage("❌ Order failed: " + (err.response?.data?.error || "Server error"));
      console.log("Full error response:", err.response); // Log the entire error response
   
   
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <NavBar/>
    <div className="w-full h-screen flex justify-strat items-center flex-col mt-10">
    <h2 className="font-semibold m-4 text-3xl self-start">Place Order</h2>
    <form onSubmit={handleSubmit}  className="w-[30%] text-black p-5 flex justify-around items-center border gap-4 border-black rounded">
      

      {product ? (
        <>
          <div className="p-1 flex justify-start flex-col gap-2">
            <h3>Product:{product.name}</h3>
            <img src={product.image_url} alt={product.name}  className="w-25 h-25 "/>
            <h4>Price per unit: ₹{product.price}</h4>
          </div>
          <div className="flex justify-center flex-col items-start gap-4 mt-4">

          <input
            name="quantity"
            type="number"
            min="1"
            onChange={handleChange}
            value={form.quantity}
            placeholder="Quantity"
            required
            className="border border-black rounded w-[200px] p-1 "
          />
          <input
            name="contact"
            onChange={handleChange}
            value={form.contact}
            placeholder="Contact Info"
            className="border border-black rounded w-[200px] p-1 "
            required
          />
          <input
            name="address"
            onChange={handleChange}
            value={form.address}
            placeholder="Delivery Address"
            className="border border-black rounded w-[200px] p-1 "
            required
          />

          <button type="submit" disabled={loading} className="bg-blue-500 text-black p-3 font-semibold rounded">
            {loading ? "Placing..." : "Submit Order"}
          </button>
          </div>
        </>
      ) : (
        <p>No product selected!</p>
      )}

      {message && <p style={{ marginTop: "1rem", color: message.startsWith("✅") ? "green" : "red" }}>{message}</p>}
    </form>
    </div>
    </>
  );
}

export default PlaceOrder;
