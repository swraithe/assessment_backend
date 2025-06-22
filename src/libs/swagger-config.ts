export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AIDONIC Humanitarian Aid Management API',
      version: '1.0.0',
      description: 'RESTful API for managing humanitarian aid distribution and tracking',
      contact: {
        name: 'AIDONIC Team',
        email: 'support@aidonic.org',
        url: 'https://aidonic.org',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
      {
        url: 'https://api.aidonic.org',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtained from /api/auth/login',
        },
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@aidonic.org',
            },
            password: {
              type: 'string',
              description: 'User password (minimum 8 characters)',
              example: 'securePassword123',
              minLength: 8,
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT authentication token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'user-123' },
                email: { type: 'string', example: 'user@aidonic.org' },
                name: { type: 'string', example: 'John Doe' },
                role: { type: 'string', enum: ['admin', 'manager', 'volunteer'] },
                organizationId: { type: 'string', example: 'org-456' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
        MonthlyData: {
          type: 'object',
          properties: {
            month: { type: 'string', example: 'Jan' },
            income: { type: 'number', example: 45000 },
            expenses: { type: 'number', example: 32000 },
          },
        },
        CompanyStats: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'GNote' },
            value: { type: 'number', example: 2500000 },
            monthlyChange: { type: 'number', example: 12.5 },
          },
        },
        DeveloperTrends: {
          type: 'object',
          properties: {
            month: { type: 'string', example: '1m' },
            react: { type: 'number', example: 45 },
            javascript: { type: 'number', example: 55 },
          },
        },
        EmployeeDistribution: {
          type: 'object',
          properties: {
            year: { type: 'number', example: 2024 },
            coders: { type: 'number', example: 72 },
            designers: { type: 'number', example: 28 },
          },
        },
        ProductPerformance: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Product A' },
            percentage: { type: 'number', example: 85 },
            period: { type: 'string', example: 'Q1 2024' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Invalid credentials' },
            statusCode: { type: 'number', example: 401 },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints',
      },
      {
        name: 'Statistics',
        description: 'Dashboard statistics and analytics endpoints',
      },
    ],
  },
  apis: ['./src/handlers/*.ts', './src/models/*.ts'],
}; 