
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { StockData } from '@/lib/types';

interface StockMetricsProps {
  stockData: StockData | null;
  isLoading: boolean;
}

const StockMetrics = ({ stockData, isLoading }: StockMetricsProps) => {
  const [activeGraph, setActiveGraph] = useState<'volume' | 'performance' | 'comparison'>('volume');

  // Mock comparison data for demonstration
  const comparisonData = [
    { name: 'Current', value: stockData?.price || 0 },
    { name: 'Previous Close', value: stockData?.previousClose || 0 },
    { name: 'Open', value: stockData?.open || 0 },
  ];

  // Mock performance data
  const performanceData = [
    { name: 'Day Low', value: stockData?.dayLow || 0 },
    { name: 'Price', value: stockData?.price || 0 },
    { name: 'Day High', value: stockData?.dayHigh || 0 },
  ];

  // Mock volume trend data (5 days)
  const volumeData = [
    { day: 'Mon', volume: stockData ? stockData.volume * 0.85 : 0 },
    { day: 'Tue', volume: stockData ? stockData.volume * 0.92 : 0 },
    { day: 'Wed', volume: stockData ? stockData.volume * 1.05 : 0 },
    { day: 'Thu', volume: stockData ? stockData.volume * 0.78 : 0 },
    { day: 'Fri', volume: stockData ? stockData.volume : 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Format volume number
  const formatVolume = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  if (isLoading) {
    return (
      <div className="glass rounded-xl p-6 animate-pulse min-h-[300px] flex items-center justify-center">
        <div className="loading-dots text-muted-foreground">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (!stockData) {
    return (
      <div className="glass rounded-xl p-6 text-center">
        <p className="text-muted-foreground">No stock data available</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 animate-fade-in">Additional Metrics</h3>
        
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeGraph === 'volume' ? 'bg-primary/90 text-black font-medium' : 'bg-secondary hover:bg-secondary/80'
            }`}
            onClick={() => setActiveGraph('volume')}
          >
            Volume Trend
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeGraph === 'performance' ? 'bg-primary/90 text-black font-medium' : 'bg-secondary hover:bg-secondary/80'
            }`}
            onClick={() => setActiveGraph('performance')}
          >
            Price Range
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeGraph === 'comparison' ? 'bg-primary/90 text-black font-medium' : 'bg-secondary hover:bg-secondary/80'
            }`}
            onClick={() => setActiveGraph('comparison')}
          >
            Price Comparison
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        {activeGraph === 'volume' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" tick={{ fill: '#999' }} />
              <YAxis tickFormatter={formatVolume} tick={{ fill: '#999' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#333', borderColor: '#444', borderRadius: '8px' }}
                formatter={(value: number) => [formatVolume(value), 'Volume']}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorVolume)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeGraph === 'performance' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" tick={{ fill: '#999' }} />
              <YAxis 
                domain={[
                  Math.min(...performanceData.map(d => d.value)) * 0.99,
                  Math.max(...performanceData.map(d => d.value)) * 1.01
                ]} 
                tick={{ fill: '#999' }}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#333', borderColor: '#444', borderRadius: '8px' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Bar dataKey="value" animationDuration={1500}>
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeGraph === 'comparison' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={comparisonData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1500}
              >
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#333', borderColor: '#444', borderRadius: '8px' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StockMetrics;
