import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { consultationServices } from '@/data/mockData';
import { Stethoscope, Sparkles, ClipboardList, HeartPulse, Heart, Shield, Clock, MessageCircle } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Stethoscope, Sparkles, ClipboardList, HeartPulse, Heart, Shield };

const WHATSAPP_NUMBER = '0114542511';

const Consultations = () => {
  const handleBook = (name: string) => {
    const message = encodeURIComponent(`Hello, I would like to book a ${name}. Please let me know the available times and fees.`);
    window.open(`https://wa.me/254${WHATSAPP_NUMBER.slice(1)}?text=${message}`, '_blank');
  };

  return (
    <Layout>
      <div className="bg-gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Health Consultations</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Get expert advice from our licensed pharmacists. Book a consultation for personalized healthcare guidance. Fees will be discussed during booking.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {consultationServices.map(service => {
            const Icon = iconMap[service.icon] || Stethoscope;
            return (
              <Card key={service.id} variant="hover" className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm md:text-base mb-4 flex-1">{service.description}</p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </span>
                  </div>
                  <Button className="w-full" onClick={() => handleBook(service.name)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Book via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Consultations;
