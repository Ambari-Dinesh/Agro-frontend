import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/productCard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from 'jwt-decode';


function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      
      const decodedToken = jwt_decode(token);

      
      if (decodedToken.role === "admin") {
        navigate("/admin");
        return;
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }

    
    axios
      .get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);  
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setLoading(false);  
      });
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen bg-slate-100 p-4">
        <h1 className="text-3xl font-semibold mb-4">Products:</h1>

        <div className="flex justify-center items-center m-5">
          {loading ? (
            <div className="flex flex-row gap-2 mt-20">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
          ) : (
            <div className="flex justify-center flex-row gap-4 flex-wrap">
              {products.map((p) => (
                <ProductCard key={p.id} data={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Catalogue;
