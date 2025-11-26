export interface Transaction {
  id: number;
  title: string;
  type: 'income' | 'expense'; 
  amount: number;
  created_at: string;
  category_id?: number;
}