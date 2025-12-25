import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';

const Returns = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Returns Policy</h1>
        <p className="text-muted-foreground text-lg">We want you to be completely satisfied with your purchase.</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="p-8 space-y-6">
        <section><h2 className="text-xl font-bold mb-2">Return Window</h2><p className="text-muted-foreground">You may return unopened, unused products within 7 days of delivery for a full refund.</p></section>
        <section><h2 className="text-xl font-bold mb-2">Non-Returnable Items</h2><ul className="list-disc list-inside text-muted-foreground space-y-1"><li>Prescription medications</li><li>Opened or used products</li><li>Refrigerated items</li><li>Personal care items for hygiene reasons</li></ul></section>
        <section><h2 className="text-xl font-bold mb-2">How to Return</h2><p className="text-muted-foreground">Contact our customer service at +254 700 123 456 or email returns@sirapharmacy.co.ke with your order number. We'll arrange for pickup or provide drop-off instructions.</p></section>
        <section><h2 className="text-xl font-bold mb-2">Refund Process</h2><p className="text-muted-foreground">Refunds are processed within 5-7 business days after we receive the returned item. The amount will be credited to your original payment method.</p></section>
      </Card>
    </div>
  </Layout>
);

export default Returns;
