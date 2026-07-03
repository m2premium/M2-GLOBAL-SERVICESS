export interface User {
  email: string;
  password?: string;
  name: string;
  avatarUrl?: string;
  role: string;
  department: string;
  company: string;
  joinDate: string;
}

export type Theme = 'cyber-slate' | 'solar-flare' | 'emerald-vault' | 'deep-space';

export type ActiveView = 'login' | 'dashboard';

export type LoginMode = 'login' | 'signup' | 'recover';

export interface Session {
  user: User;
  loggedInAt: string;
  authToken: string;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Planning' | 'On Hold';
  teamSize: number;
  budget: string;
  category: string;
}
