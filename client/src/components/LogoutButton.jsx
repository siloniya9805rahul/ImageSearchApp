import axios from "axios";

export default function LogoutButton({ onLogout }) {
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", {
        withCredentials: true, 
      });
      console.log("✅ Logged out");
      if (onLogout) onLogout(); 
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
