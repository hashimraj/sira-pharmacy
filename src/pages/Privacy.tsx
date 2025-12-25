import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';

const Privacy = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-lg">Last updated: January 2024</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="p-8 prose prose-sm max-w-none">
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly, including name, email, phone number, delivery address, and payment information when you make a purchase or create an account.</p>
        <h2>How We Use Your Information</h2>
        <p>We use your information to process orders, provide customer service, send order updates, and improve our services. We never sell your personal information to third parties.</p>
        <h2>Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.</p>
        <h2>Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. Contact us at privacy@sirapharmacy.co.ke for any privacy-related requests.</p>
      </Card>
    </div>
  </Layout>
);

export default Privacy;
