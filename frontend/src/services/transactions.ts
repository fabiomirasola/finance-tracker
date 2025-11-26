const API_URL = 'http://localhost:3333';

export async function fetchTransactions() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    const transactions = await response.json();
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }  
}