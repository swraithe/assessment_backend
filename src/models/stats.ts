// Monthly Income/Expenses Data
export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

// Company Performance Stats
export interface CompanyStats {
  id: string;
  name: string;
  value: number;
  monthlyChange: number;
}

// Developer Trends
export interface DeveloperTrends {
  month: string;
  react: number;
  javascript: number;
}

// Employee Distribution
export interface EmployeeDistribution {
  year: number;
  coders: number;
  designers: number;
}

// Product Performance
export interface ProductPerformance {
  id: string;
  name: string;
  percentage: number;
  period: string;
}

// NormalsChart
export interface NormalsChart {
  month: string;
  expected: number;
  actual: number;
}

// API Response interfaces
export interface MonthlyDataResponse {
  data: MonthlyData[];
}

export interface CompanyStatsResponse {
  data: CompanyStats[];
}

export interface DeveloperTrendsResponse {
  data: DeveloperTrends[];
}

export interface EmployeeDistributionResponse {
  data: EmployeeDistribution[];
}

export interface ProductPerformanceResponse {
  data: ProductPerformance[];
} 