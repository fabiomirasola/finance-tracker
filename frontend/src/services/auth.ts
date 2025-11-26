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