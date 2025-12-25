import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase } from 'lucide-react';

const jobs = [
  { title: 'Licensed Pharmacist', location: 'Westlands, Nairobi', type: 'Full-time', desc: 'Join our team of healthcare professionals to provide expert pharmaceutical care.' },
  { title: 'Pharmacy Technician', location: 'Karen, Nairobi', type: 'Full-time', desc: 'Assist pharmacists in dispensing medications and providing customer service.' },
  { title: 'Customer Service Representative', location: 'Remote', type: 'Full-time', desc: 'Help customers with inquiries, orders, and provide excellent support.' },
  { title: 'Delivery Driver', location: 'Nairobi', type: 'Part-time', desc: 'Deliver medications and healthcare products to customers across Nairobi.' },
];

const Careers = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Careers at Sira Pharmacy</h1>
        <p className="text-muted-foreground text-lg">Join our team and make a difference in healthcare.</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-6 max-w-3xl mx-auto">
        {jobs.map(job => (
          <Card key={job.title} className="p-6">
            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.type}</span>
            </div>
            <p className="text-muted-foreground mb-4">{job.desc}</p>
            <Button>Apply Now</Button>
          </Card>
        ))}
      </div>
    </div>
  </Layout>
);

export default Careers;
