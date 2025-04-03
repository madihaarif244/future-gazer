
/**
 * ARIMA Model implementation for stock price prediction
 * This is a simplified version of ARIMA suitable for frontend use
 */

import { HistoricalDataPoint, PredictionDataPoint } from './types';

/**
 * Calculate the difference of a time series (for making the series stationary)
 */
function difference(data: number[], order: number = 1): number[] {
  if (order <= 0) return [...data];
  
  const diff = [];
  for (let i = 1; i < data.length; i++) {
    diff.push(data[i] - data[i - 1]);
  }
  
  return order === 1 ? diff : difference(diff, order - 1);
}

/**
 * Remove the differencing (integrate back)
 */
function integrate(diffData: number[], originalData: number[], order: number = 1): number[] {
  const result = [originalData[originalData.length - 1]];
  
  for (let i = 0; i < diffData.length; i++) {
    result.push(result[result.length - 1] + diffData[i]);
  }
  
  return result;
}

/**
 * Calculate the autocorrelation function (ACF)
 */
function autocorrelation(data: number[], lag: number): number {
  if (data.length === 0) return 0;
  
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < data.length - lag; i++) {
    numerator += (data[i] - mean) * (data[i + lag] - mean);
  }
  
  for (let i = 0; i < data.length; i++) {
    denominator += Math.pow(data[i] - mean, 2);
  }
  
  return numerator / denominator;
}

/**
 * Calculate partial autocorrelation function (PACF) using Yule-Walker equations
 */
function partialAutocorrelation(data: number[], maxLag: number): number[] {
  const pacf = [1]; // Lag 0 is always 1
  
  for (let k = 1; k <= maxLag; k++) {
    const r = [];
    for (let i = 1; i <= k; i++) {
      r.push(autocorrelation(data, i));
    }
    
    // Yule-Walker using Levinson-Durbin recursion
    const phi = new Array(k).fill(0);
    phi[0] = r[0];
    
    for (let j = 1; j < k; j++) {
      let num = r[j];
      for (let i = 0; i < j; i++) {
        num -= phi[i] * r[j - i - 1];
      }
      
      phi[j] = num;
      
      for (let i = 0; i < Math.floor(j / 2); i++) {
        const temp = phi[i];
        phi[i] = phi[j - i - 1];
        phi[j - i - 1] = temp;
      }
    }
    
    pacf.push(phi[k - 1]);
  }
  
  return pacf;
}

/**
 * Calculate optimal ARIMA order using AIC (Akaike Information Criterion)
 */
function findBestARIMAOrder(data: number[], maxP: number = 5, maxD: number = 2, maxQ: number = 5): { p: number, d: number, q: number } {
  let bestP = 0, bestD = 0, bestQ = 0;
  let bestAIC = Infinity;
  
  // Try different differencing orders
  for (let d = 0; d <= maxD; d++) {
    // Apply differencing
    const diffData = difference(data, d);
    if (diffData.length < 10) continue; // Not enough data after differencing
    
    // Calculate ACF and PACF
    const pacfValues = partialAutocorrelation(diffData, maxP);
    
    // Find p where PACF drops off
    let p = 0;
    for (let i = 1; i < pacfValues.length; i++) {
      if (Math.abs(pacfValues[i]) < 0.2) { // 0.2 is a threshold
        p = i - 1;
        break;
      }
    }
    if (p === 0) p = 1; // Default to 1 if no clear cutoff
    
    // Find q using ACF (this is simplified)
    let q = 1; // Default
    
    // Calculate AIC for this model
    const n = diffData.length;
    const k = p + q + (d > 0 ? 1 : 0);
    const sigma2 = 0.01; // This would normally be calculated from model residuals
    const aic = n * Math.log(sigma2) + 2 * k;
    
    if (aic < bestAIC) {
      bestAIC = aic;
      bestP = p;
      bestD = d;
      bestQ = q;
    }
  }
  
  return { p: bestP, d: bestD, q: bestQ };
}

/**
 * Fit AR part of the model (simplified)
 */
function fitAR(data: number[], p: number): number[] {
  if (p === 0) return [];
  
  // Simple linear regression for AR coefficients
  // In a full implementation, you would use matrix operations for multiple regression
  const coeffs = [];
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  
  for (let i = 1; i <= p; i++) {
    let numerator = 0;
    let denominator = 0;
    
    for (let j = i; j < data.length; j++) {
      numerator += (data[j] - mean) * (data[j - i] - mean);
      denominator += Math.pow(data[j - i] - mean, 2);
    }
    
    coeffs.push(denominator !== 0 ? numerator / denominator : 0);
  }
  
  return coeffs;
}

/**
 * Fit MA part of the model (simplified)
 */
