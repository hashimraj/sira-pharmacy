import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CtaBanner = () => {
  return (
    <section className="py-16 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-foreground" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-primary-foreground" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-primary-foreground" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
            <FileText className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a Prescription?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
            Upload your prescription and let our pharmacists handle the rest. 
            We'll verify, prepare, and deliver your medications right to your doorstep.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/prescriptions">
                Upload Prescription
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/consultations">
                Talk to a Pharmacist
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
