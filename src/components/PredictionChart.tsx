
import { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  ComposedChart,
  Legend,
  ReferenceLine
} from 'recharts';
import { StockPrediction, TimeRange, PredictionPeriod } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PredictionChartProps {
  data: StockPrediction | null;
  isLoading: boolean;
  timeRange: TimeRange;
  predictionPeriod: PredictionPeriod;
  onTimeRangeChange: (range: TimeRange) => void;
  onPredictionPeriodChange: (period: PredictionPeriod) => void;
  className?: string;
}

const PredictionChart = ({
  data,
  isLoading,
  timeRange,
  predictionPeriod,
  onTimeRangeChange,
  onPredictionPeriodChange,
  className
}: PredictionChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (!data) return;
    
    // Combine historical and prediction data for the chart
    const combinedData = [
      ...data.historical.map(item => ({
        ...item,
        price: item.close,
        type: 'historical'
      })),
      ...data.prediction.map(item => ({
        ...item,
        price: item.yhat,
        type: 'prediction'
      }))
    ];
    
    setChartData(combinedData);
  }, [data]);

  // Time period options
  const timeOptions: {value: TimeRange, label: string}[] = [
    { value: '1w', label: '1W' },
    { value: '1m', label: '1M' },
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '1y', label: '1Y' },
    { value: '5y', label: '5Y' }
  ];
  
  // Prediction period options
  const predictionOptions: {value: PredictionPeriod, label: string}[] = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  // Format price for tooltip
  const formatPrice = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  // Format date for tooltip
  const formatDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isPrediction = data.type === 'prediction';
      
      return (
        <div className="glass p-3 rounded-lg shadow-sm border border-border">
          <p className="text-sm font-medium mb-1">{formatDate(label)}</p>
          {isPrediction ? (
            <>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">Predicted:</span> {formatPrice(data.yhat)}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">Range:</span> {formatPrice(data.yhat_lower)} - {formatPrice(data.yhat_upper)}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">Close:</span> {formatPrice(data.price)}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">Open:</span> {formatPrice(data.open)}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">High:</span> {formatPrice(data.high)}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">Low:</span> {formatPrice(data.low)}
              </p>
            </>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={cn("w-full bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 border border-border shadow-sm", className)}>
      <div className="flex flex-col space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            {data ? `${data.symbol} - ${data.companyName}` : 'Stock Price Chart'}
          </h3>
          
          <div className="flex space-x-2">
            {timeOptions.map(option => (
              <button
                key={option.value}
                className={cn(
                  "px-3 py-1 text-xs rounded-full transition-all",
                  timeRange === option.value
                    ? "bg-primary text-white font-medium"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
                onClick={() => onTimeRangeChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <span className="text-sm text-muted-foreground mr-2">Prediction:</span>
          {predictionOptions.map(option => (
            <button
              key={option.value}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all",
                predictionPeriod === option.value
                  ? "bg-accent-foreground text-white font-medium"
                  : "bg-accent text-accent-foreground hover:bg-accent/80"
              )}
              onClick={() => onPredictionPeriodChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="loading-dots text-muted-foreground">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredictionRange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
                }}
                minTickGap={30} 
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <ReferenceLine x={data?.historical[data.historical.length - 1]?.date} stroke="#888" strokeDasharray="3 3" label={{ value: 'Today', position: 'top', fontSize: 12 }} />
              
              {/* Historical Data */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="#1E40AF"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
                name="Historical"
                connectNulls
                data={chartData.filter(d => d.type === 'historical')}
              />
              <Area
                type="monotone"
                dataKey="price"
                fill="url(#colorHistorical)"
                stroke="transparent"
                data={chartData.filter(d => d.type === 'historical')}
              />
              
              {/* Prediction Data */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="#059669"
                strokeWidth={2.5}
                dot={false}
                strokeDasharray="5 5"
                name="Prediction"
                connectNulls
                data={chartData.filter(d => d.type === 'prediction')}
              />
              <Area
                type="monotone"
                dataKey="yhat_upper"
                stroke="transparent"
                fill="url(#colorPredictionRange)"
                data={chartData.filter(d => d.type === 'prediction')}
              />
              <Area
                type="monotone"
                dataKey="yhat_lower"
                stroke="transparent"
                fill="transparent"
                data={chartData.filter(d => d.type === 'prediction')}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionChart;
