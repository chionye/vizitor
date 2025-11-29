import apiClient from './apiClient';
import { Visitor, VisitorFormData, VisitorSearchParams, DashboardStats } from '@/types';

export const visitorService = {
  async getVisitors(params?: VisitorSearchParams): Promise<Visitor[]> {
    const response = await apiClient.get<Visitor[]>('/visitors', { params });
    return response.data;
  },

  async getVisitorById(id: string): Promise<Visitor> {
    const response = await apiClient.get<Visitor>(`/visitors/${id}`);
    return response.data;
  },

  async createVisitor(data: VisitorFormData): Promise<Visitor> {
    const response = await apiClient.post<Visitor>('/visitors', data);
    return response.data;
  },

  async updateVisitor(id: string, data: Partial<VisitorFormData>): Promise<Visitor> {
    const response = await apiClient.put<Visitor>(`/visitors/${id}`, data);
    return response.data;
  },

  async deleteVisitor(id: string): Promise<void> {
    await apiClient.delete(`/visitors/${id}`);
  },

  async checkOutVisitor(id: string): Promise<Visitor> {
    const response = await apiClient.post<Visitor>(`/visitors/${id}/checkout`);
    return response.data;
  },

  async getTodayVisitors(): Promise<Visitor[]> {
    const response = await apiClient.get<Visitor[]>('/visitors/today');
    return response.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/visitors/stats');
    return response.data;
  },

  async searchVisitors(params: VisitorSearchParams): Promise<Visitor[]> {
    const response = await apiClient.get<Visitor[]>('/visitors/search', { params });
    return response.data;
  },
};
