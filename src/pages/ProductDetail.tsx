import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getProductById, getRelatedProducts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/products/ProductCard';
import { useState } from 'react';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, ThumbsUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild><Link to="/shop">Continue Shopping</Link></Button>
        </div>
      </Layout>
    );
  }

  const images = product.images || [product.image];
  const relatedProducts = getRelatedProducts(product);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (product.isPrescriptionRequired) {
      toast({ title: "Prescription Required", description: "Please upload a valid prescription first.", variant: "destructive" });
      return;
    }
    addToCart(product, quantity);
    toast({ title: "Added to Cart", description: `${quantity}x ${product.name} added to your cart.` });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary capitalize">{product.category.replace('-', ' ')}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(idx)} className={cn("w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors", selectedImage === idx ? "border-primary" : "border-transparent")}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="soft">{product.brand}</Badge>
              {product.isPrescriptionRequired && <Badge variant="prescription"><AlertCircle className="h-3 w-3 mr-1" />Prescription Required</Badge>}
              {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted")} />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-foreground">KES {product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="text-xl text-muted-foreground line-through">KES {product.originalPrice.toLocaleString()}</span>}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
              </div>
              <Button size="lg" className="flex-1" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-5 w-5" />Add to Cart</Button>
              <Button size="lg" variant="outline"><Heart className="h-5 w-5" /></Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-xl">
              <div className="text-center"><Truck className="h-6 w-6 mx-auto text-primary mb-1" /><span className="text-xs text-muted-foreground">Free Delivery</span></div>
              <div className="text-center"><Shield className="h-6 w-6 mx-auto text-primary mb-1" /><span className="text-xs text-muted-foreground">Genuine Products</span></div>
              <div className="text-center"><RotateCcw className="h-6 w-6 mx-auto text-primary mb-1" /><span className="text-xs text-muted-foreground">Easy Returns</span></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-4 border-b mb-6">
            {(['description', 'ingredients', 'reviews'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn("pb-3 px-4 font-medium capitalize transition-colors border-b-2 -mb-px", activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>{tab}</button>
            ))}
          </div>
          {activeTab === 'description' && <div className="prose max-w-none"><p>{product.fullDescription || product.description}</p>{product.howToUse && <><h4 className="font-semibold mt-4">How to Use</h4><p>{product.howToUse}</p></>}{product.warnings && <><h4 className="font-semibold mt-4">Warnings</h4><p className="text-muted-foreground">{product.warnings}</p></>}</div>}
          {activeTab === 'ingredients' && <p className="text-muted-foreground">{product.ingredients || 'Ingredient information not available.'}</p>}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {product.reviews?.map(review => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.author}</span>
                      {review.verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                    </div>
                    <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className={cn("h-4 w-4", i < review.rating ? "fill-warning text-warning" : "text-muted")} />)}</div>
                  </div>
                  <h4 className="font-medium mb-1">{review.title}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><span>{review.date}</span><span>·</span><ThumbsUp className="h-3 w-3" /><span>{review.helpful} found helpful</span></div>
                </Card>
              )) || <p className="text-muted-foreground">No reviews yet.</p>}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
