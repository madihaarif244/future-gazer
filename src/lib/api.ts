
import { StockData, StockPrediction, TimeRange, PredictionPeriod } from './types';

// Mock data for frontend development
// In a real app, these would be API calls to a backend service

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function searchStocks(query: string): Promise<string[]> {
  await delay(500);
  
  const stockSymbols = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'JPM', 'V'
  ];
  
  return stockSymbols.filter(symbol => 
    symbol.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getStockData(symbol: string): Promise<StockData> {
  await delay(800);
  
  // Mock data
  const stocks: Record<string, StockData> = {
    'AAPL': {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      price: 187.68,
      change: 1.43,
      changePercent: 0.77,
      previousClose: 186.25,
      open: 186.75,
      dayLow: 185.82,
      dayHigh: 189.34,
      volume: 52348670,
      marketCap: 2918000000000
    },
    'MSFT': {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      price: 420.21,
      change: 2.28,
      changePercent: 0.55,
      previousClose: 417.93,
      open: 418.50,
      dayLow: 417.22,
      dayHigh: 422.43,
      volume: 22543900,
      marketCap: 3120000000000
    },
    'GOOGL': {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      price: 159.92,
      change: -0.78,
      changePercent: -0.49,
      previousClose: 160.70,
      open: 160.80,
      dayLow: 159.11,
      dayHigh: 161.23,
      volume: 18762300,
      marketCap: 1980000000000
    },
    'AMZN': {
      symbol: 'AMZN',
      companyName: 'Amazon.com, Inc.',
      price: 178.62,
      change: 0.87,
      changePercent: 0.49,
      previousClose: 177.75,
      open: 177.92,
      dayLow: 177.28,
      dayHigh: 179.43,
      volume: 29475600,
      marketCap: 1860000000000
    },
    'TSLA': {
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      price: 178.21,
      change: -4.57,
      changePercent: -2.50,
      previousClose: 182.78,
      open: 181.95,
      dayLow: 177.56,
      dayHigh: 183.42,
      volume: 88964200,
      marketCap: 567000000000
    }
  };
  
  return stocks[symbol] || {
    symbol,
    companyName: `${symbol} Inc.`,
    price: 100 + Math.random() * 100,
    change: (Math.random() * 10) - 5,
    changePercent: (Math.random() * 5) - 2.5,
    previousClose: 100 + Math.random() * 100,
    open: 100 + Math.random() * 100,
    dayLow: 90 + Math.random() * 100,
    dayHigh: 110 + Math.random() * 100,
    volume: Math.floor(Math.random() * 100000000),
    marketCap: Math.floor(Math.random() * 1000000000000)
  };
}

export async function getStockPrediction(
  symbol: string, 
  timeRange: TimeRange = '1y',
  predictionPeriod: PredictionPeriod = '30d'
): Promise<StockPrediction> {
  await delay(1500);
  
  // Generate mock historical data
  const daysCount = {
    '1w': 7,
    '1m': 30,
    '3m': 90,
    '6m': 180,
    '1y': 365,
    '5y': 1825
  }[timeRange];
  
  const predictionDays = {
    '7d': 7,
    '30d': 30,
    '90d': 90
  }[predictionPeriod];
  
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysCount);
  
  // Mock base price and volatility based on symbol
  let basePrice = 100;
  let volatility = 2;
  
  if (symbol === 'AAPL') {
    basePrice = 150;
    volatility = 3;
  } else if (symbol === 'MSFT') {
    basePrice = 400;
    volatility = 5;
  } else if (symbol === 'GOOGL') {
    basePrice = 140;
    volatility = 4;
  } else if (symbol === 'TSLA') {
    basePrice = 180;
    volatility = 10;
  }
  
  // Generate historical data
  const historical: any[] = [];
  let currentDate = new Date(startDate);
  let currentPrice = basePrice;
  
  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Skip weekends
      const dailyChange = (Math.random() - 0.48) * volatility;
      currentPrice = Math.max(currentPrice + dailyChange, 1);
      
      historical.push({
        date: currentDate.toISOString().split('T')[0],
        open: currentPrice - (Math.random() * volatility * 0.5),
        close: currentPrice,
        high: currentPrice + (Math.random() * volatility * 0.5),
        low: currentPrice - (Math.random() * volatility * 0.8),
        volume: Math.floor(Math.random() * 10000000)
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Generate prediction data with a slight upward trend
  const prediction: any[] = [];
  currentDate = new Date(endDate);
  currentPrice = historical[historical.length - 1].close;
  
  for (let i = 0; i < predictionDays; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Skip weekends
      const trend = 0.1; // Slight upward trend
      const dailyChange = (Math.random() - 0.45 + trend) * volatility;
      currentPrice = Math.max(currentPrice + dailyChange, 1);
      
      const uncertainty = volatility * (1 + (i * 0.05)); // Uncertainty increases with time
      
      prediction.push({
        date: currentDate.toISOString().split('T')[0],
        yhat: currentPrice,
        yhat_lower: currentPrice - uncertainty,
        yhat_upper: currentPrice + uncertainty
      });
    }
  }
  
  return {
    historical,
    prediction,
    symbol,
    companyName: `${symbol} Inc.`
  };
}
