import { create } from 'zustand';
import { VisitorState, VisitorFormData } from '@/types';
import { visitorService } from '@/services/visitorService';

export const useVisitorStore = create<VisitorState>((set) => ({
  visitors: [],
  loading: false,
  error: null,

  fetchVisitors: async () => {
    set({ loading: true, error: null });
    try {
      const visitors = await visitorService.getVisitors();
      set({ visitors, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchVisitorById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const visitor = await visitorService.getVisitorById(id);
      set({ loading: false });
      return visitor;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createVisitor: async (data: VisitorFormData) => {
    set({ loading: true, error: null });
    try {
      const visitor = await visitorService.createVisitor(data);
      set((state) => ({
        visitors: [visitor, ...state.visitors],
        loading: false,
      }));
      return visitor;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateVisitor: async (id: string, data: Partial<VisitorFormData>) => {
    set({ loading: true, error: null });
    try {
      const visitor = await visitorService.updateVisitor(id, data);
      set((state) => ({
        visitors: state.visitors.map((v) => (v.id === id ? visitor : v)),
        loading: false,
      }));
      return visitor;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteVisitor: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await visitorService.deleteVisitor(id);
      set((state) => ({
        visitors: state.visitors.filter((v) => v.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  checkOutVisitor: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const visitor = await visitorService.checkOutVisitor(id);
      set((state) => ({
        visitors: state.visitors.map((v) => (v.id === id ? visitor : v)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
