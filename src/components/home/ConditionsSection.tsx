import { Link } from 'react-router-dom';
import { 
  CircleDot, 
  Droplet, 
  HeartPulse, 
  Activity, 
  Heart, 
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { healthConditions } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  CircleDot,
  Droplet,
  HeartPulse,
  Activity,
  Heart,
  Shield,
};

export const ConditionsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Health Condition
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find targeted solutions and products for your specific health needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {healthConditions.map((condition, index) => {
            const IconComponent = iconMap[condition.icon] || Heart;
            
            return (
              <Link 
                key={condition.id} 
                to={`/conditions/${condition.slug}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Card variant="hover" className="p-5 text-center group h-full">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {condition.name}
                  </h3>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/conditions" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View All Conditions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;
