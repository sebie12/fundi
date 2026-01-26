export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Wallet {
  id: number;
  name: string;
  balance: number;
  userId: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}