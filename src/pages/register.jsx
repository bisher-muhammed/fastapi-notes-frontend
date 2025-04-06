import { useState } from "react";
import api from "@/utils/api"; // Assuming this is set up correctly
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validate = () => {
    let tempErrors = {};

    if (!formData.user_name.trim()) {
      tempErrors.user_name = "Username is required.";
    } else if (formData.user_name.length < 3) {
      tempErrors.user_name = "Username must be at least 3 characters.";
    }

    if (!formData.user_email) {
      tempErrors.user_email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      tempErrors.user_email = "Invalid email format.";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.cpassword) {
      tempErrors.cpassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop API call if validation fails

    try {
      const response = await api.post("/auth/register", {
        user_name: formData.user_name,
        user_email: formData.user_email,
        password: formData.password,
      });

      if (response.status === 201) {
        // Successful registration
        router.push("/auth/login"); // Redirect to login on success
      }
    } catch (err) {
      setApiError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3e0]">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="p-4 text-sm text-[#d48277]">
        <span>Homepage</span> / <span>SignUp Page</span>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center py-8">
        <div className="w-[380px] bg-[#f8f3e0] border border-[#45351e] rounded shadow-lg">
          {/* Window Header */}
          <div className="bg-orange-300 p-4 rounded-t flex justify-between items-center">
            <div className="text-sm text-amber-950">Signup</div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign up</h2>

            {/* Username */}
            <div className="mb-5">
              <label className="block text-sm mb-1 text-amber-800">Username</label>
              <input
                type="text"
                name="user_name" // Corrected to match state key
                value={formData.user_name}
                onChange={handleChange}
                className="w-full border border-[#45351e] rounded-xl p-2 text-sm"
              />
              {errors.user_name && <span className="text-red-500">{errors.user_name}</span>}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm mb-1 text-amber-800">Email</label>
              <input
                type="email"
                name="user_email" // Corrected to match state key
                value={formData.user_email}
                onChange={handleChange}
                className="w-full border border-[#45351e] rounded-xl p-2 text-sm"
              />
              {errors.user_email && <span className="text-red-500">{errors.user_email}</span>}
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
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm mb-1 text-amber-800">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full border border-[#45351e] rounded-xl p-2 text-sm"
              />
              {errors.cpassword && <span className="text-red-500">{errors.cpassword}</span>}
            </div>

            {/* Error Message */}
            {apiError && <div className="text-red-500 text-center">{apiError}</div>}

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#6bd494] text-white px-2 ml-6 py-2 rounded-xl text-sm hover:bg-[#5bc383]"
              >
                Register
              </button>

              <Link href="/login">
                <button
                  type="button"
                  className="bg-[#f3bb99] text-white px-2 mr-6 py-2 rounded-xl text-sm hover:bg-[#e4ac8a]"
                >
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
