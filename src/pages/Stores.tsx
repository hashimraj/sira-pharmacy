import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { stores } from '@/data/mockData';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Stores = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Find a Store</h1>
        <p className="text-muted-foreground text-lg">Visit any of our pharmacy locations for in-person service.</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-6">
        {stores.map(store => (
          <Card key={store.id} variant="hover" className="p-6">
            <h2 className="text-xl font-bold mb-4">{store.name}</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />{store.address}, {store.city}</p>
              <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" />{store.phone}</p>
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" />{store.email}</p>
              <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div><p>Mon-Fri: {store.openingHours.weekdays}</p><p>Sat: {store.openingHours.saturday}</p><p>Sun: {store.openingHours.sunday}</p></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </Layout>
);

export default Stores;
