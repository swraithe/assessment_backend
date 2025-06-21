import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { readDB, writeDB } from './json-db';
import { User, CreateUserRequest, UpdateUserRequest, UserResponse } from '@/models/user';
import { logger } from '@/libs/logger';

export class UserRepository {
  /**
   * Register a new user (with hashed password)
   */
  static async createUser(userData: CreateUserRequest): Promise<User> {
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const now = new Date().toISOString();
    const user: User = {
      id: userId,
      email: userData.email.toLowerCase(),
      name: userData.name,
      password: hashedPassword,
      role: userData.role,
      createdAt: now,
      updatedAt: now,
    };
    const db = await readDB();
    db.users.push(user);
    await writeDB(db);
    logger.info(`User created: ${userId}`);
    return user;
  }

  /**
   * Find user by email
   */
  static async findByEmail(email: string): Promise<User | null> {
    const db = await readDB();
    const user = db.users.find((u: User) => u.email === email.toLowerCase());
    return user || null;
  }

  /**
   * Find user by ID
   */
  static async findById(userId: string): Promise<User | null> {
    const db = await readDB();
    const user = db.users.find((u: User) => u.id === userId);
    return user || null;
  }

  /**
   * Update user (not implemented in this example)
   */
  static async updateUser(userId: string, updateData: UpdateUserRequest): Promise<User | null> {
    // Implement as needed
    return null;
  }

  /**
   * Delete user (not implemented in this example)
   */
  static async deleteUser(userId: string): Promise<boolean> {
    // Implement as needed
    return false;
  }

  /**
   * Verify user password
   */
  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return password === user.password;
    // return bcrypt.compare(password, user.password);
  }

  /**
   * Convert User to UserResponse (without password)
   */
  static toUserResponse(user: User): UserResponse {
    const { password, ...userResponse } = user;
    return userResponse;
  }
} 