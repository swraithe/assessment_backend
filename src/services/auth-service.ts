import jwt from 'jsonwebtoken';
import { UserRepository } from '@/data-access/user-repository';
import { LoginInput, UserResponse } from '@/models/user';
import { CustomError } from '@/libs/error-handler';
import { logger } from '@/libs/logger';

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export class AuthService {
  /**
   * Authenticate user and generate JWT token
   */
  static async login(loginData: LoginInput): Promise<AuthResponse> {
    try {
      // Find user by email
      // console.log('loginData', loginData);
      const user = await UserRepository.findByEmail(loginData.email);
      if (!user) {
        throw new CustomError('Invalid email or password', 401);
      }

      // Verify password
      const isPasswordValid = await UserRepository.verifyPassword(user, loginData.password);
      if (!isPasswordValid) {
        throw new CustomError('Invalid email or password', 401);
      }

      // Generate JWT token
      const token = this.generateToken(user);

      // Convert user to response format (without password)
      const userResponse = UserRepository.toUserResponse(user);

      logger.info(`User logged in: ${user.email}`);

      return {
        token,
        user: userResponse,
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Generate JWT token for user
   */
  static generateToken(user: any): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    };

    const secret = process.env['JWT_SECRET'];
    if (!secret) {
      throw new CustomError('JWT secret not configured', 500);
    }

    const expiresIn = process.env['JWT_EXPIRES_IN'] || '24h';

    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }

  /**
   * Verify JWT token and return user data
   */
  static verifyToken(token: string): any {
    try {
      const secret = process.env['JWT_SECRET'];
      if (!secret) {
        throw new CustomError('JWT secret not configured', 500);
      }

      return jwt.verify(token, secret);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new CustomError('Invalid token', 401);
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new CustomError('Token expired', 401);
      }
      throw error;
    }
  }

  /**
   * Get current user from token
   */
  static async getCurrentUser(token: string): Promise<UserResponse> {
    try {
      const decoded = this.verifyToken(token);
      const user = await UserRepository.findById(decoded.userId);
      
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      return UserRepository.toUserResponse(user);
    } catch (error) {
      logger.error('Get current user error:', error);
      throw error;
    }
  }

  /**
   * Refresh user token
   */
  static async refreshToken(token: string): Promise<AuthResponse> {
    try {
      const decoded = this.verifyToken(token);
      const user = await UserRepository.findById(decoded.userId);
      
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      const newToken = this.generateToken(user);
      const userResponse = UserRepository.toUserResponse(user);

      logger.info(`Token refreshed for user: ${user.email}`);

      return {
        token: newToken,
        user: userResponse,
      };
    } catch (error) {
      logger.error('Refresh token error:', error);
      throw error;
    }
  }
} 