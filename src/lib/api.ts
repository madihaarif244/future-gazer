
import { 
  StockData, 
  StockPrediction, 
  TimeRange, 
  PredictionPeriod,
  StockSearchResult
} from './types';

import {
  fetchStockSymbols,
  fetchStockQuote,
  fetchHistoricalData,
  generatePredictions
} from './marketDataService';

// Cache for API responses to reduce API calls (free tier limitations)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedData<T>(key: string): T | null {
  const cachedItem = cache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    return cachedItem.data as T;
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function searchStocks(query: string): Promise<string[]> {
  if (!query.trim()) return [];
  
  // Check cache first
  const cacheKey = `search_${query}`;
  const cachedResult = getCachedData<string[]>(cacheKey);
  if (cachedResult) return cachedResult;
  
  try {
    console.log('Searching for stocks with query:', query);
    const results = await fetchStockSymbols(query);
    console.log('Search results:', results);
    
    // If we got valid results from the API
    if (results && results.length > 0) {
      const symbols = results.map(result => result.symbol);
      // Cache the results
      setCachedData(cacheKey, symbols);
      return symbols;
    }
    
    // If API didn't return results, use mock data
    throw new Error("No results from API");
  } catch (error) {
    console.error('Error searching stocks:', error);
    
    // Return mock data when API fails
    const mockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'JNJ', 'V'].filter(
      sym => sym.toLowerCase().includes(query.toLowerCase())
    );
    
    // Cache the mock results
    setCachedData(cacheKey, mockSymbols);
    
    return mockSymbols;
  }
}

export async function getStockData(symbol: string): Promise<StockData> {
  if (!symbol) {
    throw new Error('Stock symbol is required');
  }
  
  // Check cache first
  const cacheKey = `quote_${symbol}`;
  const cachedResult = getCachedData<StockData>(cacheKey);
  if (cachedResult) return cachedResult;
  
  try {
    console.log('Fetching stock data for:', symbol);
    const stockData = await fetchStockQuote(symbol);
    
    if (!stockData) {
      throw new Error(`Failed to fetch data for ${symbol}`);
    }
    
    // Cache the results
    setCachedData(cacheKey, stockData);
    
    return stockData;
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    
    // Fallback to mock data if the API fails
    return {
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
}

export async function getStockPrediction(
  symbol: string, 
  timeRange: TimeRange = '1y',
  predictionPeriod: PredictionPeriod = '30d'
): Promise<StockPrediction> {
  if (!symbol) {
    throw new Error('Stock symbol is required');
  }
  
  // Check cache first
  const cacheKey = `prediction_${symbol}_${timeRange}_${predictionPeriod}`;
  const cachedResult = getCachedData<StockPrediction>(cacheKey);
  if (cachedResult) return cachedResult;
  
  try {
    console.log('Fetching prediction for:', symbol, timeRange, predictionPeriod);
    // Fetch historical data
    const historical = await fetchHistoricalData(symbol, timeRange);
    
    if (historical.length === 0) {
      throw new Error(`No historical data available for ${symbol}`);
    }
    
    // Generate predictions
    const prediction = generatePredictions(historical, predictionPeriod);
    
    // Get company name (for display purposes)
    const stockInfo = await getStockData(symbol);
    const companyName = stockInfo.companyName;
    
    const result = {
      historical,
      prediction,
      symbol,
      companyName
    };
    
    // Cache the results
    setCachedData(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error(`Error fetching prediction for ${symbol}:`, error);
    
    // If there's an error, fall back to mock data
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
}
