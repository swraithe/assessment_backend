import { readDB } from './json-db';
import { NormalsChart } from '../models/stats';

export class NormalsChartRepository {
  static async getAll(): Promise<NormalsChart[]> {
    const db = await readDB();
    return db.normalsChart || [];
  }
} 