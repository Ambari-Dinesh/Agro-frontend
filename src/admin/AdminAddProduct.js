import { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import uploadFile from "../components/uploadPhoto";
import { toast } from "react-hot-toast";
import AdminNavBar from "../components/AdminNavBar";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const AdminAddProduct = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image_url: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    if (!user) {
      return; 
    }
    if (user.role !== "admin") {
      return; 
    }

    setLoading(true);
    axios.get("/admin/products").then((res) => {
      setProducts(res.data);
      setLoading(false); 
    });
  }, [user]); 

  // redirection to login page
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No file selected");
    const res = await uploadFile(file);
    setNewProduct({ ...newProduct, image_url: res.url });
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image_url) return toast.error("All fields required!");
    
    setLoading(true);
    await axios.post("/admin/products", newProduct);
    setNewProduct({ name: "", price: "", image_url: "" });
    const res = await axios.get("/admin/products");
    setProducts(res.data);
    setLoading(false);
    toast.success("Product added");
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    await axios.delete(`/admin/products/${id}`);
    const res = await axios.get("/admin/products");
    setProducts(res.data);
    setLoading(false);
    toast.success("Deleted successfully");
  };

  return (
    <>
      <AdminNavBar />
      <div className="p-4 ml-4">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 rounded w-full"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded w-full"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input type="file" onChange={handleUploadPhoto} />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>

        <h3 className="text-xl font-semibold">Product List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-4">
          {
            loading ? (
              <div className="flex flex-row gap-2 mt-20 w-full justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="border p-4 rounded shadow bg-white w-[60%]">
                  <img src={p.image_url} alt={p.name} className="h-32 object-fit w-full mb-2 rounded" />
                  <p className="font-semibold">{p.name}</p>
                  <p>₹{p.price}</p>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            )
          }
        </div>
      </div>
    </>
  );
};

export default AdminAddProduct;
