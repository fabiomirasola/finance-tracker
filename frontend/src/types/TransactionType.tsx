export interface Transaction {
  id: number;
  title: string;
  type: 'income' | 'expense'; 
  amount: number;
  createdAt: string;
  category_id?: number;
}