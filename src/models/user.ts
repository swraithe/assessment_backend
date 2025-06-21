import { z } from 'zod';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// User role enum
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

// User creation interface
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

// User update interface
export interface UpdateUserRequest {
  name?: string;
  role?: UserRole;
}

// User response interface (without password)
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// Zod validation schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.nativeEnum(UserRole),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Type exports
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>; 