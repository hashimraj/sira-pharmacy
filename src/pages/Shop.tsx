import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/mockData';
import { SearchAutocomplete } from '@/components/shop/SearchAutocomplete';
import { ShopFilters, SortDropdown, MobileFilters, type Filters } from '@/components/shop/ShopFilters';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const maxPrice = Math.max(...products.map((p) => p.price));

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    category: searchParams.get('category'),
    brands: [],
    priceRange: [0, maxPrice],
    skinTypes: [],
    sortBy: 'featured',
  });

  // Sync URL params with filters
  useEffect(() => {
    const category = searchParams.get('category');
    if (category !== filters.category) {
      setFilters((prev) => ({ ...prev, category }));
    }
  }, [searchParams]);

  // Update URL when category changes
  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    if (newFilters.category) {
      setSearchParams({ category: newFilters.category });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Brands
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Price Range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Skin Types
    if (filters.skinTypes.length > 0) {
      result = result.filter(
        (p) => p.skinType && p.skinType.some((st) => filters.skinTypes.includes(st))
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
    }

    return result;
  }, [searchQuery, filters]);

  const activeFilterBadges = [];
  if (filters.category) {
    activeFilterBadges.push({ type: 'category', value: filters.category });
  }
  filters.brands.forEach((b) => activeFilterBadges.push({ type: 'brand', value: b }));
  filters.skinTypes.forEach((s) => activeFilterBadges.push({ type: 'skinType', value: s }));

  const removeFilter = (type: string, value: string) => {
    if (type === 'category') {
      handleFiltersChange({ ...filters, category: null });
    } else if (type === 'brand') {
      handleFiltersChange({ ...filters, brands: filters.brands.filter((b) => b !== value) });
    } else if (type === 'skinType') {
      handleFiltersChange({ ...filters, skinTypes: filters.skinTypes.filter((s) => s !== value) });
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-hero py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Shop All Products</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex-1 max-w-xl"
            />
            <div className="flex gap-2">
              <MobileFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                productCount={filteredProducts.length}
              />
              <SortDropdown
                value={filters.sortBy}
                onChange={(sortBy) => handleFiltersChange({ ...filters, sortBy })}
              />
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilterBadges.map((filter) => (
                <Badge
                  key={`${filter.type}-${filter.value}`}
                  variant="soft"
                  className="cursor-pointer capitalize"
                  onClick={() => removeFilter(filter.type, filter.value)}
                >
                  {filter.value}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <ShopFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              productCount={filteredProducts.length}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
