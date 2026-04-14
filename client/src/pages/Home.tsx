import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Lightbulb, Rocket, Users } from "lucide-react";

/**
 * Stiemfield Home Page
 * Design System: Architectural Minimalism with Gold Accents
 * - Dark charcoal backgrounds with warm gold accents
 * - Playfair Display for headings, Lato for body text
 * - Asymmetric layouts with generous whitespace
 * - Subtle animations and restrained interactions
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-charcoal font-bold text-lg">S</span>
            </div>
            <span className="font-display text-xl font-semibold text-accent">STIEMFIELD</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#framework" className="hover-gold text-sm font-medium">Framework</a>
            <a href="#services" className="hover-gold text-sm font-medium">Services</a>
            <a href="#values" className="hover-gold text-sm font-medium">Values</a>
            <Button className="btn-premium text-xs">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-between overflow-hidden texture-bg">
        <div className="absolute inset-0 opacity-10">
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
                <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                  Convergence <span className="text-accent">on a Single Field</span>
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Stiemfield brings Strategy, Technology, Innovation, Execution, and Management into alignment. When those five forces converge, transformation that actually sticks becomes possible.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="btn-premium flex items-center gap-2">
                  Explore Fieldscan <ArrowRight className="w-4 h-4" />
                </Button>
                <Button className="btn-premium-outline">Learn More</Button>
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

      {/* Mission & Vision Section */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold">Who We Are</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-accent font-semibold mb-2">Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To produce organizational transformation by converging strategy, technology, innovation, execution, and management on a single client engagement — eliminating the fragmentation that makes transformation fail.
                  </p>
                </div>
                <div>
                  <h3 className="text-accent font-semibold mb-2">Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the most trusted convergence firm on the African continent — and the model that proves integrated advisory produces better outcomes than any single-discipline alternative.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-display font-bold mb-6 text-accent">Core Values</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Convergence over silos</strong> — we hold all five forces together</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Results over reports</strong> — measured against outcomes, not deliverables</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Rigor with humility</strong> — we listen before we prescribe</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Context as competitive advantage</strong> — African insight as our strength</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Trust as infrastructure</strong> — long-term partnerships, not transactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STIEM Framework Section */}
      <section id="framework" className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The STIEM Framework</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Five forces operating simultaneously on a single field. Not sequential. Not siloed. Converged.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Strategy */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors duration-300 group">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Strategy</h3>
              <p className="text-sm text-muted-foreground">
                The direction force. Where to play and how to win. Constantly interrogated by the other four forces.
              </p>
            </div>

            {/* Technology */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors duration-300 group">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Technology</h3>
              <p className="text-sm text-muted-foreground">
                The enabling force. Digital infrastructure and AI capabilities that power transformation.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors duration-300 group">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                The creative force. Finding non-obvious paths to value creation and new opportunities.
              </p>
            </div>

            {/* Execution */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors duration-300 group">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors">
                <Rocket className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Execution</h3>
              <p className="text-sm text-muted-foreground">
                The delivery force. Ensuring transformation is real, measurable, and tracked to outcomes.
              </p>
            </div>

            {/* Management */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors duration-300 group">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Management</h3>
              <p className="text-sm text-muted-foreground">
                The sustaining force. Building organizational capacity to own the transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-card">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16">Our Services</h2>

          {/* Fieldscan */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20 pb-20 border-b border-border">
            <div className="space-y-6">
              <h3 className="text-3xl font-display font-bold text-accent">Fieldscan</h3>
              <p className="text-muted-foreground text-lg">
                The convergence diagnostic. A 4-8 week fixed-scope engagement that answers why your organization hasn't transformed yet.
              </p>
              <div className="space-y-3">
                <p className="text-sm"><strong>Duration:</strong> 4-8 weeks</p>
                <p className="text-sm"><strong>Delivery:</strong> Fully virtual</p>
                <p className="text-sm"><strong>Output:</strong> The Stiemfield Convergence Map</p>
              </div>
              <Button className="btn-premium">Explore Fieldscan</Button>
            </div>
            <div className="bg-background rounded-lg p-8 border border-border">
              <p className="text-muted-foreground">
                Fieldscan scans all five STIEM forces simultaneously, revealing the pattern of misalignment across your whole system—not just the most visible problem. The result is a prioritized intervention architecture: what to fix first, what to fix second, and which service pathway is appropriate next.
              </p>
            </div>
          </div>

          {/* Fieldforce */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20 pb-20 border-b border-border">
            <div className="order-2 md:order-1 bg-background rounded-lg p-8 border border-border">
              <p className="text-muted-foreground">
                Fieldforce activates the Fieldscan roadmap. It takes the Convergence Map and runs the program that realigns your STIEM forces. This is where transformation happens—not diagnosing the problem, but solving it.
              </p>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h3 className="text-3xl font-display font-bold text-accent">Fieldforce</h3>
              <p className="text-muted-foreground text-lg">
                The transformation engine. A 6-18 month embedded program that activates convergence at full depth.
              </p>
              <div className="space-y-3">
                <p className="text-sm"><strong>Duration:</strong> 6-18 months</p>
                <p className="text-sm"><strong>Delivery:</strong> Hybrid (virtual + in-person)</p>
                <p className="text-sm"><strong>Pricing:</strong> Outcome-based</p>
              </div>
              <Button className="btn-premium">Learn About Fieldforce</Button>
            </div>
          </div>

          {/* Fieldpartner */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-display font-bold text-accent">Fieldpartner</h3>
              <p className="text-muted-foreground text-lg">
                The long-term partnership. Ongoing advisory and support to sustain transformation and compound results.
              </p>
              <div className="space-y-3">
                <p className="text-sm"><strong>Duration:</strong> Ongoing</p>
                <p className="text-sm"><strong>Delivery:</strong> Flexible (as needed)</p>
                <p className="text-sm"><strong>Pricing:</strong> Retainer-based</p>
              </div>
              <Button className="btn-premium">Explore Fieldpartner</Button>
            </div>
            <div className="bg-background rounded-lg p-8 border border-border">
              <p className="text-muted-foreground">
                Fieldpartner ensures transformation compounds. After Fieldforce, we remain embedded in your organization, providing ongoing strategic guidance, capability building, and course correction to ensure the transformation you've built becomes the foundation for sustained competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background texture-bg">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Ready to <span className="text-accent">Converge</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start with Fieldscan. Discover where your five forces are misaligned. Build a roadmap for transformation that sticks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button className="btn-premium">Start Your Fieldscan</Button>
            <Button className="btn-premium-outline">Schedule a Conversation</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-charcoal font-bold text-sm">S</span>
                </div>
                <span className="font-display font-semibold text-accent">STIEMFIELD</span>
              </div>
              <p className="text-sm text-muted-foreground">Convergence Firm</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover-gold">Fieldscan</a></li>
                <li><a href="#" className="hover-gold">Fieldforce</a></li>
                <li><a href="#" className="hover-gold">Fieldpartner</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover-gold">About</a></li>
                <li><a href="#" className="hover-gold">Team</a></li>
                <li><a href="#" className="hover-gold">Contact</a></li>
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
