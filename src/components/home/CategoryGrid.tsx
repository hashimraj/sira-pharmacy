import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Pill, 
  Leaf, 
  Heart, 
  Baby, 
  Activity, 
  Sun,
  ArrowRight,
  Tablets,
  Shield,
  Eye,
  HeartPulse,
  Tag,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { categories } from '@/data/mockData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Pill,
  Leaf,
  Heart,
  Baby,
  Activity,
  Sun,
  Tablets,
  Shield,
  Eye,
  HeartPulse,
  Tag,
};

const colorMap: Record<string, string> = {
  skincare: 'from-pink-500/20 to-rose-500/10',
  'prescription-medicines': 'from-blue-500/20 to-cyan-500/10',
  'otc-medicines': 'from-indigo-500/20 to-blue-500/10',
  'personal-care': 'from-purple-500/20 to-violet-500/10',
  'baby-mother': 'from-amber-500/20 to-yellow-500/10',
  supplements: 'from-green-500/20 to-emerald-500/10',
  'medical-devices': 'from-slate-500/20 to-gray-500/10',
  'sexual-health': 'from-red-500/20 to-pink-500/10',
  'eye-ear-dental': 'from-cyan-500/20 to-teal-500/10',
  'health-conditions': 'from-rose-500/20 to-red-500/10',
  wellness: 'from-teal-500/20 to-cyan-500/10',
  offers: 'from-orange-500/20 to-amber-500/10',
};

export const CategoryGrid = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-sky">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of healthcare products
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Pill;
            const gradient = colorMap[category.slug] || 'from-primary/20 to-accent/10';
            
            return (
              <Link 
                key={category.id} 
                to={`/shop?category=${category.slug}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <Card 
                  variant="hover" 
                  className={cn(
                    "p-4 md:p-6 text-center group cursor-pointer h-full min-h-[140px] md:min-h-[180px]",
                    "bg-gradient-to-br flex flex-col items-center justify-center",
                    gradient
                  )}
                >
                  <div className="w-12 h-12 md:w-14 lg:w-16 md:h-14 lg:h-16 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-card flex items-center justify-center shadow-pharmacy group-hover:shadow-pharmacy-lg transition-shadow">
                    <IconComponent className="h-6 w-6 md:h-7 lg:h-8 md:w-7 lg:w-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 hidden sm:block">
                    {category.description}
                  </p>
                  <div className="mt-2 md:mt-4 flex items-center justify-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs md:text-sm font-medium">Explore</span>
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
