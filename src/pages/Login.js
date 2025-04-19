import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../UserContext";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");  // Default to 'user'
  const [adminKey, setAdminKey] = useState(""); // Admin secret key input
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  // Check if the user is already logged in
  const token = localStorage.getItem("authToken");
  if (token) {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Handle role-specific logic
    if (role === "admin" && adminKey !== process.env.REACT_APP_ADMIN_SECRET_KEY) {
      setLoading(false);
      return toast.error("Invalid Admin Secret Key");
    }

    try {
      // Send login request to the backend
      const res = await axios.post("/auth/login", { email, password });

      const { user, token } = res.data;

      // Store token and user role
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);

      login(user); // Store the user in the context

      toast.success("Login Successful");

      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
  
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Login to Agro Farm</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Role selection */}
          <div className="flex items-center mb-4">
            <label htmlFor="role" className="mr-2">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Show admin key input only if the role is admin */}
          {role === "admin" && (
            <div className="mb-4">
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter Admin Secret Key"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center">
            Do Not have an Account?{" "}
            <a href="/signup" className="text-red-600">Register Here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
