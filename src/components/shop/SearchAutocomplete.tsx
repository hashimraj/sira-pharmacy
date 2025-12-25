import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { products } from '@/data/mockData';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchAutocomplete = ({ value, onChange, className }: SearchAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length >= 2) {
      const query = value.toLowerCase();
      const matches = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      ).slice(0, 6);
      setSuggestions(matches);
      setIsOpen(matches.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products, brands..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
          className="pl-10 pr-10 h-12 rounded-xl bg-card border-border"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-pharmacy-xl border border-border z-50 overflow-hidden animate-slide-down">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex items-center gap-3 p-3 hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>
              <span className="font-semibold text-primary">KES {product.price.toLocaleString()}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
