
import { 
  StockData, 
  StockPrediction, 
  TimeRange, 
  PredictionPeriod,
  AlphaVantageQuoteResponse,
  AlphaVantageSearchResponse,
  AlphaVantageTimeSeriesResponse,
  StockSearchResult,
  HistoricalDataPoint,
  PredictionDataPoint
} from './types';

// Alpha Vantage API key - Free tier with 5 calls per minute, 500 per day
// In a real app, you would store this in environment variables
// Note: Users should replace this with their own Alpha Vantage API key
const API_KEY = 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchStockSymbols(query: string): Promise<StockSearchResult[]> {
  try {
    if (!query.trim()) return [];
    
    const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json() as AlphaVantageSearchResponse;
    
    if (!data.bestMatches) {
      console.warn('No search results returned from API');
      return [];
    }
    
    return data.bestMatches.map(match => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region']
    }));
  } catch (error) {
    console.error('Error fetching stock symbols:', error);
    return [];
  }
}

export async function fetchStockQuote(symbol: string): Promise<StockData | null> {
  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json() as AlphaVantageQuoteResponse;
    const quote = data['Global Quote'];
    
    if (!quote || !quote['01. symbol']) {
      console.warn('No quote data returned from API');
      return null;
    }
    
    // Extract change percentage from string like "1.23%"
    const changePercentStr = quote['10. change percent'];
    const changePercent = parseFloat(changePercentStr.replace('%', ''));
    
    // Calculate market cap (this is a rough estimate as API doesn't provide this directly)
    // In a real app, you would fetch this from another endpoint or service
    const price = parseFloat(quote['05. price']);
    const estimatedShares = 1000000000; // Placeholder
    const marketCap = price * estimatedShares;
    
    return {
      symbol: quote['01. symbol'],
      companyName: `${quote['01. symbol']} Inc.`, // API doesn't provide company name in quote endpoint
      price: price,
      change: parseFloat(quote['09. change']),
      changePercent: changePercent,
      previousClose: parseFloat(quote['08. previous close']),
      open: parseFloat(quote['02. open']),
      dayLow: parseFloat(quote['04. low']),
      dayHigh: parseFloat(quote['03. high']),
      volume: parseInt(quote['06. volume']),
      marketCap: marketCap
    };
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return null;
  }
}

export async function fetchHistoricalData(symbol: string, timeRange: TimeRange): Promise<HistoricalDataPoint[]> {
  try {
    // For time ranges, we use the daily API endpoint with different output sizes
    const outputSize = timeRange === '5y' ? 'full' : 'compact';
    const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(symbol)}&outputsize=${outputSize}&apikey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json() as AlphaVantageTimeSeriesResponse;
    const timeSeries = data['Time Series (Daily)'];
    
    if (!timeSeries) {
      console.warn('No historical data returned from API');
      return [];
    }
    
    // Convert time series object to array of data points
    const dataPoints: HistoricalDataPoint[] = Object.entries(timeSeries).map(([date, values]) => ({
      date: date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'])
    }));
    
    // Sort by date ascending
    dataPoints.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Filter based on time range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '1w':
        startDate.setDate(now.getDate() - 7);
        break;
      case '1m':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3m':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case '5y':
        startDate.setFullYear(now.getFullYear() - 5);
        break;
    }
    
    return dataPoints.filter(point => new Date(point.date) >= startDate);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
}

// Generate AI predictions based on historical data
// Note: In a real app, this would be done by a proper machine learning model
export function generatePredictions(
  historicalData: HistoricalDataPoint[],
  predictionPeriod: PredictionPeriod
): PredictionDataPoint[] {
  if (historicalData.length === 0) return [];
  
  const lastClose = historicalData[historicalData.length - 1].close;
  const predictions: PredictionDataPoint[] = [];
  
  // Calculate simple moving average and standard deviation
  const recentPrices = historicalData.slice(-30).map(d => d.close);
  const avgChange = recentPrices.slice(1).reduce(
    (sum, price, i) => sum + (price - recentPrices[i]) / price, 
    0
  ) / (recentPrices.length - 1);
  
  // Calculate volatility from historical data
  const returns = recentPrices.slice(1).map((price, i) => 
    (price - recentPrices[i]) / recentPrices[i]
  );
  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const squaredDiffs = returns.map(ret => Math.pow(ret - avgReturn, 2));
  const variance = squaredDiffs.reduce((sum, sqDiff) => sum + sqDiff, 0) / squaredDiffs.length;
  const volatility = Math.sqrt(variance);
  
  const daysToPredict = predictionPeriod === '7d' ? 7 : predictionPeriod === '30d' ? 30 : 90;
  const lastDate = new Date(historicalData[historicalData.length - 1].date);
  
  for (let i = 1; i <= daysToPredict; i++) {
    const predictedDate = new Date(lastDate);
    predictedDate.setDate(predictedDate.getDate() + i);
    
    // Skip weekends
    if (predictedDate.getDay() === 0 || predictedDate.getDay() === 6) {
      continue;
    }
    
    // Simple model: current price * (1 + average change) with increasing uncertainty over time
    const trendFactor = 1 + (avgChange * i * 0.1);
    const predictedValue = lastClose * trendFactor;
    
    // Uncertainty increases with time
    const uncertaintyFactor = volatility * Math.sqrt(i);
    const lowerBound = predictedValue * (1 - uncertaintyFactor);
    const upperBound = predictedValue * (1 + uncertaintyFactor);
    
    predictions.push({
      date: predictedDate.toISOString().split('T')[0],
      yhat: predictedValue,
      yhat_lower: lowerBound,
      yhat_upper: upperBound
    });
  }
  
  return predictions;
}
