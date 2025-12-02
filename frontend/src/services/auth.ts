import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:3333';

export async function login (data: {email: string, password: string}) {
  try{
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const responseData = await response.json();
    localStorage.setItem("token", responseData.token.token);
    return responseData;
  }
  catch (error) {
    alert("Login failed");
  }
}

export async function register (data: {fullName: string, email: string, password: string}) {
  try{
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    const responseData = await response.json();
    if (responseData){
      alert("Registration successful");
    }
  }
  catch (error) {
    alert("Registration failed");
  }
}

export async function logout() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error", error);
  }
}

export async function getMe() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/get`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  const data = await response.json();
  return data;
}

export async function changePassword(oldPassword: string, newPassword: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!response.ok) {
    throw new Error("Failed to change password");
  }

  const data = await response.json();
  return data;
}