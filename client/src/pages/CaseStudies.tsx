import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Case Studies"
        description="Real transformation outcomes from Stiemfield's convergence model. See how organizations achieved 3x revenue growth, 40% efficiency gains, and Series B funding through the STIEM Framework."
        path="/case-studies"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Case Studies — Stiemfield Transformation Outcomes",
          "description": "Real transformation outcomes from Stiemfield's convergence model across fintech, manufacturing, and high-growth tech sectors.",
          "url": "https://www.stiemfield.com/case-studies",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.stiemfield.com" },
              { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://www.stiemfield.com/case-studies" }
            ]
          }
        }}
      />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/stiemfield-logo.jpg"
              alt="Stiemfield"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-display text-xl font-semibold text-accent">STIEMFIELD</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover-gold text-sm font-medium">Home</a>
            <a href="/about" className="hover-gold text-sm font-medium">About</a>
            <a href="/insights" className="hover-gold text-sm font-medium">Insights</a>
            <a href="/contact"><Button className="btn-premium text-xs">Get Started</Button></a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden texture-bg">
        <div className="absolute inset-0 opacity-15">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/case-study-visual-nTCFLNZ32S3mWDBH6Z5rzR.webp"
            alt="Case Studies"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 py-16">
          <div className="max-w-3xl space-y-6">
            <div className="accent-line"></div>
            <h1 className="text-6xl md:text-7xl font-display font-bold leading-tight">
              Transformation <span className="text-accent">That Compounds</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real organizations. Real results. Real convergence. See how the STIEM framework produces transformation that sticks.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding bg-background">
        <div className="container">
          {/* Case Study 1 */}
          <div className="mb-24 pb-24 border-b border-border">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <span className="text-accent text-sm font-semibold uppercase tracking-wider">Case Study 01</span>
                  <h2 className="text-4xl font-display font-bold mt-2 mb-4">Global Fintech Scale-Up</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    A multi-market fintech with strong product but fragmented operations. Strategy, technology, and execution were misaligned — stalling growth.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-accent">The Challenge</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Revenue stalling despite strong product-market fit</li>
                    <li>• Strategy not translating to execution</li>
                    <li>• Leadership misaligned on priorities</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-accent">The Intervention</h3>
                  <p className="text-muted-foreground text-sm">
                    Fieldscan diagnosed the pattern. Fieldforce activated a 12-month convergence program across all five STIEM forces.
                  </p>
                </div>

                <a href="/contact?service=fieldscan">
                  <Button className="btn-premium flex items-center gap-2">
                    Read Full Case Study <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>

              <div className="bg-card border border-border rounded-lg p-10 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-accent uppercase text-xs tracking-wider">Results</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-4xl font-bold text-accent">3x</p>
                      <p className="text-muted-foreground text-sm mt-1">Revenue growth in 18 months</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">65%</p>
                      <p className="text-muted-foreground text-sm mt-1">Reduction in time-to-market</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">8x</p>
                      <p className="text-muted-foreground text-sm mt-1">ROI on Stiemfield engagement</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">92%</p>
                      <p className="text-muted-foreground text-sm mt-1">Employee engagement increase</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "Stiemfield didn't just diagnose our problem—they solved it. Within 12 months, we went from fragmented to converged. Revenue grew 3x. But more importantly, we now have the organizational capacity to sustain that growth."
                  </p>
                  <p className="text-accent font-semibold text-sm mt-4">— CEO, Pan-African Fintech</p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="mb-24 pb-24 border-b border-border">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-card border border-border rounded-lg p-10 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-accent uppercase text-xs tracking-wider">Results</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-4xl font-bold text-accent">45%</p>
                      <p className="text-muted-foreground text-sm mt-1">Cost reduction through efficiency</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">2.5x</p>
                      <p className="text-muted-foreground text-sm mt-1">Faster product development cycle</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">78%</p>
                      <p className="text-muted-foreground text-sm mt-1">Improvement in customer satisfaction</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">6x</p>
                      <p className="text-muted-foreground text-sm mt-1">ROI on transformation investment</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "We tried digital transformation before. It failed. Stiemfield's convergence model worked because it addressed the real problem: our management system couldn't absorb the change. Now we're a truly digital organization."
                  </p>
                  <p className="text-accent font-semibold text-sm mt-4">— COO, Manufacturing Group</p>
                </div>
              </div>

              <div className="order-1 md:order-2 space-y-8">
                <div>
                  <span className="text-accent text-sm font-semibold uppercase tracking-wider">Case Study 02</span>
                  <h2 className="text-4xl font-display font-bold mt-2 mb-4">Manufacturing Transformation</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    A legacy manufacturer with strong market position but failed digital transformation. Technology was being implemented without management readiness.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-accent">The Challenge</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Previous digital transformation initiative failed</li>
                    <li>• Deep organizational resistance to change</li>
                    <li>• Uncompetitive cost structure</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-accent">The Intervention</h3>
                  <p className="text-muted-foreground text-sm">
                    Fieldscan revealed the root cause. Fieldforce rebuilt the organization using the convergence model — aligning technology with management readiness.
                  </p>
                </div>

                <a href="/contact?service=fieldscan">
                  <Button className="btn-premium flex items-center gap-2">
                    Read Full Case Study <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Case Study 3 */}
          <div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <span className="text-accent text-sm font-semibold uppercase tracking-wider">Case Study 03</span>
                  <h2 className="text-4xl font-display font-bold mt-2 mb-4">High-Growth Tech Startup</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Brilliant founders, strong innovation — but chaotic execution and no management systems. The founder-led model wasn't scaling.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-accent">The Challenge</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Hypergrowth creating organizational chaos</li>
                    <li>• No strategic direction beyond product</li>
                    <li>• Execution inconsistent and unpredictable</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-accent">The Intervention</h3>
                  <p className="text-muted-foreground text-sm">
                    Fieldscan identified the gap. Fieldforce built all five STIEM forces in parallel — giving the startup enterprise-grade infrastructure without losing its edge.
                  </p>
                </div>

                <a href="/contact?service=fieldscan">
                  <Button className="btn-premium flex items-center gap-2">
                    Read Full Case Study <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>

              <div className="bg-card border border-border rounded-lg p-10 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-accent uppercase text-xs tracking-wider">Results</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-4xl font-bold text-accent">10x</p>
                      <p className="text-muted-foreground text-sm mt-1">Valuation increase in 24 months</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">5x</p>
                      <p className="text-muted-foreground text-sm mt-1">Team growth with 90% retention</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">3x</p>
                      <p className="text-muted-foreground text-sm mt-1">Increase in execution velocity</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent">Series B</p>
                      <p className="text-muted-foreground text-sm mt-1">Funding successfully closed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "Stiemfield helped us scale from startup to enterprise without losing our edge. The STIEM framework gave us the architecture to grow while staying innovative. We're now a serious company."
                  </p>
                  <p className="text-accent font-semibold text-sm mt-4">— Founder & CEO, Tech Startup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="section-padding bg-card">
        <div className="container">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Aggregate Impact</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <TrendingUp className="w-8 h-8 text-accent mx-auto" />
              <p className="text-4xl font-bold text-accent">50+</p>
              <p className="text-muted-foreground">Transformations Completed</p>
            </div>
            <div className="text-center space-y-3">
              <TrendingUp className="w-8 h-8 text-accent mx-auto" />
              <p className="text-4xl font-bold text-accent">$2.3B</p>
              <p className="text-muted-foreground">Client Value Created</p>
            </div>
            <div className="text-center space-y-3">
              <TrendingUp className="w-8 h-8 text-accent mx-auto" />
              <p className="text-4xl font-bold text-accent">8x</p>
              <p className="text-muted-foreground">Average ROI</p>
            </div>
            <div className="text-center space-y-3">
              <TrendingUp className="w-8 h-8 text-accent mx-auto" />
              <p className="text-4xl font-bold text-accent">18+</p>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background texture-bg">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl font-display font-bold">
            Ready to Write Your <span className="text-accent">Success Story</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start with Fieldscan. Discover where your five forces are misaligned. Build a roadmap for transformation that compounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="/contact?service=fieldscan"><Button className="btn-premium">Start Your Fieldscan</Button></a>
            <a href="https://calendly.com/asarpaul8/30min" target="_blank" rel="noopener noreferrer"><Button className="btn-primary-outline">Schedule a Call</Button></a>
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
                  src="/stiemfield-logo.jpg"
                  alt="Stiemfield"
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="font-display font-semibold text-accent">STIEMFIELD</span>
              </div>
              <p className="text-sm text-muted-foreground">Convergence Firm</p>
              <p className="text-xs text-muted-foreground mt-2">terungwa@stiemfield.com</p>
              <p className="text-xs text-muted-foreground">Central Business District, Abuja (Virtual)</p>
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
                <li><a href="https://linkedin.com/in/terungwa-asar" target="_blank" rel="noopener noreferrer" className="hover-gold">LinkedIn</a></li>
                <li><a href="mailto:terungwa@stiemfield.com" className="hover-gold">Email</a></li>
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
