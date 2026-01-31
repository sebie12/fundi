export interface User {
  id: number;
  first_name: string;
  last_Name: string;
}

export interface Wallet {
  id: number;
  user: number;
  name: string;
  balance: number;
  coin: string;
  allTimeExpenses: number;
  allTimeEarnings: number;
}

export interface Category{
  id:number;
  name:string;
  priorityLevel:number;
}

export interface Expense{
  id: number;
  title: string;
  amount: number;
  date_incurred: string;
  type: 'one-time' | 'weekly' | 'monthly'; 
  wallet: number;
  category: number;
  last_deduction_date?: string;
}
export interface Income{
  id:number;
  source: string;
  amount: number;
  date: string;
  frequency: string;
  wallet: number;
}
export interface savingGoal{
    id:number;
    name: string;
    target: number;
    currentAmount: number;
    date: string;
    user: number;
}
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}