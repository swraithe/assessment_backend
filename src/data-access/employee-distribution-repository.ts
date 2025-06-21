import { readDB } from './json-db';
import { EmployeeDistribution } from '@/models/stats';

export class EmployeeDistributionRepository {
  static async getAll(): Promise<EmployeeDistribution[]> {
    const db = await readDB();
    return db.employeeDistribution || [];
  }
} 