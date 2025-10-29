import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const res = await axios.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.log("Not authenticated:", err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);



  if (loading) return <div className="flex items-center justify-center h-[80vh] bg-gray-50 dark:bg-gray-900 ">
    <div className="w-16 h-16 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={user ? <SearchPage user={user} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
