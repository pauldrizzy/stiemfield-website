import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

/**
 * Stiemfield Insights Page
 * Design System: Architectural Minimalism with Gold Accents
 * Thought leadership and industry perspectives
 */

interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

const insights: InsightArticle[] = [
  {
    id: "1",
    title: "Why Single-Discipline Consulting Fails Transformation",
    excerpt: "Most organizations fail at transformation not because their strategy is wrong, but because strategy, technology, execution, and management are misaligned. We explore why convergence is the only model that works.",
    author: "Stiemfield Team",
    date: "April 10, 2026",
    category: "Transformation",
    readTime: "8 min read"
  },
  {
    id: "2",
    title: "Transformation Expertise: From African Context to Global Scale",
    excerpt: "Organizations that master transformation in complex African markets develop capabilities that translate globally. We share how deep expertise in challenging contexts becomes a competitive advantage worldwide.",
    author: "Stiemfield Team",
    date: "April 3, 2026",
    category: "Strategy",
    readTime: "6 min read"
  },
  {
    id: "3",
    title: "Technology Without Management is Just Expensive Failure",
    excerpt: "Digital transformation initiatives fail at alarming rates. The missing piece isn't better technology—it's management systems that can absorb and sustain change. Here's how to fix it.",
    author: "Stiemfield Team",
    date: "March 28, 2026",
    category: "Technology",
    readTime: "7 min read"
  },
  {
    id: "4",
    title: "Execution Accountability: From Strategy to Results",
    excerpt: "Strategy documents sit on shelves. Innovation initiatives stall. The difference between firms that transform and those that don't is execution discipline. We break down the framework.",
    author: "Stiemfield Team",
    date: "March 21, 2026",
    category: "Execution",
    readTime: "9 min read"
  },
  {
    id: "5",
    title: "Building Innovation Capability That Lasts",
    excerpt: "Innovation isn't a one-time initiative. Organizations that sustain competitive advantage build innovation into their operating model. Here's how to make it permanent.",
    author: "Stiemfield Team",
    date: "March 14, 2026",
    category: "Innovation",
    readTime: "7 min read"
  },
  {
    id: "6",
    title: "The Five Forces Framework: From Diagnosis to Delivery",
    excerpt: "Understanding where your organization is broken is the first step. But diagnosis without a clear delivery roadmap is just another consultant report. We explain how we bridge that gap.",
    author: "Stiemfield Team",
    date: "March 7, 2026",
    category: "Framework",
    readTime: "10 min read"
  }
];

export default function Insights() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/stiemfield-logo_e689c952.jpg"
              alt="Stiemfield"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-display text-xl font-semibold text-accent">STIEMFIELD</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover-gold text-sm font-medium">Home</a>
            <a href="/about" className="hover-gold text-sm font-medium">About</a>
            <a href="/case-studies" className="hover-gold text-sm font-medium">Case Studies</a>
            <a href="/contact" className="hover-gold text-sm font-medium">Contact</a>
            <Button className="btn-premium text-xs">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding bg-card texture-bg">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-display font-bold">
            Insights & <span className="text-accent">Perspectives</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thought leadership on transformation, strategy, technology, and organizational change. Grounded in real engagements. Focused on what actually works.
          </p>
          <div className="accent-line mx-auto"></div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-up">
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Featured</span>
              <h2 className="text-4xl font-display font-bold">
                Why Single-Discipline Consulting Fails Transformation
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Most organizations fail at transformation not because their strategy is wrong, but because strategy, technology, innovation, execution, and management are misaligned. We explore why convergence across all five forces is the only model that works.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>April 10, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Stiemfield Team</span>
                </div>
                <span>8 min read</span>
              </div>
              <Button className="btn-premium flex items-center gap-2 w-fit">
                Read Article <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-24 h-24 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">📊</span>
                </div>
                <p>Featured article visual</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-card">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-12">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((article) => (
              <article 
                key={article.id}
                className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold">{article.author}</p>
                    <p>{article.date}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-8">Browse by Topic</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {["All", "Transformation", "Strategy", "Technology", "Execution"].map((category) => (
              <button
                key={category}
                className="py-3 px-6 border border-border rounded-lg hover:border-accent hover:bg-card transition-all duration-300 text-sm font-semibold"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-card texture-bg">
        <div className="container max-w-2xl text-center space-y-8">
          <h2 className="text-4xl font-display font-bold">
            Stay Updated
          </h2>
          <p className="text-muted-foreground text-lg">
            Get insights on transformation, strategy, and organizational change delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
            <Button className="btn-premium">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/stiemfield-logo_e689c952.jpg"
                  alt="Stiemfield"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-display font-semibold text-accent">STIEMFIELD</span>
              </div>
              <p className="text-sm text-muted-foreground">Convergence Firm</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover-gold">Fieldscan</a></li>
                <li><a href="/" className="hover-gold">Fieldforce</a></li>
                <li><a href="/" className="hover-gold">Fieldpartner</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover-gold">About</a></li>
                <li><a href="/case-studies" className="hover-gold">Case Studies</a></li>
                <li><a href="/contact" className="hover-gold">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover-gold">LinkedIn</a></li>
                <li><a href="#" className="hover-gold">Twitter</a></li>
                <li><a href="#" className="hover-gold">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 Stiemfield. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover-gold">Privacy Policy</a>
              <a href="#" className="hover-gold">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
