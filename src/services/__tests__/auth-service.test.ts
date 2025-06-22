import { AuthService } from '../auth-service';
import { UserRepository } from '../../data-access/user-repository';
import { CustomError } from '../../libs/error-handler';
import { UserRole } from '../../models/user';

// Mock dependencies
jest.mock('@/data-access/user-repository');
jest.mock('@/libs/logger');

const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedPassword',
      role: UserRole.ADMIN,
      organizationId: 'org-123',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should successfully authenticate user and return token', async () => {
      // Mock user repository methods
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockUserRepository.verifyPassword.mockResolvedValue(true);
      mockUserRepository.toUserResponse.mockReturnValue({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        organizationId: mockUser.organizationId,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });

      // Mock JWT secret
      process.env.JWT_SECRET = 'test-secret';

      const result = await AuthService.login(loginData);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe(loginData.email);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginData.email);
      expect(mockUserRepository.verifyPassword).toHaveBeenCalledWith(mockUser, loginData.password);
    });

    it('should throw error for invalid email', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(AuthService.login(loginData)).rejects.toThrow(CustomError);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginData.email);
    });

    it('should throw error for invalid password', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockUserRepository.verifyPassword.mockResolvedValue(false);

      await expect(AuthService.login(loginData)).rejects.toThrow(CustomError);
      expect(mockUserRepository.verifyPassword).toHaveBeenCalledWith(mockUser, loginData.password);
    });
  });

  describe('generateToken', () => {
    it('should generate JWT token', () => {
      const user = {
        id: 'user-123',
        email: 'test@example.com',
        role: UserRole.ADMIN,
        organizationId: 'org-123',
      };

      process.env.JWT_SECRET = 'test-secret';

      const token = AuthService.generateToken(user);

      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should throw error when JWT secret is not configured', () => {
      delete process.env.JWT_SECRET;

      const user = {
        id: 'user-123',
        email: 'test@example.com',
        role: UserRole.ADMIN,
        organizationId: 'org-123',
      };

      expect(() => AuthService.generateToken(user)).toThrow(CustomError);
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token', () => {
      const user = {
        id: 'user-123',
        email: 'test@example.com',
        role: UserRole.ADMIN,
        organizationId: 'org-123',
      };

      process.env.JWT_SECRET = 'test-secret';
      const token = AuthService.generateToken(user);

      const decoded = AuthService.verifyToken(token);

      expect(decoded.userId).toBe(user.id);
      expect(decoded.email).toBe(user.email);
      expect(decoded.role).toBe(user.role);
    });

    it('should throw error for invalid token', () => {
      process.env.JWT_SECRET = 'test-secret';

      expect(() => AuthService.verifyToken('invalid-token')).toThrow(CustomError);
    });

    it('should throw error when JWT secret is not configured', () => {
      delete process.env.JWT_SECRET;

      expect(() => AuthService.verifyToken('any-token')).toThrow(CustomError);
    });
  });
}); 