# AIDONIC Backend Technical Assessment

## Overview

Create a RESTful API using TypeScript and Node.js to serve data for the dashboard visualizations. The API should follow clean architecture principles and implement proper error handling and type safety.

## API Endpoints

### Authentication

```typescript
POST /api/auth/login
{
  "email": string,
  "password": string
}
```

### Dashboard Data

#### 1. Income/Expenses Data

```typescript
GET /api/stats/monthly-data
Response:
{
  "data": [
    {
      "month": "10k",
      "income": number,
      "expenses": number
    },...
  ]
}
```

#### 2. Company Performance

```typescript
GET /api/stats/company-stats
Response:
{
  "data": [
    {
      "id": string,
      "name": string,      // GNote, Office, RCloud
      "value": number,
      "monthlyChange": number
    },...
  ]
}
```

#### 3. Developer Statistics

```typescript
GET /api/stats/developer-trends
Response:
{
  "data": [
    {
      "month": string,     // 1m, 2m, etc.
      "react": number,
      "javascript": number
    },...
  ]
}
```

#### 4. Employee Distribution

```typescript
GET /api/stats/employee-distribution
Response:
{
  "data": [
    {
      "year": number,
      "coders": number,
      "designers": number
    },...
  ]
}
```

#### 5. Product Performance

```typescript
GET /api/stats/product-performance
Response:
{
  "data": [
    {
      "id": string,
      "name": string,
      "percentage": number,
      "period": string
    },...
  ]
}
```

## Technical Requirements

### Architecture

- Implement Clean Architecture with clear separation of:
  ```
  ├── src/
  │   ├── data-access/     # Database and external services access (mocked data)
  │   ├── handlers/        # Request handlers and routes
  │   ├── libs/           # Shared utilities and helpers
  │   ├── models/         # Domain models and interfaces
  │   └── services/       # Business logic and use cases
  ```

## Implementation Requirements

### Data Validation

- Input validation using Zod or similar
- Request payload validation
- Response data validation

### Documentation

- OpenAPI/Swagger documentation
- JSDoc for all functions and classes
- README with setup instructions

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment:

```bash
cp .env.example .env
```

3. Run development server:

```bash
npm run dev
```
