import { brands } from '@/data/mockData';

export const BrandsSection = () => {
  return (
    <section className="py-10 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Trusted Brands
          </h2>
          <p className="text-muted-foreground text-sm">
            We partner with world-class pharmaceutical brands
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className="text-center animate-fade-in px-4 py-2"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="font-bold text-lg md:text-xl text-muted-foreground/70 hover:text-primary transition-colors cursor-pointer">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
