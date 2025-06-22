import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const REGION = process.env.AWS_REGION || 'eu-west-1';
const ENDPOINT = process.env.DYNAMODB_ENDPOINT;
const TABLE_PREFIX = process.env.DYNAMODB_TABLE_PREFIX || 'aidonic_prod_';

const client = new DynamoDBClient({
  region: REGION,
  ...(ENDPOINT ? { endpoint: ENDPOINT } : {}),
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLES = {
  USERS: `${TABLE_PREFIX}users`,
  MONTHLY_STATS: `${TABLE_PREFIX}monthly_stats`,
  COMPANY_STATS: `${TABLE_PREFIX}company_stats`,
  DEVELOPER_TRENDS: `${TABLE_PREFIX}developer_trends`,
  EMPLOYEE_DISTRIBUTION: `${TABLE_PREFIX}employee_distribution`,
  PRODUCT_PERFORMANCE: `${TABLE_PREFIX}product_performance`,
  NORMALS_CHART: `${TABLE_PREFIX}normals_chart`,
};

async function seed() {
  const dataPath = path.join(__dirname, '../data.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(raw);

  // Users: hash passwords before inserting
  if (data.users) {
    for (const user of data.users) {
      const passwordHash = await bcrypt.hash(user.password, 12);
      const item = {
        ...user,
        password: passwordHash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await ddbDocClient.send(new PutCommand({
        TableName: TABLES.USERS,
        Item: item,
      }));
      console.log(`Seeded user: ${user.email}`);
    }
  }

  // Monthly Stats
  if (data.monthlyData) {
    for (const item of data.monthlyData) {
      await ddbDocClient.send(new PutCommand({
        TableName: TABLES.MONTHLY_STATS,
        Item: item,
      }));
      console.log(`Seeded monthlyData: ${item.month}`);
    }
  }

  // Company Stats
  if (data.companyStats) {
    for (const item of data.companyStats) {
      await ddbDocClient.send(new PutCommand({
        TableName: TABLES.COMPANY_STATS,
        Item: item,
      }));
      console.log(`Seeded companyStats: ${item.id}`);
    }
  }

  // Developer Trends
  if (data.developerTrends) {
    for (const item of data.developerTrends) {
      await ddbDocClient.send(new PutCommand({
        TableName: TABLES.DEVELOPER_TRENDS,
        Item: item,
      }));
      console.log(`Seeded developerTrends: ${item.month}`);
    }
  }

  // Employee Distribution
  if (data.employeeDistribution) {
    let recordId = 1;
    for (const item of data.employeeDistribution) {
      await ddbDocClient.send(new PutCommand({
        TableName: TABLES.EMPLOYEE_DISTRIBUTION,
        Item: { ...item, recordId: String(recordId++) },
      }));
      console.log(`Seeded employeeDistribution: ${item.year}`);
    }
  }

  // Product Performance
  if (data.productPerformance) {
    for (const item of data.productPerformance) {
      await ddbDocClient.send(new PutCommand({
        TableName: TABLES.PRODUCT_PERFORMANCE,
        Item: item,
      }));
      console.log(`Seeded productPerformance: ${item.id}`);
    }
  }

  // Normals Chart
  if (data.normalsChart) {
    for (const item of data.normalsChart) {
      await ddbDocClient.send(new PutCommand({
        TableName: TABLES.NORMALS_CHART,
        Item: item,
      }));
      console.log(`Seeded normalsChart: ${item.month}`);
    }
  }

  console.log('✅ Seeding complete!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
}); 