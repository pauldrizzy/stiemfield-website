import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle, Loader2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { useAnalytics } from "@/hooks/useAnalytics";

const FAQ_ITEMS = [
  { q: "How do I get started?", a: "Book a free 30-minute scope meeting. We'll discuss your challenges and outline next steps." },
  { q: "How long does Fieldscan take?", a: "4-8 weeks, depending on your organization's complexity." },
  { q: "Do you work outside Africa?", a: "Yes. We're a global firm with deep African expertise that translates worldwide." },
  { q: "What sectors do you work in?", a: "Fintech, agritech, healthtech, renewable energy, manufacturing, and development agencies." },
  { q: "What if we're not ready?", a: "That's what Fieldscan is for — we'll diagnose readiness and build the right roadmap." },
  { q: "Can we do this virtually?", a: "Fieldscan is fully virtual. Fieldforce is hybrid. Fieldpartner is flexible." },
  { q: "We've tried transformation before and failed.", a: "Most clients have. The convergence model diagnoses why it failed and designs what works." }
];

export default function Contact() {
  const { trackLead, trackConversion } = useAnalytics();
  const params = new URLSearchParams(window.location.search);
  const initialService = params.get("service") || "fieldscan";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: initialService,
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    if (s) setFormData(prev => ({ ...prev, service: s }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const body = new URLSearchParams();
    body.append("form-name", "contact");
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error("Submission failed");

      // Mirror the lead into Supabase analytics (no-ops if not configured)
      await trackLead({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service_interest: formData.service,
        message: formData.message,
        lead_source: "contact_page_form",
      });
      await trackConversion("contact_form_submission", undefined, { service: formData.service });

      setStatus("success");
      setFormData({ name: "", company: "", email: "", phone: "", service: "fieldscan", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Contact"
        description="Book a free 30-minute scope meeting with Stiemfield. Discuss your organization's transformation challenges and discover how convergence across Strategy, Technology, Innovation, Execution, and Management can help."
        path="/contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "name": "Contact Stiemfield — Book a Scope Meeting",
          "url": "https://www.stiemfield.com/contact",
          "mainEntity": FAQ_ITEMS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.stiemfield.com" },
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.stiemfield.com/contact" }
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
      <section className="relative min-h-[50vh] flex items-center overflow-hidden texture-bg">
        <div className="absolute inset-0 opacity-15">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390111230/Ncij7Gh2r2BW57bAh4gHVB/contact-hero-daGCDgvKQjWdtba89TbXK7.webp"
            alt="Contact Hero"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 py-16">
          <div className="max-w-3xl space-y-6">
            <div className="accent-line"></div>
            <h1 className="text-6xl md:text-7xl font-display font-bold leading-tight">
              Let's <span className="text-accent">Converge</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to transform your organization? Start with a conversation. We'll listen, ask the right questions, and determine if Fieldscan is the right first step.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
              <Mail className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">terungwa@stiemfield.com</p>
              <p className="text-muted-foreground text-xs mt-2">We respond within 24 hours</p>
            </div>

            <a href="https://calendly.com/asarpaul8/30min" target="_blank" rel="noopener noreferrer" className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors block">
              <Calendar className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Book a Scope Meeting</h3>
              <p className="text-muted-foreground text-sm">Schedule a free 30-minute call</p>
              <p className="text-accent text-xs mt-2 font-semibold">Book now →</p>
            </a>

            <div className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground text-sm">Central Business District, Abuja (Virtual)</p>
              <p className="text-muted-foreground text-xs mt-2">Global reach, rooted in Africa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-display font-bold mb-4">Send us a Message</h2>
              <p className="text-muted-foreground text-lg">
                Tell us about your organization and the transformation challenge you're facing. We'll review your inquiry and reach out within 24 hours.
              </p>
            </div>

            {status === "success" ? (
              <div className="bg-card border border-accent rounded-lg p-10 text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-accent mx-auto" />
                <h3 className="text-2xl font-display font-bold">Thank You</h3>
                <p className="text-muted-foreground">Your inquiry has been received. We'll be in touch within 24 hours.</p>
                <Button className="btn-premium" onClick={() => setStatus("idle")}>Send Another Inquiry</Button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-10">
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              {/* Name and Company Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Company *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your company"
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Which service interests you? *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="fieldscan">Fieldscan - Convergence Diagnostic</option>
                  <option value="fieldforce">Fieldforce - Transformation Program</option>
                  <option value="fieldpartner">Fieldpartner - Long-term Partnership</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Tell us about your challenge *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="What transformation challenge are you facing? What have you tried? What's not working?"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Something went wrong. Please try again or email us directly.</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" disabled={status === "submitting"} className="btn-premium w-full flex items-center justify-center gap-2">
                  {status === "submitting" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <>Send Inquiry <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Your information will only be used to respond to your inquiry.
              </p>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-card">
        <div className="container">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
                <h3 className="text-lg font-semibold mb-3 text-accent">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background texture-bg">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl font-display font-bold">
            Ready to Start Your <span className="text-accent">Transformation</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Book a free 30-minute scope meeting to discuss your organization's challenges and explore how convergence can help.
          </p>
          <a href="https://calendly.com/asarpaul8/30min" target="_blank" rel="noopener noreferrer">
            <Button className="btn-premium flex items-center gap-2 mx-auto">
              Book a Scope Meeting <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
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
                <li><a href="/contact" className="hover-gold">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://www.linkedin.com/company/stiemfield" target="_blank" rel="noopener noreferrer" className="hover-gold">LinkedIn</a></li>
                <li><a href="mailto:terungwa@stiemfield.com" className="hover-gold">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 Stiemfield Global Convergence Ltd. All rights reserved.</p>
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
