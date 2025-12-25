import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { healthConditions } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { CircleDot, Droplet, HeartPulse, Activity, Heart, Shield } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { CircleDot, Droplet, HeartPulse, Activity, Heart, Shield };

const Conditions = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Health Conditions</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Find products and information tailored to your specific health needs.</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthConditions.map(condition => {
          const Icon = iconMap[condition.icon] || Heart;
          return (
            <Link key={condition.id} to={`/shop?condition=${condition.slug}`}>
              <Card variant="hover" className="p-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Icon className="h-7 w-7 text-primary" /></div>
                <h2 className="text-xl font-bold mb-2">{condition.name}</h2>
                <p className="text-muted-foreground">{condition.description}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  </Layout>
);

export default Conditions;
