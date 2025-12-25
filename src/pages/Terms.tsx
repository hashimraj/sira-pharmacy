import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';

const Terms = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground text-lg">Last updated: January 2024</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="p-8 prose prose-sm max-w-none">
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using Sira Pharmacy's website and services, you agree to be bound by these Terms of Service.</p>
        <h2>Products and Services</h2>
        <p>All products are subject to availability. Prescription medications require a valid prescription from a licensed healthcare provider. We reserve the right to refuse service to anyone.</p>
        <h2>Pricing and Payment</h2>
        <p>Prices are in Kenyan Shillings (KES) and are subject to change without notice. Payment must be made at the time of order or upon delivery for COD orders.</p>
        <h2>Limitation of Liability</h2>
        <p>Sira Pharmacy is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Always consult a healthcare professional before using any medication.</p>
      </Card>
    </div>
  </Layout>
);

export default Terms;
