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

export async function addTransaction(Transaction: { amount: number; type: 'income' | 'expense'; category_id: number; title: string}) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");


  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(Transaction)
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Failed to add transaction: ${responseText}`);
    }

    const newTransaction = JSON.parse(responseText);
    return newTransaction;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }  
}