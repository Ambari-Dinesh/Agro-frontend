import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
   const { name, price, image_url, id } = data;
   const navigate = useNavigate();

   const handlePlaceOrder = () => {
     navigate("/placeorder", { state: { product: data } });  // Pass product details via state
   };

   return (
      <div className="text-black h-160 bg-slate-100 rounded p-5 shadow">
         <div>
            <img src={image_url} alt={name} className="w-44 h-44 m-2" />
         </div>
         <div className="flex justify-start flex-col gap-2">
            <h3 className="font-semibold text-2xl">{name}</h3>
            <h2>Price per unit: Rs.{price}</h2>
            <button onClick={handlePlaceOrder} className="border border-black rounded bg-orange-300">Place Order</button>
         </div>
      </div>
   );
};

export default ProductCard;
