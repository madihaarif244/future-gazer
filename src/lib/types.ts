
export interface StockData {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  dayLow: number;
  dayHigh: number;
  volume: number;
  marketCap: number;
}

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PredictionDataPoint {
  date: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
}

export interface StockPrediction {
  historical: HistoricalDataPoint[];
  prediction: PredictionDataPoint[];
  symbol: string;
  companyName: string;
}

export type TimeRange = '1w' | '1m' | '3m' | '6m' | '1y' | '5y';
export type PredictionPeriod = '7d' | '30d' | '90d';
