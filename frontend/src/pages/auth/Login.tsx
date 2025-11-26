import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

      localStorage.setItem("token", data.token.token);

      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  }


  return (
    <div className="p-4 text-center bg-gray-100 h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8  shadow-md inline-block rounded-2xl w-100 ">
        <div>
          <p className="text-3xl">💵</p>
          <h1 className="text-3xl">Finance Tracker</h1>
        </div>
        <p className="text-xl">Welcome Back !</p>
        <div>
          <form className="flex flex-col gap-4 mt-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
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
            <button 
              type="submit" 
              className="bg-green-500 text-white p-2 rounded-xl hover:scale-101"
            >
              Login
            </button>
          </form>
          <Link to="/register" className=" hover:underline mt-4 inline-block">
            <p>Create an account</p>
          </Link>
          
        </div>
      </div>
    </div>
  )
}