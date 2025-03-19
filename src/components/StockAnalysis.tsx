
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PredictionChart from './PredictionChart';
import StockMetrics from './StockMetrics';
import { getStockData, getStockPrediction } from '@/lib/api';
import { StockData, StockPrediction, TimeRange, PredictionPeriod } from '@/lib/types';
import { ArrowUpIcon, ArrowDownIcon, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const StockAnalysis = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [predictionData, setPredictionData] = useState<StockPrediction | null>(null);
  const [isLoadingStock, setIsLoadingStock] = useState(false);
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('3m');
  const [predictionPeriod, setPredictionPeriod] = useState<PredictionPeriod>('30d');

  useEffect(() => {
    if (!selectedSymbol) return;

    const fetchData = async () => {
      setIsLoadingStock(true);
      setIsLoadingPrediction(true);
      
      try {
        const stockResult = await getStockData(selectedSymbol);
        setStockData(stockResult);
        
        const predictionResult = await getStockPrediction(
          selectedSymbol, 
          timeRange,
          predictionPeriod
        );
        setPredictionData(predictionResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingStock(false);
        setIsLoadingPrediction(false);
      }
    };

    fetchData();
  }, [selectedSymbol, timeRange, predictionPeriod]);

  const handleSelectStock = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  const handlePredictionPeriodChange = (period: PredictionPeriod) => {
    setPredictionPeriod(period);
  };

  const refreshData = () => {
    if (selectedSymbol) {
      setSelectedSymbol(selectedSymbol);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 animate-fade-down">
          Stock Analysis & Prediction
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up">
          Enter a stock symbol to view historical data and AI-powered price predictions
        </p>
        <SearchBar onSelect={handleSelectStock} className="mx-auto animate-fade-in" />
      </div>

      {selectedSymbol && (
        <div className="space-y-6 animate-fade-in">
          {/* Stock Info Section */}
          <div className="glass rounded-xl p-6 border border-border shadow-sm">
            {isLoadingStock ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="animate-spin h-8 w-8 text-muted-foreground" />
              </div>
            ) : stockData ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold">{stockData.symbol}</h2>
                      <span className="text-sm font-medium bg-secondary px-3 py-1 ml-3 rounded-full">
                        Stock
                      </span>
                    </div>
                    <p className="text-lg text-muted-foreground">{stockData.companyName}</p>
                  </div>
                  <button 
                    onClick={refreshData}
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                    aria-label="Refresh data"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-baseline">
                  <h3 className="text-3xl font-bold">${stockData.price.toFixed(2)}</h3>
                  <div className={cn(
                    "flex items-center ml-3 text-sm font-medium",
                    stockData.change >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {stockData.change >= 0 ? 
                      <ArrowUpIcon className="h-4 w-4 mr-1" /> : 
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    }
                    {stockData.change > 0 ? "+" : ""}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StockMetric label="Previous Close" value={`$${stockData.previousClose.toFixed(2)}`} />
                  <StockMetric label="Open" value={`$${stockData.open.toFixed(2)}`} />
                  <StockMetric label="Day Range" value={`$${stockData.dayLow.toFixed(2)} - $${stockData.dayHigh.toFixed(2)}`} />
                  <StockMetric label="Volume" value={stockData.volume.toLocaleString()} />
                  <StockMetric label="Market Cap" value={`$${(stockData.marketCap / 1000000000).toFixed(2)}B`} />
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No stock data available</p>
              </div>
            )}
          </div>

          {/* Prediction Chart */}
          <PredictionChart
            data={predictionData}
            isLoading={isLoadingPrediction}
            timeRange={timeRange}
            predictionPeriod={predictionPeriod}
            onTimeRangeChange={handleTimeRangeChange}
            onPredictionPeriodChange={handlePredictionPeriodChange}
          />
          
          {/* New Additional Charts Section */}
          <StockMetrics 
            stockData={stockData}
            isLoading={isLoadingStock}
          />
          
          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground text-center mt-4">
            <p>
              Disclaimer: The predictions shown are for educational purposes only. They are not financial advice. 
              Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Stock Metric Component
const StockMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-secondary/50 rounded-lg px-4 py-3">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-lg font-medium">{value}</p>
  </div>
);

export default StockAnalysis;
