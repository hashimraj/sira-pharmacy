import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Phone, 
  MapPin,
  ChevronDown,
  Sparkles,
  Pill,
  Leaf,
  Heart,
  Baby,
  Scissors,
  Activity,
  Sun,
  FileText,
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { categories, products } from '@/data/mockData';
import { cn } from '@/lib/utils';
const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Pill,
  Leaf,
  Heart,
  Baby,
  Scissors,
  Activity,
  Sun,
};

const PHONE_NUMBER = '0114542511';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  const navItems = [
    { label: 'Shop', href: '/shop', hasDropdown: true },
    { label: 'Consultations', href: '/consultations' },
    { label: 'Prescriptions', href: '/prescriptions' },
    { label: 'Conditions', href: '/conditions' },
    { label: 'Store Locator', href: '/stores' },
  ];

  const searchResults = searchQuery.length >= 2 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearchSelect = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">{PHONE_NUMBER}</span>
              </a>
              <Link to="/stores" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Two Rivers & Thindigua</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/consultations" className="font-semibold hover:opacity-80 transition-opacity">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">S</span>
              </div>
              <span className="font-bold text-lg md:text-xl text-foreground">
                Sira<span className="text-primary">Pharmacy</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setActiveCategory(item.label)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors",
                      location.pathname === item.href
                        ? "text-primary bg-secondary"
                        : "text-foreground hover:text-primary hover:bg-secondary"
                    )}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>

                  {/* Mega Menu */}
                  {item.hasDropdown && activeCategory === item.label && (
                    <div className="absolute top-full left-0 w-[800px] bg-card rounded-xl shadow-pharmacy-xl border border-border p-6 animate-fade-in">
                      <div className="grid grid-cols-4 gap-6">
                        {categories.slice(0, 8).map((category) => {
                          const IconComponent = iconMap[category.icon] || Pill;
                          return (
                            <div key={category.id}>
                              <Link
                                to={`/shop?category=${category.slug}`}
                                className="flex items-center gap-2 font-semibold text-foreground hover:text-primary mb-3"
                              >
                                <IconComponent className="h-5 w-5 text-primary" />
                                {category.name}
                              </Link>
                              <ul className="space-y-2">
                                {category.subcategories.slice(0, 4).map((sub) => (
                                  <li key={sub.id}>
                                    <Link
                                      to={`/shop?category=${category.slug}&sub=${sub.slug}`}
                                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6 pt-6 border-t border-border flex gap-4">
                        <Link 
                          to="/prescriptions"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex-1"
                        >
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-semibold text-foreground">Upload Prescription</p>
                            <p className="text-xs text-muted-foreground">Fast & easy processing</p>
                          </div>
                        </Link>
                        <Link 
                          to="/consultations"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex-1"
                        >
                          <Stethoscope className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-semibold text-foreground">Book Consultation</p>
                            <p className="text-xs text-muted-foreground">Expert pharmacist advice</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>

              <Link to="/cart">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {cart.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-slide-down">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-primary bg-secondary"
                      : "text-foreground hover:text-primary hover:bg-secondary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="container mx-auto px-4 pt-20">
            <div className="bg-card rounded-2xl shadow-pharmacy-xl p-6 max-w-2xl mx-auto animate-scale-in">
              <div className="flex items-center gap-4 mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for products, services, or health topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg bg-transparent outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="border-t border-border pt-4 max-h-80 overflow-y-auto">
                  <p className="text-sm text-muted-foreground mb-3">Products</p>
                  <div className="space-y-2">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchSelect(product.id)}
                        className="flex items-center gap-3 p-3 w-full text-left hover:bg-secondary rounded-lg transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                        <span className="font-semibold text-primary">KES {product.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground text-center py-4">No products found for "{searchQuery}"</p>
                </div>
              )}
              
              {searchQuery.length < 2 && (
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Sunscreen', 'Vitamins', 'Pain Relief', 'Skincare', 'Blood Pressure Monitor'].map((term) => (
                      <Button 
                        key={term} 
                        variant="soft" 
                        size="sm" 
                        className="rounded-full"
                        onClick={() => setSearchQuery(term)}
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