function fitMA(data: number[], arCoeffs: number[], q: number): number[] {
  // This is a very simplified approach to MA estimation
  if (q === 0) return [];
  
  // Generate residuals
  const residuals = [];
  for (let i = Math.max(arCoeffs.length, 1); i < data.length; i++) {
    let predicted = 0;
    for (let j = 0; j < arCoeffs.length; j++) {
      predicted += arCoeffs[j] * data[i - j - 1];
    }
    residuals.push(data[i] - predicted);
  }
  
  // Simplistic MA model
  const maCoeffs = [];
  for (let i = 0; i < Math.min(q, residuals.length - 1); i++) {
    maCoeffs.push(autocorrelation(residuals, i + 1));
  }
  
  return maCoeffs;
}

/**
 * Forecast future values using the ARIMA model
 */
function forecast(
  data: number[], 
  arCoeffs: number[], 
  maCoeffs: number[],
  steps: number, 
  originalSeries: number[],
  d: number
): number[] {
  const forecasts = [...data.slice(-Math.max(arCoeffs.length, maCoeffs.length))];
  const residuals = new Array(maCoeffs.length).fill(0);
  
  for (let i = 0; i < steps; i++) {
    let nextValue = 0;
    
    // AR component
    for (let j = 0; j < arCoeffs.length; j++) {
      if (forecasts.length > j) {
        nextValue += arCoeffs[j] * forecasts[forecasts.length - j - 1];
      }
    }
    
    // MA component
    for (let j = 0; j < maCoeffs.length; j++) {
      if (residuals.length > j) {
        nextValue += maCoeffs[j] * residuals[j];
      }
    }
    
    forecasts.push(nextValue);
    
    // Update residuals (this is simplified)
    residuals.unshift(0); // Assume future errors are zero
    if (residuals.length > maCoeffs.length) {
      residuals.pop();
    }
  }
  
  // Return only the forecasted values
  const forecastedValues = forecasts.slice(-steps);
  
  // If we applied differencing, we need to integrate back
  return (d > 0) 
    ? integrate(forecastedValues, originalSeries, d)
    : forecastedValues;
}

/**
 * Calculate confidence intervals based on forecast variance
 */
function calculateConfidenceIntervals(
  predictions: number[],
  historicalVariance: number,
  steps: number,
  confidenceLevel: number = 0.95
): Array<{ yhat: number, yhat_lower: number, yhat_upper: number }> {
  const zScore = 1.96; // For 95% confidence interval
  const result = [];
  
  for (let i = 0; i < predictions.length; i++) {
    // Variance increases with forecast horizon
    const stepIncrement = i / (steps * 2);
    const currentVariance = historicalVariance * (1 + stepIncrement);
    const stdDev = Math.sqrt(currentVariance);
    const margin = zScore * stdDev;
    
    result.push({
      yhat: predictions[i],
      yhat_lower: predictions[i] - margin,
      yhat_upper: predictions[i] + margin
    });
  }
  
  return result;
}

/**
 * Main function to generate predictions using ARIMA
 */
export function generateARIMAPredictions(
  historicalData: HistoricalDataPoint[],
  predictionPeriod: string,
  timeRange: string
): PredictionDataPoint[] {
  if (historicalData.length === 0) return [];
  
  // Extract closing prices
  const prices = historicalData.map(d => d.close);
  const dates = historicalData.map(d => d.date);
  
  // Calculate number of days to predict
  const daysToPredict = predictionPeriod === '7d' ? 7 : predictionPeriod === '30d' ? 30 : 90;
  
  // Find optimal ARIMA orders
  const { p, d, q } = findBestARIMAOrder(prices);
  console.log(`Selected ARIMA(${p},${d},${q}) model`);
  
  // Apply differencing if needed
  const diffData = difference(prices, d);
  
  // Fit the model
  const arCoeffs = fitAR(diffData, p);
  const maCoeffs = fitMA(diffData, arCoeffs, q);
  
  // Calculate variance for confidence intervals
  const meanPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  const variance = prices.reduce((sum, p) => sum + Math.pow(p - meanPrice, 2), 0) / prices.length;
  
  // Forecast future values
  const forecastValues = forecast(diffData, arCoeffs, maCoeffs, daysToPredict, prices, d);
  
  // Generate confidence intervals
  const predictions = calculateConfidenceIntervals(forecastValues, variance, daysToPredict);
  
  // Generate dates for predictions
  const lastDate = new Date(dates[dates.length - 1]);
  
  const result: PredictionDataPoint[] = [];
  
  for (let i = 0; i < predictions.length; i++) {
    const predictedDate = new Date(lastDate);
    predictedDate.setDate(predictedDate.getDate() + i + 1);
    
    // Skip weekends
    if (predictedDate.getDay() === 0 || predictedDate.getDay() === 6) {
      continue;
    }
    
    result.push({
      date: predictedDate.toISOString().split('T')[0],
      yhat: predictions[i].yhat,
      yhat_lower: predictions[i].yhat_lower,
      yhat_upper: predictions[i].yhat_upper
    });
  }
  
  return result;
}

/**
 * A simpler interface function that matches the old prediction function signature
 */
export function generatePredictions(
  historicalData: HistoricalDataPoint[],
  predictionPeriod: '7d' | '30d' | '90d'
): PredictionDataPoint[] {
  return generateARIMAPredictions(historicalData, predictionPeriod, '1y');
}
