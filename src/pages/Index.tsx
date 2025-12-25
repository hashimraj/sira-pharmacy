import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustBadges from '@/components/home/TrustBadges';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ServicesSection from '@/components/home/ServicesSection';
import ConditionsSection from '@/components/home/ConditionsSection';
import BrandsSection from '@/components/home/BrandsSection';
import CtaBanner from '@/components/home/CtaBanner';

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sira Pharmacy - Your Trusted Healthcare Partner</title>
        <meta name="description" content="Quality medicines, expert consultations, and personalized healthcare. Shop skincare, vitamins, supplements, and more at Sira Pharmacy." />
      </Helmet>
      
      <HeroCarousel />
      <TrustBadges />
      <CategoryGrid />
      <FeaturedProducts />
      <ServicesSection />
      <BrandsSection />
      <ConditionsSection />
      <CtaBanner />
    </Layout>
  );
};

export default Index;
