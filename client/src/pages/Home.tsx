import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Lightbulb, Rocket, Users, CheckCircle2, Quote } from "lucide-react";

/**
 * Stiemfield Home Page - Premium Edition
 * Design System: Architectural Minimalism with Gold Accents
 * Enhanced with better storytelling, animations, and visual hierarchy
 */

export default function Home() {
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

      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center justify-between overflow-hidden texture-bg">
        <div className="absolute inset-0 opacity-15">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/hero-convergence-9qT7Vrn5J32zfuenb7xt5c.webp"
            alt="Convergence"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 py-20 md:py-0">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 fade-in-up">
              <div className="space-y-4">
                <div className="accent-line"></div>
                <h1 className="text-6xl md:text-7xl font-display font-bold leading-tight">
                  Convergence <span className="text-accent">on a Single Field</span>
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Five forces operating simultaneously. One unified vision. Transformation that compounds. We bring Strategy, Technology, Innovation, Execution, and Management into perfect alignment—eliminating the fragmentation that makes transformation fail.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="btn-premium flex items-center gap-2">
                  Start with Fieldscan <ArrowRight className="w-4 h-4" />
                </Button>
                <Button className="btn-premium-outline">Schedule Call</Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
                <div>
                  <p className="text-2xl font-bold text-accent">50+</p>
                  <p className="text-xs text-muted-foreground">Transformations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">8x</p>
                  <p className="text-xs text-muted-foreground">Avg ROI</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">18+</p>
                  <p className="text-xs text-muted-foreground">Countries</p>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="hidden md:flex items-center justify-center">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/stiem-framework-visual-9yJ7x3A5kYCcgf49rRUmF3.webp"
                alt="STIEM Framework Convergence"
                className="w-full max-w-md opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8 mb-16">
            <h2 className="text-4xl font-display font-bold">The Fragmentation Problem</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Most organizations fail at transformation not because their strategy is wrong, their technology is outdated, or their team lacks capability. They fail because these forces operate in silos, each pursuing their own logic, creating misalignment that compounds into failure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Strategy Without Execution</h3>
              <p className="text-sm text-muted-foreground">Beautiful plans that never ship. Brilliant strategies that become shelf-ware because execution capacity was never built in.</p>
            </div>

            <div className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Technology Without Management</h3>
              <p className="text-sm text-muted-foreground">Expensive systems that go unused. Digital transformation initiatives that fail because the organization can't absorb the change.</p>
            </div>

            <div className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Innovation Without Integration</h3>
              <p className="text-sm text-muted-foreground">Brilliant ideas that don't scale. Innovation that outpaces the organization's readiness, creating distraction instead of value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-display font-bold">Who We Are</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="text-accent font-semibold mb-2 text-lg">Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To produce organizational transformation by converging strategy, technology, innovation, execution, and management on a single client engagement — eliminating the fragmentation that makes transformation fail.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h3 className="text-accent font-semibold mb-2 text-lg">Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the most trusted convergence firm on the African continent — and the model that proves integrated advisory produces better outcomes than any single-discipline alternative.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-10 space-y-6">
              <h3 className="text-2xl font-display font-bold text-accent">Core Values</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Convergence over silos</p>
                    <p className="text-sm text-muted-foreground">We hold all five forces together, always</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Results over reports</p>
                    <p className="text-sm text-muted-foreground">Measured against outcomes, not deliverables</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Rigor with humility</p>
                    <p className="text-sm text-muted-foreground">We listen before we prescribe</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Context as advantage</p>
                    <p className="text-sm text-muted-foreground">African insight is our competitive edge</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Trust as infrastructure</p>
                    <p className="text-sm text-muted-foreground">Long-term partnerships, not transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STIEM Framework Section - Enhanced */}
      <section id="framework" className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-4"></div>
            <h2 className="text-5xl font-display font-bold mb-4">The STIEM Framework</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Five forces operating simultaneously on a single field. Not sequential. Not siloed. Converged. This is how transformation actually works.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: Target, title: "Strategy", desc: "The direction force. Where to play and how to win. Constantly interrogated by the other four forces." },
              { icon: Zap, title: "Technology", desc: "The enabling force. Digital infrastructure and AI capabilities that power transformation and enable strategy." },
              { icon: Lightbulb, title: "Innovation", desc: "The creative force. Finding non-obvious paths to value creation and new opportunities that strategy alone misses." },
              { icon: Rocket, title: "Execution", desc: "The delivery force. Ensuring transformation is real, measurable, tracked to outcomes, and actually ships." },
              { icon: Users, title: "Management", desc: "The sustaining force. Building organizational capacity to own the transformation after we leave." }
            ].map((force, idx) => (
              <div key={idx} className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-all duration-300 group hover:shadow-lg hover:shadow-accent/20">
                <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors">
                  <force.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors">{force.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{force.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-background border border-border rounded-lg p-12 text-center space-y-6">
            <h3 className="text-2xl font-display font-bold">The Field</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The Field is the central concept. It's the zone of convergence where all five STIEM forces operate simultaneously, share the same client context, and produce unified output. This is what separates a Stiemfield engagement from conventional consulting: five forces working in concert, correcting each other's blind spots in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section id="services" className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three interconnected services that form the complete client journey
            </p>
          </div>

          {/* Fieldscan */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24 pb-24 border-b border-border">
            <div className="space-y-6 fade-in-up">
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Service 01</span>
              <h3 className="text-4xl font-display font-bold">Fieldscan</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The convergence diagnostic. A 4-8 week fixed-scope engagement that answers the master question: why hasn't this organization transformed yet?
              </p>
              <div className="space-y-3 py-6 border-y border-border/50">
                <p className="text-sm"><strong>Duration:</strong> 4-8 weeks</p>
                <p className="text-sm"><strong>Delivery:</strong> Fully virtual</p>
                <p className="text-sm"><strong>Output:</strong> The Stiemfield Convergence Map</p>
                <p className="text-sm"><strong>Pricing:</strong> Fixed fee</p>
              </div>
              <Button className="btn-premium">Explore Fieldscan</Button>
            </div>
            <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-colors">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/case-study-visual-nTCFLNZ32S3mWDBH6Z5rzR.webp"
                alt="Fieldscan Diagnostic"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Fieldscan scans all five STIEM forces simultaneously, revealing the pattern of misalignment across your whole system. The result is a prioritized intervention architecture: what to fix first, what to fix second, and which service pathway is appropriate next.
                </p>
              </div>
            </div>
          </div>

          {/* Fieldforce */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24 pb-24 border-b border-border">
            <div className="order-2 md:order-1 bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-colors">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/transformation-abstract-XdLxUoxHcv33fVj2TBr2WS.webp"
                alt="Fieldforce Transformation"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Fieldforce activates the Fieldscan roadmap. It takes the Convergence Map and runs the program that realigns your STIEM forces. This is where transformation happens—not diagnosing the problem, but solving it.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6 fade-in-up">
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Service 02</span>
              <h3 className="text-4xl font-display font-bold">Fieldforce</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The transformation engine. A 6-18 month embedded program that activates convergence at full depth.
              </p>
              <div className="space-y-3 py-6 border-y border-border/50">
                <p className="text-sm"><strong>Duration:</strong> 6-18 months</p>
                <p className="text-sm"><strong>Delivery:</strong> Hybrid (virtual + in-person)</p>
                <p className="text-sm"><strong>Output:</strong> Measurable transformation</p>
                <p className="text-sm"><strong>Pricing:</strong> Outcome-based</p>
              </div>
              <Button className="btn-premium">Learn About Fieldforce</Button>
            </div>
          </div>

          {/* Fieldpartner */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-up">
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Service 03</span>
              <h3 className="text-4xl font-display font-bold">Fieldpartner</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The long-term partnership. Ongoing advisory and support to sustain transformation and compound results.
              </p>
              <div className="space-y-3 py-6 border-y border-border/50">
                <p className="text-sm"><strong>Duration:</strong> Ongoing</p>
                <p className="text-sm"><strong>Delivery:</strong> Flexible (as needed)</p>
                <p className="text-sm"><strong>Output:</strong> Sustained competitive advantage</p>
                <p className="text-sm"><strong>Pricing:</strong> Retainer-based</p>
              </div>
              <Button className="btn-premium">Explore Fieldpartner</Button>
            </div>
            <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-colors">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/services-detail-bg-mv8t3AfQM8Jn8GYdmTuUCj.webp"
                alt="Fieldpartner Partnership"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  After Fieldforce, we remain embedded in your organization, providing ongoing strategic guidance, capability building, and course correction to ensure transformation compounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Client Outcomes</h2>
            <p className="text-muted-foreground text-lg">Real transformations from organizations across Africa</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "CEO, Pan-African Fintech", company: "Financial Services", quote: "Stiemfield didn't just diagnose our problem—they solved it. Within 12 months, we went from fragmented to converged. Revenue grew 3x." },
              { name: "COO, Manufacturing Group", company: "Industrial", quote: "We tried digital transformation before. It failed. Stiemfield's convergence model worked because it addressed the real problem: our management system couldn't absorb the change." },
              { name: "Founder, Tech Startup", company: "Technology", quote: "They helped us scale from startup to enterprise. The STIEM framework gave us the architecture to grow without losing our edge." }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
                <Quote className="w-6 h-6 text-accent mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background texture-bg">
        <div className="container text-center space-y-8">
          <h2 className="text-5xl font-display font-bold">
            Ready to <span className="text-accent">Converge</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start with Fieldscan. Discover where your five forces are misaligned. Build a roadmap for transformation that compounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button className="btn-premium">Start Your Fieldscan</Button>
            <Button className="btn-premium-outline">Schedule a Conversation</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
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
              <p className="text-xs text-muted-foreground mt-2">Strategy · Technology · Innovation · Execution · Management</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#services" className="hover-gold">Fieldscan</a></li>
                <li><a href="#services" className="hover-gold">Fieldforce</a></li>
                <li><a href="#services" className="hover-gold">Fieldpartner</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover-gold">About</a></li>
                <li><a href="/insights" className="hover-gold">Insights</a></li>
                <li><a href="/" className="hover-gold">Contact</a></li>
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
