import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = async() => {
    await logout();
    navigate("/login");
  }

  console.log(localStorage.getItem("token"));

  return (
    <div className="p-4 text-center text-2xl">
      <h1 className="text-3xl font-bold mb-4">Mon profil</h1>
      <div>
        <p>Nom d'utilisateur</p>
      </div>
      <button onClick={handleLogout} className="mt-8 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600" >
        Logout
      </button>

    </div>
  )
}