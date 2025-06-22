import { StatsService } from '../stats-service';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../../data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

describe('StatsService', () => {
  describe('getMonthlyData', () => {
    it('should return monthly data', async () => {
      const result = await StatsService.getMonthlyData();

      expect(result).toEqual(data.monthlyData);
      expect(result).toHaveLength(12);
      expect(result[0]).toHaveProperty('month');
      expect(result[0]).toHaveProperty('income');
      expect(result[0]).toHaveProperty('expenses');
    });
  });

  describe('getCompanyStats', () => {
    it('should return company statistics', async () => {
      const result = await StatsService.getCompanyStats();

      expect(result).toEqual(data.companyStats);
      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('value');
      expect(result[0]).toHaveProperty('monthlyChange');
    });
  });

  describe('getDeveloperTrends', () => {
    it('should return developer trends data', async () => {
      const result = await StatsService.getDeveloperTrends();

      expect(result).toEqual(data.developerTrends);
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty('month');
      expect(result[0]).toHaveProperty('react');
      expect(result[0]).toHaveProperty('javascript');
    });
  });

  describe('getEmployeeDistribution', () => {
    it('should return employee distribution data', async () => {
      const result = await StatsService.getEmployeeDistribution();

      expect(result).toEqual(data.employeeDistribution);
      expect(result).toHaveLength(5);
      expect(result[0]).toHaveProperty('year');
      expect(result[0]).toHaveProperty('coders');
      expect(result[0]).toHaveProperty('designers');
    });
  });

  describe('getProductPerformance', () => {
    it('should return product performance data', async () => {
      const result = await StatsService.getProductPerformance();

      expect(result).toEqual(data.productPerformance);
      expect(result).toHaveLength(4);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('percentage');
      expect(result[0]).toHaveProperty('period');
    });
  });

  describe('getAllStats', () => {
    it('should return all dashboard statistics', async () => {
      const result = await StatsService.getAllStats();

      expect(result).toHaveProperty('monthlyData');
      expect(result).toHaveProperty('companyStats');
      expect(result).toHaveProperty('developerTrends');
      expect(result).toHaveProperty('employeeDistribution');
      expect(result).toHaveProperty('productPerformance');

      expect(result.monthlyData).toEqual(data.monthlyData);
      expect(result.companyStats).toEqual(data.companyStats);
      expect(result.developerTrends).toEqual(data.developerTrends);
      expect(result.employeeDistribution).toEqual(data.employeeDistribution);
      expect(result.productPerformance).toEqual(data.productPerformance);
    });
  });
}); 