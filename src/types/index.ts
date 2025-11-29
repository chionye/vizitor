// User Roles
export type UserRole = 'Admin' | 'Security Officer' | 'Receptionist';

// User Interface
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

// Auth Interfaces
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

// Visitor Interface
export interface Visitor {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber: string;
  company?: string;
  purpose: string;
  hostStaffId: string;
  hostStaffName: string;
  checkInTime: string;
  checkOutTime?: string;
  visitorCode: string;
  photoUrl?: string;
  idType?: string;
  idNumber?: string;
  vehicleNumber?: string;
  status: 'checked-in' | 'checked-out' | 'expected';
  createdAt: string;
  updatedAt?: string;
}

export interface VisitorFormData {
  fullName: string;
  email?: string;
  phoneNumber: string;
  company?: string;
  purpose: string;
  hostStaffId: string;
  hostStaffName: string;
  idType?: string;
  idNumber?: string;
  vehicleNumber?: string;
  photoUrl?: string;
}

export interface VisitorState {
  visitors: Visitor[];
  loading: boolean;
  error: string | null;
  fetchVisitors: () => Promise<void>;
  fetchVisitorById: (id: string) => Promise<Visitor | null>;
  createVisitor: (data: VisitorFormData) => Promise<Visitor>;
  updateVisitor: (id: string, data: Partial<VisitorFormData>) => Promise<Visitor>;
  deleteVisitor: (id: string) => Promise<void>;
  checkOutVisitor: (id: string) => Promise<void>;
}

// User/Staff Management
export interface CreateUserData {
  username: string;
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserData {
  email?: string;
  fullName?: string;
  role?: UserRole;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  createUser: (data: CreateUserData) => Promise<User>;
  updateUser: (id: string, data: UpdateUserData) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}

// Dashboard Statistics
export interface DashboardStats {
  totalVisitorsToday: number;
  activeVisitors: number;
  totalVisitorsThisMonth: number;
  totalVisitorsThisWeek: number;
}

// Visitor Pass/Badge
export interface VisitorPass {
  visitorId: string;
  visitorName: string;
  hostName: string;
  checkInTime: string;
  visitorCode: string;
  qrCodeData: string;
}

// Search and Filter
export interface VisitorSearchParams {
  dateFrom?: string;
  dateTo?: string;
  visitorName?: string;
  hostStaffId?: string;
  status?: Visitor['status'];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
