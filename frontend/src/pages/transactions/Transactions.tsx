import React, { useState, useEffect } from 'react';
import { Transaction } from '../../types/TransactionType';
import { addTransaction, fetchTransactions } from '../../services/transactions';
import { fetchCategories } from '../../services/categories';



export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]); 
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');


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

  const getCategories = async () => {
      try{
        setLoading(true);
        setError(null);
        const data = await fetchCategories();
        setCategories(data);
      }catch (error) {
        setError("Failed to fetch categories");
      }
      finally{
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getCategories();
    }, []);


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
  
  async function handleAddTransaction(e: React.FormEvent) {
    e.preventDefault();
    
    const transactionData = {
      amount, 
      title, 
      type: transactionType, 
      category_id: selectedCategory as number
    };
    
  
    
    try {
      const result = await addTransaction(transactionData);
      
      setTitle('');
      setAmount(0);
      setSelectedCategory('');
      setTransactionType('income');
      
      await getTransactions();
      
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      setError("Impossible d'ajouter la transaction");
    }
  }


  return (
    <div className="p-4 flex gap-4 flex-col text-2xl">
      <div className="flex flex-row justify-between pb-8 items-center">
        <h1 className="text-5xl font-bold mb-0">Transactions</h1>
        <button 
          className="bg-green-500 text-gray-200 px-4 py-2 rounded-xl hover:cursor-pointer flex gap-2 items-center hover:bg-green-600 transition duration-150 "  
          onClick={() => setShowModal(true)}
        >
          <span className="text-green-500 text-3xl rounded-full w-10 h-10 flex justify-center bg-gray-200">
            + 
          </span>
          Ajouter une transaction
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[420px] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-2xl font-semibold">Ajouter une transaction</h2>
              <button 
                onClick={() => {
                  setShowModal(false)
                  setTitle('')
                  setAmount(0)
                  setSelectedCategory('')
                  setTransactionType('income')
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none hover:cursor-pointer"
              >
                ×
              </button>
            </div>
            <hr />
            <div className="flex gap-0 mb-2 border-gray-800 pt-5">
              <button
                onClick={() => setTransactionType('income')}
                className={`py-2 px-2 rounded-l-full font-medium text-sm transition-all duration-200 flex items-center justify-center gap-1 ${
                  transactionType === 'income'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Income
              </button>

              <button
                onClick={() => setTransactionType('expense')}
                className={` py-2 px-2 rounded-r-full font-medium text-sm transition-all duration-200 flex items-center justify-center gap-1 ${
                  transactionType === 'expense'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Expense
              </button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleAddTransaction}>
              <input
                type="text"
                placeholder="Titre"
                className="p-2 rounded text-base w-full bg-gray-100"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="number"
                placeholder="Montant"
                className="p-2 rounded text-base w-full bg-gray-100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <select 
                className="p-2 rounded text-base w-full bg-gray-100"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
              >
                <option value="" disabled hidden>
                  Sélectionne une catégorie
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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