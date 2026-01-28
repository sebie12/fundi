import { User } from './types';
import { CreateWalletDTO } from './dtos';

export class UserService {
  async getWallets(): Promise<Response> {
    const data = await fetch('/api/wallets/');
    return data;
  }

  async getWalletById(id: number): Promise<Response> {
    const data = await fetch(`/api/wallets/${id}`); 
    return data;
  }

  async getWalletsFromUser(userId: number): Promise<Response> {
    const data = await fetch(`/api/users/${userId}/wallets/`); 
    return data;
  }

  async createWallet(name: string, amount: number, userId: number, coin: string): Promise<Response> {
    const walletData: CreateWalletDTO = {
      user: userId,
      name: name,
      balance: amount,
      coin: coin,
      allTimeExpenses: 0,
      allTimeEarnings: 0
    };

    const data = await fetch('/api/wallets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(walletData),
    });
    return data;
  }

  async getUsers(): Promise<Response> {
    const data = await fetch('/api/users/');
    return data;
  }

  async getUserById(id: number): Promise<Response> {
    const data = await fetch(`/api/users/${id}`); 
    return data;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<Response> {
    const data = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return data;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<Response> {
    const data = await fetch(`/api/users/${id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return data;
  }

  async deleteUser(id: number): Promise<Response> {
    return await fetch(`/api/users/${id}`, { 
      method: 'DELETE',
    });
  }
}