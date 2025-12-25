import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Clock,
} from 'lucide-react';
const PHONE_NUMBER = '0114542511';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'Skincare', href: '/shop?category=skincare' },
      { label: 'Medicines', href: '/shop?category=otc-medicines' },
      { label: 'Supplements', href: '/shop?category=supplements' },
      { label: 'Personal Care', href: '/shop?category=personal-care' },
      { label: 'Baby & Mother', href: '/shop?category=baby-mother' },
      { label: 'Medical Devices', href: '/shop?category=medical-devices' },
    ],
    services: [
      { label: 'Consultations', href: '/consultations' },
      { label: 'Prescription Services', href: '/prescriptions' },
      { label: 'Health Conditions', href: '/conditions' },
      { label: 'Store Locator', href: '/stores' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'FAQs', href: '/faqs' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns Policy', href: '/returns' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl">
                Sira<span className="text-primary">Pharmacy</span>
              </span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed text-sm">
              Your trusted partner in health and wellness. We provide quality pharmaceutical products 
              and expert healthcare services to keep you and your family healthy.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                {PHONE_NUMBER}
              </a>
              <a href="mailto:info@sirapharmacy.co.ke" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                info@sirapharmacy.co.ke
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                Two Rivers & Thindigua, Nairobi
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Clock className="h-4 w-4 text-primary" />
                Mon - Sat: 8AM - 9PM
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-base mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-base mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-base mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-base mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} Sira Pharmacy. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
