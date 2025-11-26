import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { register } from "../../services/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await register({fullName, email, password});
      navigate("/login"); 
    } catch (err) {
      alert("Register failed");
    }
  }


  return (
    <div className="p-4 text-center bg-gray-100 h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8  shadow-md inline-block rounded-2xl w-100 ">
        <div>
          <p className="text-3xl">💵</p>
          <h1 className="text-3xl">Finance Tracker</h1>
        </div>
        <div>
          <form className="flex flex-col gap-4 mt-4 max-w-sm mx-auto" 
            onSubmit={confirmPassword===password? 
              handleSubmit: (e) => {e.preventDefault(); alert("Passwords do not match")}
            }
          >
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 border border-gray-400 rounded-xl"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="p-2 border border-gray-400 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="p-2 border border-gray-400 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="p-2 border border-gray-400 rounded-xl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-green-500 text-white p-2 rounded-xl hover:scale-101"
            >
              Register
            </button>
          </form>
          <Link to="/login" className=" hover:underline mt-4 inline-block">
            <p>Already have an account</p>
          </Link>
          
        </div>
      </div>
    </div>
  )
}