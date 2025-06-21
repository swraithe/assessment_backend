import { readDB } from './json-db';
import { CompanyStats } from '@/models/stats';

export class CompanyStatsRepository {
  static async getAll(): Promise<CompanyStats[]> {
    const db = await readDB();
    return db.companyStats || [];
  }
} 