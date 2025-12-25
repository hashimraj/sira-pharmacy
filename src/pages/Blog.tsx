import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const articles = [
  { id: 1, title: '10 Tips for Healthy Skin This Summer', category: 'Skincare', date: 'Jan 15, 2024', excerpt: 'Protect your skin from the sun and keep it hydrated with these expert tips.', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400' },
  { id: 2, title: 'Understanding Your Blood Pressure Numbers', category: 'Health', date: 'Jan 10, 2024', excerpt: 'Learn what your blood pressure readings mean and when to seek help.', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400' },
  { id: 3, title: 'Vitamins You Need for Immune Support', category: 'Supplements', date: 'Jan 5, 2024', excerpt: 'Boost your immune system with these essential vitamins and minerals.', image: 'https://images.unsplash.com/photo-1556228724-4cc9f64f3a3b?w=400' },
  { id: 4, title: 'Managing Diabetes: A Comprehensive Guide', category: 'Health', date: 'Dec 28, 2023', excerpt: 'Everything you need to know about managing diabetes effectively.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400' },
];

const Blog = () => (
  <Layout>
    <div className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Health Blog</h1>
        <p className="text-muted-foreground text-lg">Expert health tips, guides, and wellness advice.</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <Card key={article.id} variant="hover" className="overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="soft">{article.category}</Badge>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
              <h2 className="font-bold text-lg mb-2">{article.title}</h2>
              <p className="text-muted-foreground text-sm">{article.excerpt}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </Layout>
);

export default Blog;
