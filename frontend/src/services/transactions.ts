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

export async function getDailyTotals(maxDays: number = 4) {
  const transactions = await fetchTransactions();
  
  if (!transactions || transactions.length === 0) {
    return [];
  }

  // Grouper les transactions par jour
  const dailyData: { [key: string]: { income: number; expense: number; date: string } } = {};

  transactions.forEach((transaction: any) => {
    const date = new Date(transaction.createdAt).toISOString().split('T')[0];
    
    if (!dailyData[date]) {
      dailyData[date] = { income: 0, expense: 0, date };
    }

    if (transaction.type === 'income') {
      dailyData[date].income += parseFloat(transaction.amount);
    } else if (transaction.type === 'expense') {
      dailyData[date].expense += parseFloat(transaction.amount);
    }
  });

  // Convertir en tableau, trier par date et prendre seulement les N derniers jours
  return Object.values(dailyData)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-maxDays); // Prend les N derniers jours
}