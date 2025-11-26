
const API_URL = 'http://localhost:3333  ';

export async function login (data: {email: string, password: string}) {
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

  return response.json();
}