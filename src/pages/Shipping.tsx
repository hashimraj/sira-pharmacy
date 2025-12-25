import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Truck, Clock, MapPin, CreditCard, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '0114542511';

const Shipping = () => {
  const handleContactWhatsApp = () => {
    const message = encodeURIComponent('Hello, I would like to inquire about delivery options and rates.');
    window.open(`https://wa.me/254${WHATSAPP_NUMBER.slice(1)}?text=${message}`, '_blank');
  };

  return (
    <Layout>
      <div className="bg-gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shipping & Delivery</h1>
          <p className="text-muted-foreground text-base md:text-lg">Fast, reliable delivery to your doorstep.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {[
            { icon: Truck, title: 'Reliable Delivery', desc: 'We deliver across Nairobi and beyond' },
            { icon: Clock, title: 'Same-Day Options', desc: 'Fast delivery for urgent orders' },
            { icon: MapPin, title: 'Nationwide Shipping', desc: 'We deliver across Kenya' },
            { icon: CreditCard, title: 'Cash on Delivery', desc: 'Pay when you receive your order' },
          ].map(item => (
            <Card key={item.title} className="p-4 md:p-6 flex items-start gap-4">
              <item.icon className="h-6 w-6 md:h-8 md:w-8 text-primary shrink-0" />
              <div>
                <h3 className="font-bold mb-1 text-sm md:text-base">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Delivery Rates</h2>
          <p className="text-muted-foreground mb-6">
            Delivery fees vary based on your location and order size. Contact us on WhatsApp for a quote.
          </p>
          <Button size="lg" onClick={handleContactWhatsApp}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Get Delivery Quote on WhatsApp
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default Shipping;
