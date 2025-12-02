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

export async function createCategory(name: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (!response.ok) {
      throw new Error('Failed to create category');
    }

    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete category');
    }

    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}