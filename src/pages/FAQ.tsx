import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How do I place an order?', a: 'Browse our products, add items to your cart, and proceed to checkout. You can pay via M-Pesa, card, or cash on delivery.' },
  { q: 'What are your delivery options?', a: 'We offer same-day delivery in Nairobi for orders placed before 2 PM. Free delivery on orders over KES 3,000.' },
  { q: 'How do I upload a prescription?', a: 'Go to our Prescriptions page and upload a clear photo of your prescription. Our pharmacists will review and contact you within 2 hours.' },
  { q: 'Can I return products?', a: 'Yes, unopened products can be returned within 7 days. Prescription medications cannot be returned for safety reasons.' },
  { q: 'Are your products genuine?', a: 'Yes, we only source products from authorized distributors and manufacturers. All products are 100% genuine and properly stored.' },
  { q: 'How do consultations work?', a: 'Book a consultation online, and our licensed pharmacist will call you at the scheduled time to discuss your health concerns.' },
];

const FAQ = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">Find answers to common questions about our services.</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4">
            <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </Layout>
);

export default FAQ;
