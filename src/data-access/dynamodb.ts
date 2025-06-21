// Deprecated: DynamoDB integration removed. Using json-db.ts for file-based data access.

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const REGION = process.env['AWS_REGION'] || 'eu-west-1';
const ENDPOINT = process.env['DYNAMODB_ENDPOINT'];

const client = new DynamoDBClient({
  region: REGION,
  ...(ENDPOINT ? { endpoint: ENDPOINT } : {}),
});

export const ddbDocClient = DynamoDBDocumentClient.from(client);

export const TABLE_NAMES = {
  USERS: `${process.env['DYNAMODB_TABLE_PREFIX'] || 'aidonic_prod_'}users`,
  MONTHLY_STATS: `${process.env['DYNAMODB_TABLE_PREFIX'] || 'aidonic_prod_'}monthly_stats`,
  COMPANY_STATS: `${process.env['DYNAMODB_TABLE_PREFIX'] || 'aidonic_prod_'}company_stats`,
  DEVELOPER_TRENDS: `${process.env['DYNAMODB_TABLE_PREFIX'] || 'aidonic_prod_'}developer_trends`,
  EMPLOYEE_DISTRIBUTION: `${process.env['DYNAMODB_TABLE_PREFIX'] || 'aidonic_prod_'}employee_distribution`,
  PRODUCT_PERFORMANCE: `${process.env['DYNAMODB_TABLE_PREFIX'] || 'aidonic_prod_'}product_performance`,
  NORMALS_CHART: `${process.env['DYNAMODB_TABLE_PREFIX'] || 'aidonic_prod_'}normals_chart`,
} as const; 