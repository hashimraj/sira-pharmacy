import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import heroPharmacy from '@/assets/hero-pharmacy.jpg';
import heroConsultation from '@/assets/hero-consultation.jpg';
import heroPrescription from '@/assets/hero-prescription.jpg';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  secondaryCta?: string;
  secondaryCtaLink?: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Your Trusted Healthcare Partner",
    subtitle: "Quality medicines, expert advice, and personalized care. Discover wellness solutions for the whole family.",
    cta: "Shop Now",
    ctaLink: "/shop",
    secondaryCta: "Learn More",
    secondaryCtaLink: "/about",
    image: heroPharmacy,
  },
  {
    id: 2,
    title: "Expert Consultations Available",
    subtitle: "Get professional advice from our licensed pharmacists. Book a consultation for personalized skincare and medication review.",
    cta: "Book Consultation",
    ctaLink: "/consultations",
    image: heroConsultation,
  },
  {
    id: 3,
    title: "Easy Prescription Services",
    subtitle: "Upload your prescription and we'll handle the rest. Fast processing, reliable delivery, and expert guidance.",
    cta: "Upload Prescription",
    ctaLink: "/prescriptions",
    image: heroPrescription,
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section 
      className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-in-out",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-xl">
              <h1 
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight",
                  index === currentSlide && "animate-slide-up"
                )}
                style={{ animationDelay: '0.1s' }}
              >
                {slide.title}
              </h1>
              <p 
                className={cn(
                  "text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed",
                  index === currentSlide && "animate-slide-up"
                )}
                style={{ animationDelay: '0.2s' }}
              >
                {slide.subtitle}
              </p>
              <div 
                className={cn(
                  "flex flex-wrap gap-3 md:gap-4",
                  index === currentSlide && "animate-slide-up"
                )}
                style={{ animationDelay: '0.3s' }}
              >
                <Button asChild variant="hero" size="lg">
                  <Link to={slide.ctaLink}>{slide.cta}</Link>
                </Button>
                {slide.secondaryCta && (
                  <Button asChild variant="outline" size="lg">
                    <Link to={slide.secondaryCtaLink!}>{slide.secondaryCta}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-colors shadow-pharmacy"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-colors shadow-pharmacy"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-primary w-7"
                : "bg-primary/30 hover:bg-primary/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
