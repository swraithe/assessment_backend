import { Router, Request, Response } from 'express';
import { StatsService } from '@/services/stats-service';
import { asyncHandler } from '@/libs/error-handler';
import { authenticateToken } from '@/libs/auth-middleware';
import { NormalsChartRepository } from '@/data-access/normals-chart-repository';

const router = Router();

/**
 * @swagger
 * /api/stats/monthly-data:
 *   get:
 *     summary: Get monthly income/expenses data
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MonthlyData'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/monthly-data', authenticateToken, asyncHandler(async (_req: Request, res: Response) => {
  const data = await StatsService.getMonthlyData();
  res.status(200).json({ data });
}));

/**
 * @swagger
 * /api/stats/company-stats:
 *   get:
 *     summary: Get company performance statistics
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CompanyStats'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/company-stats', authenticateToken, asyncHandler(async (_req: Request, res: Response) => {
  const data = await StatsService.getCompanyStats();
  res.status(200).json({ data });
}));

/**
 * @swagger
 * /api/stats/developer-trends:
 *   get:
 *     summary: Get developer trends data
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Developer trends retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DeveloperTrends'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/developer-trends', authenticateToken, asyncHandler(async (_req: Request, res: Response) => {
  const data = await StatsService.getDeveloperTrends();
  res.status(200).json({ data });
}));

/**
 * @swagger
 * /api/stats/employee-distribution:
 *   get:
 *     summary: Get employee distribution data
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee distribution retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeDistribution'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/employee-distribution', authenticateToken, asyncHandler(async (_req: Request, res: Response) => {
  const data = await StatsService.getEmployeeDistribution();
  res.status(200).json({ data });
}));

/**
 * @swagger
 * /api/stats/product-performance:
 *   get:
 *     summary: Get product performance data
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product performance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductPerformance'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/product-performance', authenticateToken, asyncHandler(async (_req: Request, res: Response) => {
  const data = await StatsService.getProductPerformance();
  res.status(200).json({ data });
}));

/**
 * @swagger
 * /api/stats/all:
 *   get:
 *     summary: Get all dashboard statistics
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 monthlyData:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MonthlyData'
 *                 companyStats:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CompanyStats'
 *                 developerTrends:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DeveloperTrends'
 *                 employeeDistribution:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeDistribution'
 *                 productPerformance:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductPerformance'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/all', authenticateToken, asyncHandler(async (_req: Request, res: Response) => {
  const allStats = await StatsService.getAllStats();
  res.status(200).json(allStats);
}));

/**
 * @swagger
 * /api/stats/normals-chart:
 *   get:
 *     summary: Get normals chart data
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Normals chart data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NormalsChart'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/normals-chart', authenticateToken, asyncHandler(async (_req: Request, res: Response) => {
  const data = await NormalsChartRepository.getAll();
  res.status(200).json({ data });
}));

export { router as statsRoutes }; 