# AIDONIC Backend - Humanitarian Aid Management System

A comprehensive RESTful API backend for managing humanitarian aid distribution and tracking, built with TypeScript, Node.js, and AWS services following Clean Architecture principles.

## 🏗️ Architecture

This backend follows Clean Architecture principles with clear separation of concerns:

```
src/
├── data-access/     # Database and external services access
├── handlers/        # Request handlers and routes
├── libs/           # Shared utilities and helpers
├── models/         # Domain models and interfaces
└── services/       # Business logic and use cases
```

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Dashboard Statistics**: Comprehensive API endpoints for dashboard data
- **Data Validation**: Input validation using Zod schemas
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Logging**: Structured logging with Winston
- **API Documentation**: OpenAPI/Swagger documentation
- **Testing**: Unit tests with Jest
- **Type Safety**: Full TypeScript implementation
- **AWS Integration**: DynamoDB for data storage
- **Security**: Helmet, CORS, rate limiting

## 📋 Prerequisites

- Node.js 18+
- TypeScript 5.0+
- AWS Account (for DynamoDB)
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AIDONIC_BE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # AWS Configuration
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   DYNAMODB_TABLE_PREFIX=aidonic_

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h

   # Database Configuration
   DYNAMODB_ENDPOINT=http://localhost:8000

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000

   # Logging
   LOG_LEVEL=info
   ```

4. **Set up DynamoDB (Local Development)**
   
   For local development, you can use DynamoDB Local:
   ```bash
   docker run -p 8000:8000 amazon/dynamodb-local
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
```
http://localhost:3001/api-docs
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Login Endpoint
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate user and get JWT token
- `GET /api/auth/me` - Get current user information
- `POST /api/auth/refresh` - Refresh JWT token

### Dashboard Statistics
- `GET /api/stats/monthly-data` - Get monthly income/expenses data
- `GET /api/stats/company-stats` - Get company performance statistics
- `GET /api/stats/developer-trends` - Get developer trends data
- `GET /api/stats/employee-distribution` - Get employee distribution data
- `GET /api/stats/product-performance` - Get product performance data
- `GET /api/stats/all` - Get all dashboard statistics

### Health Check
- `GET /health` - Server health check

## 🧪 Testing

The project includes comprehensive unit tests for business logic:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- auth-service.test.ts

# Run tests with coverage report
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── data-access/
│   ├── dynamodb.ts           # DynamoDB client and utilities
│   └── user-repository.ts    # User data access layer
├── handlers/
│   ├── auth-routes.ts        # Authentication routes
│   └── stats-routes.ts       # Statistics routes
├── libs/
│   ├── auth-middleware.ts    # Authentication middleware
│   ├── error-handler.ts      # Error handling utilities
│   ├── logger.ts             # Logging configuration
│   ├── swagger-config.ts     # Swagger documentation config
│   └── test-setup.ts         # Test configuration
├── models/
│   ├── stats.ts              # Statistics domain models
│   └── user.ts               # User domain models
├── services/
│   ├── auth-service.ts       # Authentication business logic
│   ├── stats-service.ts      # Statistics business logic
│   └── __tests__/            # Unit tests
└── index.ts                  # Application entry point
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `AWS_REGION` | AWS region | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | AWS access key | - |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | - |
| `DYNAMODB_TABLE_PREFIX` | DynamoDB table prefix | `aidonic_` |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration | `24h` |
| `DYNAMODB_ENDPOINT` | DynamoDB endpoint | - |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Rate limit max requests | `100` |
| `CORS_ORIGIN` | CORS origin | `http://localhost:3000` |
| `LOG_LEVEL` | Log level | `info` |

## 🚀 Deployment

### AWS Lambda Deployment

This backend is designed to be deployed to AWS Lambda with API Gateway. The architecture supports serverless deployment patterns.

### Docker Deployment

```bash
# Build Docker image
docker build -t aidonic-backend .

# Run container
docker run -p 3001:3001 aidonic-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions, please contact the AIDONIC team at support@aidonic.org.

## 🔄 Version History

- **v1.0.0** - Initial release with authentication and dashboard statistics
- Clean Architecture implementation
- JWT authentication
- Comprehensive API documentation
- Unit testing setup
- AWS DynamoDB integration
