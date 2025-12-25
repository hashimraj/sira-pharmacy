// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  fullDescription?: string;
  ingredients?: string;
  howToUse?: string;
  warnings?: string;
  inStock: boolean;
  isPrescriptionRequired: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  skinType?: string[];
  condition?: string[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

export type ProductCategory =
  | 'skincare'
  | 'prescription-medicines'
  | 'otc-medicines'
  | 'supplements'
  | 'personal-care'
  | 'baby-mother'
  | 'medical-devices'
  | 'sexual-health'
  | 'eye-ear-dental'
  | 'health-conditions'
  | 'wellness'
  | 'offers';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
  image?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

// Consultation Types
export interface ConsultationService {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  icon: string;
}

export interface ConsultationBooking {
  id: string;
  service: ConsultationService;
  date: string;
  time: string;
  patientName: string;
  email: string;
  phone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

// Prescription Types
export interface Prescription {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'reviewing' | 'ready' | 'collected';
  patientName: string;
  phone: string;
  notes?: string;
}

// Store Types
export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Health Condition Types
export interface HealthCondition {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  relatedProducts: string[];
  articles: HealthArticle[];
}

export interface HealthArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
  featured?: boolean;
}

// Search Types
export interface SearchResult {
  type: 'product' | 'category' | 'article' | 'service';
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  href: string;
}
