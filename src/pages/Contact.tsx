import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent', description: "We'll get back to you within 24 hours." });
  };

  return (
    <Layout>
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4"><Phone className="h-5 w-5 text-primary" /><span>0114542511</span></div>
              <div className="flex items-center gap-4"><Mail className="h-5 w-5 text-primary" /><span>info@sirapharmacy.co.ke</span></div>
              <div className="flex items-center gap-4"><MapPin className="h-5 w-5 text-primary" /><span>Two Rivers & Thindigua, Nairobi</span></div>
              <div className="flex items-center gap-4"><Clock className="h-5 w-5 text-primary" /><span>Mon - Sat: 8AM - 9PM</span></div>
            </div>
          </div>
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Input placeholder="Subject" required />
              <Textarea placeholder="Your Message" rows={4} required />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
