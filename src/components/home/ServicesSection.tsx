import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  FileText, 
  Truck, 
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: Stethoscope,
    title: 'Expert Consultations',
    description: 'Get personalized advice from licensed pharmacists for skincare, medications, and chronic care.',
    cta: 'Book Now',
    ctaLink: '/consultations',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: FileText,
    title: 'Prescription Services',
    description: 'Upload your prescription and we\'ll handle the rest. Fast processing and reliable service.',
    cta: 'Upload Prescription',
    ctaLink: '/prescriptions',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery to your doorstep. Contact us on WhatsApp for delivery details.',
    cta: 'Learn More',
    ctaLink: '/shipping',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: '100% authentic products from trusted brands. Your health and safety are our priority.',
    cta: 'Our Promise',
    ctaLink: '/about',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Beyond products, we offer expert healthcare services to support your wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              variant="hover"
              className="p-4 md:p-6 animate-fade-in h-full flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${service.bgColor} flex items-center justify-center mb-3 md:mb-4`}>
                <service.icon className={`h-6 w-6 md:h-7 md:w-7 ${service.color}`} />
              </div>
              <h3 className="font-bold text-base md:text-lg text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                {service.description}
              </p>
              <Button asChild variant="ghost" size="sm" className="p-0 h-auto w-fit">
                <Link to={service.ctaLink} className="flex items-center gap-1 text-primary font-semibold">
                  {service.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
