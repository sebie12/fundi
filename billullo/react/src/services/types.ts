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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}