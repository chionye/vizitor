import { create } from 'zustand';
import { UserState, CreateUserData, UpdateUserData } from '@/types';
import { userService } from '@/services/userService';

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await userService.getUsers();
      set({ users, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createUser: async (data: CreateUserData) => {
    set({ loading: true, error: null });
    try {
      const user = await userService.createUser(data);
      set((state) => ({
        users: [...state.users, user],
        loading: false,
      }));
      return user;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateUser: async (id: string, data: UpdateUserData) => {
    set({ loading: true, error: null });
    try {
      const user = await userService.updateUser(id, data);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? user : u)),
        loading: false,
      }));
      return user;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await userService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
