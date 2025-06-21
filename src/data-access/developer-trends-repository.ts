import { readDB } from './json-db';
import { DeveloperTrends } from '@/models/stats';

export class DeveloperTrendsRepository {
  static async getAll(): Promise<DeveloperTrends[]> {
    const db = await readDB();
    return db.developerTrends || [];
  }
} 