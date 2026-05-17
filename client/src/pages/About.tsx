import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Stiemfield About Page
 * Design System: Architectural Minimalism with Gold Accents
 * Tells the story of why Stiemfield exists and what drives the firm
 */

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
                Stiemfield was born from frustration. Our founders spent years at leading global consulting firms, watching the same pattern repeat: organizations would engage a strategy firm, get brilliant recommendations, then hand off to an implementation team. The strategy would get watered down. The technology would misalign with the strategy. The execution would lose momentum. The organization would revert to the status quo.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We realized the problem wasn't the quality of the work. It was the architecture. When five critical forces—Strategy, Technology, Innovation, Execution, and Management—operate in silos, even brilliant work in each silo produces mediocre results.
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-12 space-y-6">
              <h3 className="text-2xl font-display font-bold text-accent">The Insight</h3>
              <p className="text-muted-foreground leading-relaxed">
                What if those five forces didn't operate sequentially? What if they operated simultaneously on a single field, each interrogating and informing the others? What if transformation was designed as a convergence problem, not a sequential problem?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That insight became Stiemfield. Not a firm that sells transformation. A firm whose architecture is designed to produce transformation.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold">Global Firm, Grounded in African Expertise</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stiemfield is a global convergence consulting firm serving private sector organizations and development agencies. Our positioning is built on deep expertise in African markets and the unique transformation challenges they present. African organizations operate in distinct market conditions—regulatory complexity, infrastructure constraints, talent dynamics, competitive intensity. These aren't disadvantages to overcome. They're sources of insight that translate globally.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Organizations that master transformation in the African context develop capabilities that translate globally. We've built our expertise where the problem is hardest and the insight is deepest. That expertise is now available to organizations worldwide.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold">How We Work</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stiemfield operates differently from traditional consulting. We don't hand off. We don't produce reports that sit on shelves. We don't optimize for billable hours. We optimize for transformation that compounds.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every engagement starts with Fieldscan—a diagnostic that scans all five STIEM forces simultaneously. We identify where your organization is broken. Then we build a roadmap. Then we activate it with Fieldforce. Then we stay embedded with Fieldpartner to ensure transformation compounds.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This is the convergence model. Five forces. One field. Transformation that sticks.
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
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-display font-bold mb-2">Terungwa Paul Asar</h3>
                  <p className="text-accent text-sm font-semibold mb-4">Founding Partner & Convergence Architect</p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    BSc Business Management (Benue State origin). During NYSC service in Osun State, Terungwa served as LGA Project Manager and State Project Manager for the Digital Literacy for All Community Development Service—managing multi-stakeholder transformation programs, coordinating technology deployment, and building execution frameworks under genuine resource and infrastructure constraints. This field experience is the empirical foundation of the STIEM Framework. Stiemfield is his direct response to the transformation failure problem he witnessed.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <p className="text-accent font-semibold text-sm uppercase tracking-wider">Why Solo?</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every client engages directly with Terungwa and the full STIEM lens. No handoffs. No dilution of thinking. Maximum focus on your transformation. This is the model that works.
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
                We don't believe in single-discipline consulting. Strategy without execution is fantasy. Technology without management is waste. We hold all five forces together because that's what transformation requires.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Results Over Reports</h3>
              <p className="text-muted-foreground leading-relaxed">
                We measure success against outcomes, not deliverables. A beautiful deck that doesn't change behavior is failure. A messy journey that produces measurable transformation is success.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Rigor With Humility</h3>
              <p className="text-muted-foreground leading-relaxed">
                We bring the full weight of the STIEM framework to every problem. And we listen before we prescribe. Your organization knows itself better than we ever will. Our job is to ask the right questions and help you find the answers.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Context as Advantage</h3>
              <p className="text-muted-foreground leading-relaxed">
                We understand the African business environment not as a constraint but as the source of our deepest insight. The complexity you navigate daily is the competitive advantage you're building.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Trust as Infrastructure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every Fieldscan, every Fieldforce program, every Fieldpartner relationship is a long-term trust investment. We're not here for a transaction. We're here to build a partnership that compounds.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-accent">Transformation That Compounds</h3>
              <p className="text-muted-foreground leading-relaxed">
                We don't measure success at the end of an engagement. We measure it five years later. Did the transformation stick? Did it compound? Did your organization become more capable?
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
                  src="/stiemfield-logo.jpg"
                  alt="Stiemfield"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-display font-semibold text-accent">STIEMFIELD</span>
              </div>
              <p className="text-sm text-muted-foreground">Convergence Firm</p>
              <p className="text-xs text-muted-foreground mt-2">terungwa@stiemfield.com</p>
              <p className="text-xs text-muted-foreground">Makurdi, Benue State, Nigeria</p>
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
