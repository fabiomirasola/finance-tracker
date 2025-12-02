import { Link, useNavigate } from "react-router-dom";
import { getMe, logout } from "../../services/auth";
import { useEffect, useState } from "react";
import { User } from "../../types/Usertype";
import { changePassword } from "../../services/auth";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleLogout = async() => {
    await logout();
    navigate("/login");
  }

  const getUserInfo = async() => {
    try{
      setLoading(true);
      setError(null)
      const data = await getMe();
      setUser(data.user);
    }catch (error) {
      setError("Failed to fetch user info");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    try{
      await changePassword(oldPassword, newPassword);
      alert("Mot de passe changé avec succès.");
      setShowPasswordForm(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Échec du changement de mot de passe.");
    }

  }  

  if (loading) {
    return <div className="p-4 text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="p-4 text-2xl flex flex-col justify-between h-full">
      <h1 className="text-5xl font-bold mb-4">Mon profil</h1>
      <div className="flex gap-12 flex-col">
        <div>
          <p className="text-3xl font-semibold mb-4">Informations: </p>
          <div className="text-xl text-gray-500">
            <div className="flex flex-row gap-4">
              <p className="font-bold">Nom: </p>
              <p> {user?.fullName}</p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="font-bold">Email: </p>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-3xl font-semibold mb-4">Mot de passe: </p>
          <button onClick={()=>setShowPasswordForm(!showPasswordForm)} className="bg-gray-300 text-gray-500 py-2 px-4 rounded-xl hover:border hover:cursor-pointer">🔐 Changer le mot de passe</button>
        </div>
      {showPasswordForm && (
        <div className=" bg-white border-2 border-gray-300 p-3 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Modifier le mot de passe</h3>
            <button 
              onClick={()=>setShowPasswordForm(!showPasswordForm)} 
              className="text-gray-500 hover:text-gray-700 text-xl font-bold px-2 hover:cursor-pointer"
            >
              ×
            </button>
          </div>

          <form className="flex gap-2" onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Ancien mot de passe"
              className="p-2 border rounded text-base flex-1"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="p-2 border rounded text-base flex-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmer mot de passe"
              className="p-2 border rounded text-base flex-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-base whitespace-nowrap" type="submit">
              Valider
            </button>
          </form>
        </div>
      )}
      </div>
      <button onClick={handleLogout} className="mt-8 w-100 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600" >
        Logout
      </button>

    </div>
  )
}