import { Shield, Truck, Clock, Award } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: '100% Authentic',
    description: 'Genuine products only',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same day in Nairobi',
  },
  {
    icon: Clock,
    title: 'Always Available',
    description: 'Mon-Sat 8AM-9PM',
  },
  {
    icon: Award,
    title: 'Expert Advice',
    description: 'Licensed pharmacists',
  },
];

export const TrustBadges = () => {
  return (
    <section className="py-8 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 justify-center md:justify-start animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <badge.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base">{badge.title}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
