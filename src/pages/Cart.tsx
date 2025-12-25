import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '0114542511';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleOrderViaWhatsApp = () => {
    const items = cart.items.map(item => 
      `• ${item.product.name} (x${item.quantity}) - KES ${(item.product.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const total = cart.subtotal;
    
    const message = encodeURIComponent(
      `Hello! I would like to place an order:\n\n${items}\n\nSubtotal: KES ${total.toLocaleString()}\n\nPlease confirm availability and delivery details.`
    );
    
    window.open(`https://wa.me/254${WHATSAPP_NUMBER.slice(1)}?text=${message}`, '_blank');
  };

  if (cart.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Start shopping to add items to your cart.</p>
          <Button asChild><Link to="/shop">Continue Shopping</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Shopping Cart ({cart.itemCount} items)</h1>
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {cart.items.map(item => (
              <Card key={item.product.id} className="p-3 md:p-4 flex gap-3 md:gap-4">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm md:text-base line-clamp-2">{item.product.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.product.brand}</p>
                  <p className="font-bold mt-1 md:mt-2 text-sm md:text-base">KES {item.product.price.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Button size="icon" variant="outline" className="h-7 w-7 md:h-8 md:w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                    <span className="w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                    <Button size="icon" variant="outline" className="h-7 w-7 md:h-8 md:w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost" className="h-7 md:h-8" onClick={() => removeFromCart(item.product.id)}>
                    <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-4 md:p-6 h-fit">
            <h2 className="font-bold text-lg md:text-xl mb-4">Order Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm md:text-base">
                <span>Subtotal</span>
                <span>KES {cart.subtotal.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-sm md:text-base">
                <span>Total</span>
                <span>KES {cart.subtotal.toLocaleString()}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={handleOrderViaWhatsApp}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Order via WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Delivery fees will be discussed on WhatsApp
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
