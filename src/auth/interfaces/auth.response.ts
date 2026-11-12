import type { User } from '@/interfaces/user.interface';

// Login, Register, ChekStatus
export interface AuthResponse {
  user: User;
  token: string;
}
