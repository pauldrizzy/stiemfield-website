import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="About"
        description="Stiemfield is a global convergence consulting firm rooted in Africa. Learn why convergence across Strategy, Technology, Innovation, Execution, and Management produces transformation that sticks."
        path="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Stiemfield",
          "description": "The story behind the convergence model — why Stiemfield exists and how five forces operating on a single field produce transformation that compounds.",
          "url": "https://www.stiemfield.com/about",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.stiemfield.com" },
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.stiemfield.com/about" }
            ]
          }
        }}
      />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/stiemfield-logo.png"
              alt="Stiemfield"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-display text-xl font-semibold text-accent">STIEMFIELD</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover-gold text-sm font-medium">Home</a>
            <a href="/about" className="hover-gold text-sm font-medium">About</a>
            <a href="/case-studies" className="hover-gold text-sm font-medium">Case Studies</a>
            <a href="/insights" className="hover-gold text-sm font-medium">Insights</a>
            <a href="/contact" className="hover-gold text-sm font-medium">Contact</a>
            <a href="/contact"><Button className="btn-premium text-xs">Get Started</Button></a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden texture-bg">
        <div className="absolute inset-0 opacity-15">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/about-hero-background-AY5aeU3sEJQFiEnTBDwtid.webp"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl space-y-6">
            <div className="accent-line"></div>
            <h1 className="text-6xl md:text-7xl font-display font-bold leading-tight">
              Why <span className="text-accent">Convergence</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Most consulting firms are organized around a single discipline. We are organized around the client's actual problem — which never respects disciplinary boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* The Origin Story */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold">The Origin</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stiemfield was born from a simple observation: when Strategy, Technology, Innovation, Execution, and Management operate in silos, even brilliant work in each silo produces mediocre results. The problem was never the quality of work — it was the architecture.
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-12 space-y-6">
              <h3 className="text-2xl font-display font-bold text-accent">The Insight</h3>
              <p className="text-muted-foreground leading-relaxed">
                What if those five forces operated simultaneously on a single field instead of sequentially? That insight became Stiemfield — a firm whose architecture is designed to produce transformation, not just sell it.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold">Global Firm, Rooted in Africa</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We built our expertise where transformation challenges are hardest — and that insight translates globally. Deep African context. Worldwide application.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold">How We Work</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every engagement starts with Fieldscan, activates through Fieldforce, and sustains with Fieldpartner. No handoffs. No shelf reports. Transformation that compounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="accent-line mx-auto"></div>
              <h2 className="text-4xl font-display font-bold">The Founder</h2>
              <p className="text-lg text-muted-foreground">Solo convergence practice. Full attention. Complete STIEM lens.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-48 h-48 flex-shrink-0 rounded-lg bg-gradient-to-br from-accent to-accent/60 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/team-placeholder-MJxjWo78SHZJsY9DKbCF5D.webp"
                  alt="Founder"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-display font-bold mb-2">Terungwa Paul Asar</h3>
                  <p className="text-accent text-sm font-semibold mb-4">Founding Partner & Convergence Architect</p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    BSc Business Management. Built the STIEM Framework from hands-on experience managing multi-stakeholder transformation programs across Nigeria — where the gap between strategy and execution is sharpest. Stiemfield is his direct response to the transformation failure problem.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <p className="text-accent font-semibold text-sm uppercase tracking-wider">Why Solo?</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every client engages directly with the full STIEM lens. No handoffs. No dilution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Deep Dive */}
      <section className="section-padding bg-card">
        <div className="container">
          <h2 className="text-4xl font-display font-bold mb-16 text-center">How We Operate</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Convergence Over Silos</h3>
              <p className="text-muted-foreground leading-relaxed">
                All five forces operate together because transformation requires it.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Results Over Reports</h3>
              <p className="text-muted-foreground leading-relaxed">
                We measure outcomes, not deliverables.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Rigor With Humility</h3>
              <p className="text-muted-foreground leading-relaxed">
                We listen before we prescribe. Your organization knows itself best.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Context as Advantage</h3>
              <p className="text-muted-foreground leading-relaxed">
                African complexity isn't a constraint — it's the source of our deepest insight.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Trust as Infrastructure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Long-term partnership, not a transaction.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Transformation That Compounds</h3>
              <p className="text-muted-foreground leading-relaxed">
                We measure success five years later, not at the end of an engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background texture-bg">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl font-display font-bold">
            Let's Build <span className="text-accent">Transformation Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start with Fieldscan. Discover where your five forces are misaligned. Build a roadmap for transformation that compounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="/contact?service=fieldscan">
              <Button className="btn-premium flex items-center gap-2 mx-auto">
                Start Your Fieldscan <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
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
                  src="/stiemfield-logo.png"
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
                <li><a href="/insights" className="hover-gold">Insights</a></li>
                <li><a href="/" className="hover-gold">Contact</a></li>
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
