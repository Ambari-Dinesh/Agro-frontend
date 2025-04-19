import NavBar from "../components/NavBar";
import logo from '../assets/logo.jpg'
import { Link, Navigate, useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate();

    const checkUser = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        navigate("/login"); // ✅ this will navigate correctly
    } else {
        navigate("/"); // or any other route you want to go if authenticated
    }
    };

    return(
        <>
         <NavBar/>
         <div   className="bg-cover bg-center h-[94vh] w-full flex justify-center items-center flex-col gap-2 text-white"
         style={{ backgroundImage: `url('${logo}')` }} >
            <h1 className="text-6xl">Welcome! to Agro Farm</h1>
            <p>Buy diffferent Vegetables and Fruits At a single Place</p>
            

              <button className="bg-transparent border-black border-2 p-3 rounded" onClick={checkUser}>
                Start your Buying
              </button>

           
         </div>
        </>
    )
}


export default Home