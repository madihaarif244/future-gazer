
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchStocks } from '@/lib/api';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface SearchBarProps {
  onSelect: (symbol: string) => void;
  className?: string;
}

const SearchBar = ({ onSelect, className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length > 0) {
        setLoading(true);
        try {
          console.log("Searching for:", query);
          const data = await searchStocks(query);
          console.log("Search results:", data);
          setResults(data);
          setShowResults(true);
        } catch (error) {
          console.error('Error searching stocks:', error);
          toast({
            title: "Search Error",
            description: "Failed to search for stocks. Please try again.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    };

    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (symbol: string) => {
    console.log("Selected symbol:", symbol);
    onSelect(symbol);
    setQuery(symbol);
    setShowResults(false);
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowResults(true)}
          placeholder="Search stock symbols (e.g. AAPL, MSFT)"
          className="w-full h-12 px-4 pl-10 rounded-lg border border-border bg-white bg-opacity-80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          aria-label="Search for stocks"
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        {loading && (
          <div className="absolute right-3 top-4">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      
      {showResults && (
        <div 
          ref={resultsRef}
          className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-lg border border-border bg-white bg-opacity-90 backdrop-blur-sm shadow-lg animate-fade-in"
        >
          {results.length > 0 ? (
            <ul className="py-1">
              {results.map((symbol) => (
                <li key={symbol}>
                  <button
                    onClick={() => handleSelect(symbol)}
                    className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors"
                  >
                    {symbol}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              {loading ? "Searching..." : "No results found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
