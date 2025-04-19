import { useEffect, useState } from "react";
import axios from "../api/axios";
import AdminNavBar from "../components/AdminNavBar"; // Make sure this path is correct
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading status

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const res = await axios.get("/admin/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const updateStatus = async (id, status) => {
    setLoading(true); // Set loading to true when updating the status
    try {
      await axios.put(`/admin/orders/${id}`, { status });
      toast.success(`order id ${id} updated`)
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false); // Set loading to false after status is updated
    }
  };

  return (
    <>
      <AdminNavBar />

      <div className="p-6 bg-gray-100 min-h-screen w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">📦 Manage Orders</h2>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-10">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition w-[60%]"
              >
                <img
                  src={order.image_url}
                  alt={order.product_name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="space-y-1">
                  <h3>Order Id:  {order.order_id}</h3>
                  <h3 className="text-xl font-semibold">{order.product_name}</h3>
                  <p className="text-gray-600">Qty: {order.quantity}</p>
                  <p className="text-gray-700 font-medium">₹{order.price}</p>
                  <p className="text-sm text-gray-500">Status: {order.status}</p>
                </div>

                <select
                  className="mt-3 w-full p-2 border rounded-md text-gray-700 bg-gray-50"
                  value={order.status}
                  onChange={(e) => updateStatus(order.order_id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrders;
