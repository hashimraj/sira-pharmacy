import { Link } from 'react-router-dom';
import { ShoppingCart, Star, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.isPrescriptionRequired) {
      toast({
        title: "Prescription Required",
        description: "Please upload a valid prescription to purchase this item.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`;
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card variant="hover" className={cn("overflow-hidden group h-full flex flex-col", className)}>
        {/* Image Container - compact */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop';
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isPrescriptionRequired && (
              <Badge variant="prescription" className="text-xs px-2 py-0.5">
                <AlertCircle className="h-3 w-3 mr-1" />
                Rx
              </Badge>
            )}
            {product.tags.includes('bestseller') && (
              <Badge variant="soft" className="text-xs px-2 py-0.5">Best</Badge>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant={isInCart(product.id) ? "secondary" : "default"}
              className="rounded-full shadow-lg h-8 w-8"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Content - compact */}
        <div className="p-3 flex-1 flex flex-col">
          <p className="text-xs text-primary font-medium mb-0.5">{product.brand}</p>
          <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1.5 group-hover:text-primary transition-colors flex-1">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.inStock ? (
              <span className="text-xs text-success font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-destructive font-medium">Out</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
