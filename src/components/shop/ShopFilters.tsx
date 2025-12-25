import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { categories, products } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export interface Filters {
  category: string | null;
  brands: string[];
  priceRange: [number, number];
  skinTypes: string[];
  sortBy: string;
}

interface ShopFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  productCount: number;
}

// Get unique brands from products
const allBrands = [...new Set(products.map((p) => p.brand))].sort();
const allSkinTypes = ['dry', 'normal', 'oily', 'combination', 'sensitive', 'all'];
const maxPrice = Math.max(...products.map((p) => p.price));

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-foreground hover:text-primary transition-colors">
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  );
};

const FiltersContent = ({ filters, onFiltersChange, productCount }: ShopFiltersProps) => {
  const activeFiltersCount =
    (filters.category ? 1 : 0) +
    filters.brands.length +
    filters.skinTypes.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0);

  const clearFilters = () => {
    onFiltersChange({
      category: null,
      brands: [],
      priceRange: [0, maxPrice],
      skinTypes: [],
      sortBy: 'featured',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{productCount} products</span>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive">
            <X className="h-4 w-4 mr-1" /> Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Category">
        <div className="space-y-2">
          <button
            onClick={() => onFiltersChange({ ...filters, category: null })}
            className={cn(
              "block w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors",
              !filters.category ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
            )}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFiltersChange({ ...filters, category: cat.slug })}
              className={cn(
                "block w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors",
                filters.category === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="px-2 pt-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, priceRange: value as [number, number] })
            }
            min={0}
            max={maxPrice}
            step={100}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>KES {filters.priceRange[0].toLocaleString()}</span>
            <span>KES {filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brand">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => {
                  const newBrands = checked
                    ? [...filters.brands, brand]
                    : filters.brands.filter((b) => b !== brand);
                  onFiltersChange({ ...filters, brands: newBrands });
                }}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Skin Type */}
      <FilterSection title="Skin Type" defaultOpen={false}>
        <div className="space-y-2">
          {allSkinTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer capitalize">
              <Checkbox
                checked={filters.skinTypes.includes(type)}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...filters.skinTypes, type]
                    : filters.skinTypes.filter((t) => t !== type);
                  onFiltersChange({ ...filters, skinTypes: newTypes });
                }}
              />
              <span className="text-sm capitalize">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

// Desktop Filters (sidebar)
export const ShopFilters = (props: ShopFiltersProps) => {
  return (
    <Card className="p-6 h-fit sticky top-24">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <FiltersContent {...props} />
    </Card>
  );
};

// Mobile Filters (sheet)
export const MobileFilters = (props: ShopFiltersProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FiltersContent {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const SortDropdown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[180px] justify-between"
      >
        {sortOptions.find((o) => o.value === value)?.label || 'Sort by'}
        <ChevronDown className={cn("h-4 w-4 ml-2 transition-transform", isOpen && "rotate-180")} />
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-card rounded-xl shadow-pharmacy-xl border border-border z-50 overflow-hidden animate-slide-down min-w-[180px]">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "block w-full text-left px-4 py-2 text-sm transition-colors",
                value === option.value ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopFilters;
