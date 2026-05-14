import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Users, TrendingUp, Lightbulb, CheckCircle } from "lucide-react";

/**
 * Stiemfield Home Page
 * Design System: Architectural Minimalism with Gold Accents
 * Positioning: Convergence Firm - Strategy, Technology, Innovation, Execution, Management
 * 
 * Key principles from handbook:
 * - Convergence over silos: all five forces operating simultaneously
 * - Results over reports: transformation that actually sticks
 * - Transformation is the outcome, not the service
 * - The Field is where five forces converge
 */

export default function Home() {
  const stiemForces = [
    {
      letter: "S",
      name: "Strategy",
      description: "The direction force — answering where to play and how to win. Defines competitive choices, constantly interrogated by the other four forces.",
      icon: Target
    },
    {
      letter: "T",
      name: "Technology",
      description: "The enabling force — digital and AI infrastructure. Technology enables strategy, powers innovation, makes execution measurable, gives management real-time visibility.",
      icon: Zap
    },
    {
      letter: "I",
      name: "Innovation",
      description: "The creative force — finding non-obvious paths to value. Prevents strategy from becoming conservative, execution from becoming merely efficient.",
      icon: Lightbulb
    },
    {
      letter: "E",
      name: "Execution",
      description: "The delivery force — the commitment that results are real. Covers project management, milestone tracking, accountability structures, real-time monitoring.",
      icon: CheckCircle
    },
    {
      letter: "M",
      name: "Management",
      description: "The sustaining force — building organizational capacity to own transformation. Without this, transformation collapses when consultants leave.",
      icon: Users
    }
  ];

  const coreValues = [
    {
      title: "Convergence over silos",
      description: "We hold all five forces together, always, because the client's problem does not respect disciplinary boundaries."
    },
    {
      title: "Results over reports",
      description: "Every engagement is measured against outcomes, not deliverables. Transformation that actually sticks."
    },
    {
      title: "Rigor with humility",
      description: "We bring the full weight of the STIEM framework to every problem, and we listen before we prescribe."
    },
    {
      title: "Grounded expertise",
      description: "We understand African business contexts deeply. That expertise translates globally. We serve organizations worldwide."
    },
    {
      title: "Trust as infrastructure",
      description: "Every Fieldscan, every Fieldforce program, every Fieldpartner relationship is a long-term trust investment, not a transaction."
    }
  ];

  const services = [
    {
      name: "Fieldscan",
      tagline: "The convergence diagnostic",
      description: "Where every engagement begins. Fieldscan answers the master question: why has this organization not yet transformed — and which of the five STIEM forces is most broken, most misaligned, or most absent?",
      duration: "4–8 weeks",
      delivery: "Fully virtual",
      output: "The Stiemfield Convergence Map",
      pricing: "Fixed fee",
      features: [
        "Stakeholder interviews across all five dimensions",
        "Document and data review",
        "Cross-force synthesis and pattern identification",
        "Prioritized intervention architecture",
        "Roadmap for next steps (Fieldforce or Fieldpartner)"
      ]
    },
    {
      name: "Fieldforce",
      tagline: "The transformation engine",
      description: "Convergence activated at full depth. Fieldforce takes the Convergence Map and runs the program that does the realigning. It manages interdependencies across all five forces simultaneously.",
      duration: "6–18 months",
      delivery: "Hybrid (virtual + in-person milestones)",
      output: "Measurable transformation across STIEM dimensions",
      pricing: "Outcome-based",
      features: [
        "Milestone gates across all five forces",
        "90-day quick wins + medium-term structural work",
        "Dynamic adjustment as execution reveals insights",
        "Real-time convergence architecture",
        "Embedded transformation program"
      ]
    },
    {
      name: "Fieldpartner",
      tagline: "The long game",
      description: "Retained convergence advisory at senior level. After transformation, organizations need sustained alignment. Fieldpartner is the monthly advisory relationship that keeps the five forces converged.",
      duration: "12+ months (ongoing)",
      delivery: "Monthly sessions + on-call advisory",
      output: "Sustained alignment across STIEM forces",
      pricing: "Monthly retainer",
      features: [
        "Monthly strategic sessions",
        "On-call advisory support",
        "Quarterly convergence reviews",
        "Trusted outside voice at leadership table",
        "Thinking partnership across all five dimensions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/stiemfield-logo_e689c952.jpg"
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
            <Button className="btn-premium text-xs">Get Started</Button>
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
              We are a global convergence consulting firm. We bring Strategy, Technology, Innovation, Execution, and Management into alignment on a single field. When those five forces converge, the outcome is transformation that actually sticks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="btn-premium flex items-center gap-2 text-base px-8 py-4">
                Start with Fieldscan <ArrowRight className="w-5 h-5" />
              </Button>
              <Button className="btn-primary-outline flex items-center gap-2 text-base px-8 py-4">
                Schedule a Call
              </Button>
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
                To produce organizational transformation by converging strategy, technology, innovation, execution, and management on a single client engagement — eliminating the fragmentation that makes transformation fail.
              </p>
            </div>
            <div className="space-y-6">
              <div className="accent-line"></div>
              <h2 className="text-4xl font-display font-bold">Our Vision</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To become the most trusted convergence firm globally — proving that integrated advisory across all five STIEM forces produces better transformation outcomes than any single-discipline alternative.
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
                The Field is the central concept of the Stiemfield model. It is the zone of convergence: the engagement space where all five STIEM forces operate simultaneously, share the same client context, and produce a unified output.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Field is not a physical place. It is an architectural commitment. When Stiemfield enters a client engagement, it does not bring a strategy team that later hands off to an execution team. It brings a convergence lens — one integrated understanding of the client across all five dimensions — and maintains that lens throughout the engagement.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                When five forces operate in a field together, they correct each other's blind spots in real time. Strategy that ignores execution constraints gets corrected before it becomes a plan. Technology choices that misalign with management capacity get caught before they become procurement decisions. Innovation that outpaces the organization's readiness gets calibrated before it becomes a distraction.
              </p>

              <div className="border-t border-border/50 pt-6">
                <p className="text-accent font-semibold italic">
                  "The Field is what the client buys. It is the reason Fieldscan, Fieldforce, and Fieldpartner all carry that word in their names."
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
                    <div>
                      <p className="text-accent font-semibold">Output</p>
                      <p className="text-muted-foreground">{service.output}</p>
                    </div>
                    <div>
                      <p className="text-accent font-semibold">Pricing</p>
                      <p className="text-muted-foreground">{service.pricing}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <div key={fidx} className="flex gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 border-t border-border/50">
                  <Button className="btn-premium w-full flex items-center justify-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
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
                Transformation is not what we sell. It is what we produce. When transformation is what you sell, you compete with every other firm that sells transformation. When transformation is what your model produces, you occupy a different position entirely: you are the firm whose architecture is designed to make transformation happen.
              </p>

              <div className="bg-background border border-border/50 rounded-lg p-8 space-y-4">
                <p className="font-semibold text-accent uppercase text-sm tracking-wider">Our Definition</p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transformation is a measurable, durable change in how the client organization competes, operates, or grows — a change that the organization can sustain and build upon after the engagement ends.
                </p>
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <p className="text-muted-foreground flex gap-3">
                    <span className="text-accent">✗</span>
                    <span>Not a reorganization that reverts</span>
                  </p>
                  <p className="text-muted-foreground flex gap-3">
                    <span className="text-accent">✗</span>
                    <span>Not a technology implementation that goes unused</span>
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
            <Button className="btn-premium">Start Your Fieldscan</Button>
            <Button className="btn-primary-outline">Schedule a Call</Button>
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
