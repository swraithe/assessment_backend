import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/auth-service';
import { CustomError } from './error-handler';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Middleware to authenticate JWT token
 */
export const authenticateToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new CustomError('Access token required', 401);
    }

    // Verify token and get user data
    const decoded = AuthService.verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to check if user has required role
 */
export const requireRole = (requiredRole: string) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new CustomError('Authentication required', 401);
      }

      if (req.user.role !== requiredRole) {
        throw new CustomError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to check if user has any of the required roles
 */
export const requireAnyRole = (requiredRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new CustomError('Authentication required', 401);
      }

      if (!requiredRoles.includes(req.user.role)) {
        throw new CustomError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = AuthService.verifyToken(token);
      req.user = decoded;
    }

    next();
  } catch (error) {
    // Don't fail on token errors, just continue without user
    next();
  }
}; 