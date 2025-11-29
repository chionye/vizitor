import apiClient from './apiClient';
import { LoginCredentials, AuthResponse, User } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile');
    return response.data;
  },

  async logout(): Promise<void> {
    // Optional: Call backend logout endpoint if needed
    // await apiClient.post('/auth/logout');
  },
};
