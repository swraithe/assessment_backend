import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.resolve(__dirname, '../../data.json');

export async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function writeDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
} 