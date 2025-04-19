import { useState, useEffect } from "react";
import axios from "../api/axios";
import OrderCard from "../components/OrderCard";
import { toast } from "react-hot-toast";
import NavBar from "../components/NavBar";

function TrackOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await axios.get("/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");

      await axios.delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order Cancelled");
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (err) {
      console.error("Failed to cancel order", err);
      alert("Could not cancel the order. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-4 flex justify-center items-center flex-col mt-5">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

        {loading ? (
          <div className="flex flex-row gap-2 mt-20 justify-center">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {orders.map((order) => (
              <OrderCard key={order.id} data={order} onCancel={handleCancel} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default TrackOrder;
