import ApiClient from './apiClient';
import { User, Wallet } from './types';

class UserService {
  private api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  async getUsers(): Promise<User[]> {
    return this.api.get<User[]>('/api/users');
  }

  async getUserById(id: number): Promise<User> {
    return this.api.get<User>(`/api/users/${id}`);
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    return this.api.post<User>('/api/users', userData);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.api.put<User>(`/api/users/${id}`, userData);
  }

  async deleteUser(id: number): Promise<void> {
    return this.api.delete<void>(`/api/users/${id}`);
  }
}

export default UserService;