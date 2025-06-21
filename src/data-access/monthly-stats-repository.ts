import { readDB } from './json-db';
import { MonthlyData } from '@/models/stats';

export class MonthlyStatsRepository {
  static async getAll(): Promise<MonthlyData[]> {
    const db = await readDB();
    return db.monthlyData || [];
  }
} 