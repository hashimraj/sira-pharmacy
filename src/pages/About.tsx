import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Shield, Heart, Users, Award } from 'lucide-react';

const About = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About Sira Pharmacy</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Your trusted partner in health and wellness since 2010.</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-muted-foreground mb-4">Sira Pharmacy was founded with a simple mission: to make quality healthcare accessible to everyone. What started as a small neighborhood pharmacy has grown into a trusted healthcare destination serving thousands of customers across Kenya.</p>
        <p className="text-muted-foreground">Today, we continue to uphold our founding principles of quality, care, and community. Our team of licensed pharmacists and healthcare professionals are committed to providing expert advice and personalized service to every customer.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Shield, title: 'Quality Assured', desc: '100% genuine products from trusted brands' },
          { icon: Heart, title: 'Patient Care', desc: 'Your health is our top priority' },
          { icon: Users, title: 'Expert Team', desc: 'Licensed pharmacists ready to help' },
          { icon: Award, title: 'Trusted Service', desc: 'Serving Kenya since 2010' },
        ].map(item => (
          <Card key={item.title} className="p-6 text-center">
            <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </Layout>
);

export default About;
