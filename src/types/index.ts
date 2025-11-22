export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  wallet_balance: number;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  total_shares: number;
  price_per_share: number;
  available_shares: number;
  total_raised: number;
  status: 'open' | 'closed' | 'archived';
  total_profit: number;
  total_investors: number;
  shares_sold: number;
  pending_shares?: number;
  created_at: string;
  updated_at: string;
}

export interface Share {
  id: string;
  project_id: string;
  user_id: string;
  number_of_shares: number;
  amount_paid: number;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed';
  profit_amount: number;
  payment_proof_url?: string;
  amount_sent?: number;
  sender_account?: string;
  account_type?: 'bank' | 'bkash' | 'nagad' | 'rocket' | 'upay';
  created_at: string;
  updated_at: string;
}

export interface Investment {
  share_id: string;
  user_id: string;
  user_name: string;
  email: string;
  project_id: string;
  project_name: string;
  number_of_shares: number;
  amount_paid: number;
  profit_amount: number;
  status: string;
  ownership_percentage: number;
  investment_date: string;
  payment_proof?: string;
  amount_sent?: number;
  sender_account?: string;
  account_type?: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}