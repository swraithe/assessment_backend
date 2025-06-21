import {
  MonthlyData,
  CompanyStats,
  DeveloperTrends,
  EmployeeDistribution,
  ProductPerformance,
} from '@/models/stats';
import { logger } from '@/libs/logger';
import { MonthlyStatsRepository } from '@/data-access/monthly-stats-repository';
import { CompanyStatsRepository } from '@/data-access/company-stats-repository';
import { DeveloperTrendsRepository } from '@/data-access/developer-trends-repository';
import { EmployeeDistributionRepository } from '@/data-access/employee-distribution-repository';
import { ProductPerformanceRepository } from '@/data-access/product-performance-repository';

export class StatsService {
  /**
   * Get monthly income/expenses data
   */
  static async getMonthlyData(): Promise<MonthlyData[]> {
    try {
      logger.info('Fetching monthly data');
      return MonthlyStatsRepository.getAll();
    } catch (error) {
      logger.error('Error fetching monthly data:', error);
      throw error;
    }
  }

  /**
   * Get company performance statistics
   */
  static async getCompanyStats(): Promise<CompanyStats[]> {
    try {
      logger.info('Fetching company stats');
      return CompanyStatsRepository.getAll();
    } catch (error) {
      logger.error('Error fetching company stats:', error);
      throw error;
    }
  }

  /**
   * Get developer trends data
   */
  static async getDeveloperTrends(): Promise<DeveloperTrends[]> {
    try {
      logger.info('Fetching developer trends');
      return DeveloperTrendsRepository.getAll();
    } catch (error) {
      logger.error('Error fetching developer trends:', error);
      throw error;
    }
  }

  /**
   * Get employee distribution data
   */
  static async getEmployeeDistribution(): Promise<EmployeeDistribution[]> {
    try {
      logger.info('Fetching employee distribution');
      return EmployeeDistributionRepository.getAll();
    } catch (error) {
      logger.error('Error fetching employee distribution:', error);
      throw error;
    }
  }

  /**
   * Get product performance data
   */
  static async getProductPerformance(): Promise<ProductPerformance[]> {
    try {
      logger.info('Fetching product performance');
      return ProductPerformanceRepository.getAll();
    } catch (error) {
      logger.error('Error fetching product performance:', error);
      throw error;
    }
  }

  /**
   * Get all dashboard statistics
   */
  static async getAllStats() {
    try {
      logger.info('Fetching all dashboard statistics');
      
      const [
        monthlyData,
        companyStats,
        developerTrends,
        employeeDistribution,
        productPerformance,
      ] = await Promise.all([
        this.getMonthlyData(),
        this.getCompanyStats(),
        this.getDeveloperTrends(),
        this.getEmployeeDistribution(),
        this.getProductPerformance(),
      ]);

      return {
        monthlyData,
        companyStats,
        developerTrends,
        employeeDistribution,
        productPerformance,
      };
    } catch (error) {
      logger.error('Error fetching all stats:', error);
      throw error;
    }
  }
} 