import { User, Wallet } from './types';

export class UserService {
  async getWallets(): Promise<Response> {
    const data = await fetch('/api/wallets');
    return data;
  }

  async getWalletById(id: number): Promise<Response> {
    const data = await fetch(`/api/wallets/${id}`);
    return data;
  }

  async createWallet(walletData: Omit<Wallet, 'id'>): Promise<Response> {
    const data = await fetch('/api/wallets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(walletData),
    });
    return data;
  }

  async getUsers(): Promise<Response> {
    const data = await fetch('/api/users');
    return data;
  }

  async getUserById(id: number): Promise<Response> {
    const data = await fetch(`/api/users/${id}`);
    return data;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<Response> {
    const data = await fetch('/api/users', {
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