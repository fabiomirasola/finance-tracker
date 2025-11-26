const API_URL = 'http://localhost:3333';

export async function fetchCategories() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}