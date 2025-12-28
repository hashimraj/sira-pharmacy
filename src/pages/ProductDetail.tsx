import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { getProductById, getRelatedProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/products/ProductCard";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  ThumbsUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const relatedProducts = product ? getRelatedProducts(product) : [];
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] =
    useState<"description" | "ingredients" | "reviews">("description");

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const images = product.images || [product.image];
  const discount =
    product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const handleAddToCart = () => {
    if (product.isPrescriptionRequired) {
      toast({
        title: "Prescription Required",
        description: "Upload a valid prescription to proceed.",
        variant: "destructive"
      });
      return;
    }

    addToCart(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product.name} added.`
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-screen-xl overflow-x-hidden py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4 flex flex-wrap gap-1">
          <Link to="/" className="hover:text-primary">Home</Link> /
          <Link to="/shop" className="hover:text-primary">Shop</Link> /
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* PRODUCT HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* IMAGES */}
          <div className="space-y-3">
            <div className="aspect-square max-h-[360px] sm:max-h-[420px] rounded-xl overflow-hidden bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border",
                      selectedImage === idx
                        ? "border-primary"
                        : "border-transparent"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="space-y-4">
            {/* BADGES */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="soft">{product.brand}</Badge>
              {product.isPrescriptionRequired && (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Prescription
                </Badge>
              )}
              {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            </div>

            {/* TITLE */}
            <h1 className="text-xl sm:text-2xl font-semibold leading-tight">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating)
                        ? "fill-warning text-warning"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} · {product.reviewCount} reviews
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                KES {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-muted-foreground">
                  KES {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus />
                </Button>
                <span className="w-10 text-center text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus />
                </Button>
              </div>

              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>

              <Button variant="outline" size="icon">
                <Heart />
              </Button>
            </div>

            {/* TRUST */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1">
                <Truck className="h-4 w-4 text-primary" /> Free delivery
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-primary" /> Genuine
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="h-4 w-4 text-primary" /> Easy returns
              </span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mb-12">
          <div className="flex gap-4 border-b mb-4 overflow-x-auto">
            {["description", "ingredients", "reviews"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "pb-2 px-3 capitalize whitespace-nowrap border-b-2 text-sm",
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.fullDescription || product.description}
            </p>
          )}

          {activeTab === "ingredients" && (
            <p className="text-sm text-muted-foreground">
              {product.ingredients || "Ingredient details not available."}
            </p>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-3">
              {product.reviews?.map(review => (
                <Card key={review.id} className="p-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold">
                      {review.author}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3",
                            i < review.rating
                              ? "fill-warning text-warning"
                              : "text-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <ThumbsUp className="h-3 w-3" />
                    {review.helpful} helpful
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* RELATED */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;


