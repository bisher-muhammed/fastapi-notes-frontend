import { useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";


export default function Login() {
  const [formData, setFormData] = useState({ user_email: "", password: "" });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await api.post("/auth/login", formData);
      console.log("Login Response:", response.data); 

      
      localStorage.setItem("token", response.data.access_token);

      dispatch(loginSuccess({ user: response.data.user, token: response.data.access_token }));


      
      router.push("/home");
    } catch (err) {
      // Handle different errors
      if (err.response?.status === 404) {
        setError("User not found. Please register first.");
      } else if (err.response?.status === 401) {
        setError("Incorrect password. Try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3e0]">
      
      {/* Header */}
      <Header/>
      <div className="p-4 text-sm text-[#d48277]">
        <span>Homepage</span> / <span>Login Page</span>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center py-8">
        <div className="w-[380px] bg-[#f8f3e0] border border-[#45351e] rounded shadow-lg">
          {/* Window Header */}
          <div className="bg-orange-300 p-4 rounded-t flex justify-between items-center">
            <div className="text-sm text-amber-950">Login</div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm mb-1 text-amber-800">Email</label>
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                className="w-full border border-[#45351e] rounded-xl p-2 text-sm"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm mb-1 text-amber-800">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-[#45351e] rounded-xl p-2 text-sm"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#6bd494] text-white px-2 ml-6 py-2 rounded-xl text-sm hover:bg-[#5bc383]"
              >
                Login
              </button>

              <Link href="/register">
                <button
                  type="button"
                  className="bg-[#f3bb99] text-white px-2 mr-6 py-2 rounded-xl text-sm hover:bg-[#e4ac8a]"
                >
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}