import { readDB } from './json-db';
import { ProductPerformance } from '@/models/stats';

export class ProductPerformanceRepository {
  static async getAll(): Promise<ProductPerformance[]> {
    const db = await readDB();
    return db.productPerformance || [];
  }
} 