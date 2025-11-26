import React, { useState, useEffect } from 'react';
import { Transaction } from '../../types/TransactionType';
import { fetchTransactions } from '../../services/transactions';



export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);

  const getTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTransactions();
      setTransactions(response);
    } catch (error) {
      console.error("Error fetching transactions in component:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []); 

  console.log(transactions);

  if (loading) {
    return <div className="p-4 text-center text-2xl">Loading...</div>;
  }

  const formatDate = (dateString:string) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (e) {
        return dateString; 
    }
  };

  const getAmountStyle = (type:string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  console.log(transactions);

  return (
    <div className="p-4 flex gap-4 flex-col text-2xl">
      <div className="flex flex-row justify-between pb-8 items-center">
        <h1 className="text-5xl font-bold mb-0">Transactions</h1>
        <button className="bg-green-500 text-gray-200 px-4 py-2 rounded-xl hover:cursor-pointer flex gap-2 items-center hover:bg-green-600 transition duration-150">
          <span className="text-green-500 text-3xl rounded-full w-8 h-8 flex items-center justify-center bg-gray-200">
            + 
          </span>
          Ajouter une transaction
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200 text-left text-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium text-gray-700 uppercase tracking-wider">Titre</th>
              <th scope="col" className="px-6 py-3 font-medium text-gray-700 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 font-medium text-gray-700 uppercase tracking-wider text-right">Montant</th>
              <th scope="col" className="px-6 py-3 font-medium text-gray-700 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {transaction.type === 'income' ? 'Revenu' : 'Dépense'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap font-bold text-right ${getAmountStyle(transaction.type)}`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {transaction.amount.toFixed(2)}€ 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(transaction.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center text-gray-500 italic">
                  Aucune transaction trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}