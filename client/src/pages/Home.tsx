import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Users, TrendingUp, Lightbulb, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function Home() {
  useAnalytics();
  const stiemForces = [
    {
      letter: "S",
      name: "Strategy",
      description: "The direction force — where to play and how to win.",
      icon: Target
    },
    {
      letter: "T",
      name: "Technology",
      description: "The enabling force — digital infrastructure that powers everything else.",
      icon: Zap
    },
    {
      letter: "I",
      name: "Innovation",
      description: "The creative force — finding non-obvious paths to value.",
      icon: Lightbulb
    },
    {
      letter: "E",
      name: "Execution",
      description: "The delivery force — the commitment that results are real.",
      icon: CheckCircle
    },
    {
      letter: "M",
      name: "Management",
      description: "The sustaining force — building capacity to own the transformation.",
      icon: Users
    }
  ];

  const coreValues = [
    {
      title: "Convergence over silos",
      description: "All five forces operate together because real problems don't respect disciplinary boundaries."
    },
    {
      title: "Results over reports",
      description: "We measure success against outcomes, not deliverables."
    },
    {
      title: "Rigor with humility",
      description: "We listen before we prescribe."
    },
    {
      title: "Grounded expertise",
      description: "Deep African context. Global application."
    },
    {
      title: "Trust as infrastructure",
      description: "Long-term partnership, not a transaction."
    }
  ];

  const services = [
    {
      name: "Fieldscan",
      tagline: "The convergence diagnostic",
      description: "The entry point. A focused diagnostic that identifies which STIEM forces are misaligned and why transformation hasn't happened yet.",
      duration: "4–8 weeks",
      delivery: "Fully virtual",
      output: "The Stiemfield Convergence Map"
    },
    {
      name: "Fieldforce",
      tagline: "The transformation engine",
      description: "Full-depth convergence activation. We take the diagnostic and run the program that realigns all five forces simultaneously.",
      duration: "3–12 months",
      delivery: "Hybrid",
      output: "Measurable transformation across STIEM dimensions"
    },
    {
      name: "Fieldpartner",
      tagline: "The long game",
      description: "Retained advisory at senior level. Monthly sessions and on-call support to keep the five forces aligned after transformation.",
      duration: "6+ months",
      delivery: "Monthly sessions + on-call",
      output: "Sustained STIEM alignment"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Global Convergence Consulting Firm"
        description="Stiemfield converges Strategy, Technology, Innovation, Execution, and Management on a single field to produce organizational transformation that actually sticks. Rooted in Africa, serving globally."
        path="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Stiemfield — Global Convergence Consulting Firm",
          "description": "Stiemfield converges Strategy, Technology, Innovation, Execution, and Management on a single field to produce organizational transformation that actually sticks.",
          "url": "https://www.stiemfield.com",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.stiemfield.com" }]
          }
        }}
      />
      {/* Navigation */}
      <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <img 
              src="/stiemfield-logo.png"
              alt="Stiemfield"
              className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform"
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
      <section className="relative min-h-screen flex items-center overflow-hidden texture-bg">
        <div className="absolute inset-0 opacity-15">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/hero-convergence-FPkFvMpvjPfpfXvMFbKEZ6.webp"
            alt="Convergence"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 py-20">
          <div className="max-w-4xl space-y-8">
            <div className="accent-line"></div>
            <h1 className="text-7xl md:text-8xl font-display font-bold leading-tight">
              Convergence on a <span className="text-accent">Single Field</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              We converge Strategy, Technology, Innovation, Execution, and Management on a single field. When those five forces align, transformation actually sticks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/contact?service=fieldscan">
                <Button className="btn-premium flex items-center gap-2 text-base px-8 py-4">
                  Start with Fieldscan <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://calendly.com/asarpaul8/30min" target="_blank" rel="noopener noreferrer">
                <Button className="btn-primary-outline flex items-center gap-2 text-base px-8 py-4">
                  Schedule a Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="accent-line"></div>
              <h2 className="text-4xl font-display font-bold">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To produce organizational transformation by converging all five STIEM forces on a single engagement — eliminating the fragmentation that makes transformation fail.
              </p>
            </div>
            <div className="space-y-6">
              <div className="accent-line"></div>
              <h2 className="text-4xl font-display font-bold">Our Vision</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To become the most trusted convergence firm globally — proving that integrated advisory produces better outcomes than any single-discipline alternative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container">
          <h2 className="text-5xl font-display font-bold mb-16 text-center">Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors space-y-4">
                <h3 className="text-xl font-display font-bold text-accent">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Field Concept */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="accent-line mx-auto"></div>
              <h2 className="text-5xl font-display font-bold">The Field</h2>
              <p className="text-lg text-muted-foreground">Where five forces become one</p>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-12 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Field is the zone of convergence — where all five STIEM forces operate simultaneously on a single client engagement, producing a unified output rather than siloed handoffs.
              </p>

              <div className="border-t border-border/50 pt-6">
                <p className="text-accent font-semibold italic">
                  "The Field is what the client buys. It's why every service carries that word in its name."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STIEM Framework */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <div className="accent-line mx-auto"></div>
            <h2 className="text-5xl font-display font-bold">The STIEM Framework</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five forces operating simultaneously. One unified vision. Transformation that compounds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {stiemForces.map((force, idx) => {
              const Icon = force.icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 space-y-4 group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                      <span className="text-2xl font-display font-bold text-accent">{force.letter}</span>
                    </div>
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">{force.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{force.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <div className="accent-line mx-auto"></div>
            <h2 className="text-5xl font-display font-bold">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three distinct services. One integrated client journey. From diagnostic entry through transformation delivery to long-term partnership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-background border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 flex flex-col">
                <div className="p-8 space-y-4 flex-1">
                  <div>
                    <p className="text-accent text-sm font-semibold uppercase tracking-wider">Service {idx + 1}</p>
                    <h3 className="text-3xl font-display font-bold mt-2">{service.name}</h3>
                    <p className="text-accent text-sm mt-2 italic">{service.tagline}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50 text-sm">
                    <div>
                      <p className="text-accent font-semibold">Duration</p>
                      <p className="text-muted-foreground">{service.duration}</p>
                    </div>
                    <div>
                      <p className="text-accent font-semibold">Delivery</p>
                      <p className="text-muted-foreground">{service.delivery}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-accent font-semibold">Output</p>
                      <p className="text-muted-foreground">{service.output}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 border-t border-border/50">
                  <a href={`/contact?service=${service.name.toLowerCase()}`}>
                    <Button className="btn-premium w-full flex items-center justify-center gap-2">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Definition */}
      <section className="section-padding bg-background texture-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="accent-line mx-auto"></div>
              <h2 className="text-5xl font-display font-bold">What is Transformation?</h2>
            </div>

            <div className="bg-card border border-border rounded-lg p-12 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Transformation is not what we sell — it's what our model produces. A measurable, durable change in how your organization competes, operates, or grows.
              </p>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <p className="text-muted-foreground flex gap-3">
                  <span className="text-accent">✗</span>
                  <span>Not a reorganization that reverts</span>
                </p>
                <p className="text-muted-foreground flex gap-3">
                  <span className="text-accent">✗</span>
                  <span>Not a strategy document that sits on a shelf</span>
                </p>
                <p className="text-accent flex gap-3 pt-2 font-semibold">
                  <span>✓</span>
                  <span>Transformation that compounds</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container text-center space-y-8">
          <h2 className="text-5xl font-display font-bold">
            Ready to Converge Your <span className="text-accent">Organization</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every transformation begins with a Fieldscan. Discover where your five forces are misaligned. Build a roadmap for transformation that compounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="/contact?service=fieldscan"><Button className="btn-premium">Start Your Fieldscan</Button></a>
            <a href="https://calendly.com/asarpaul8/30min" target="_blank" rel="noopener noreferrer"><Button className="btn-primary-outline">Schedule a Call</Button></a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
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
                <li><a href="#fieldscan" className="hover-gold">Fieldscan</a></li>
                <li><a href="#fieldforce" className="hover-gold">Fieldforce</a></li>
                <li><a href="#fieldpartner" className="hover-gold">Fieldpartner</a></li>
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
