import { Router, Request, Response } from 'express';
import { AuthService } from '@/services/auth-service';
import { UserRepository } from '@/data-access/user-repository';
import { createUserSchema, loginSchema } from '@/models/user';
import { asyncHandler, CustomError } from '@/libs/error-handler';
import { authenticateToken } from '@/libs/auth-middleware';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createUserSchema.parse(req.body);
  // Check if user already exists
  const existing = await UserRepository.findByEmail(validatedData.email);
  if (existing) {
    throw new CustomError('Email already registered', 409);
  }
  const user = await UserRepository.createUser(validatedData);
  res.status(201).json({ user: UserRepository.toUserResponse(user) });
}));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and get JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);
  const authResponse = await AuthService.login(validatedData);
  res.status(200).json(authResponse);
}));

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/me', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token required' });
    return;
  }
  const user = await AuthService.getCurrentUser(token);
  res.status(200).json({ ...user });
}));

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.post('/refresh', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token required' });
    return;
  }
  const authResponse = await AuthService.refreshToken(token);
  res.status(200).json(authResponse);
}));

export { router as authRoutes }; 