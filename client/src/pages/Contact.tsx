import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

/**
 * Stiemfield Contact Page
 * Design System: Architectural Minimalism with Gold Accents
 * Professional inquiry form with service selection
 */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "fieldscan",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry. We'll be in touch within 24 hours.");
    setFormData({ name: "", company: "", email: "", phone: "", service: "fieldscan", message: "" });
  };

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
            <a href="/insights" className="hover-gold text-sm font-medium">Insights</a>
            <a href="/contact" className="hover-gold text-sm font-medium">Contact</a>
            <Button className="btn-premium text-xs">Get Started</Button>
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

            <div className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
              <Phone className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm">Available for calls with advance scheduling</p>
              <p className="text-muted-foreground text-xs mt-2">Starlink-connected, flexible timezone</p>
            </div>

            <div className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors">
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground text-sm">Makurdi, Benue State, Nigeria</p>
              <p className="text-muted-foreground text-xs mt-2">Global reach, grounded in African context</p>
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

            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-10">
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
                    placeholder="+27 (0) 11 XXX XXXX"
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

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="btn-premium w-full flex items-center justify-center gap-2">
                  Send Inquiry <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Your information will only be used to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-card">
        <div className="container">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How much does Fieldscan cost?",
                a: "Fieldscan is a fixed-fee engagement. Pricing depends on your organization's size and complexity, but typically ranges from NGN 2,500,000 to NGN 5,000,000. We'll provide a detailed proposal after an initial conversation."
              },
              {
                q: "How long does Fieldscan take?",
                a: "Fieldscan typically takes 4-8 weeks. The exact timeline depends on your organization's complexity and how quickly you can provide access to key stakeholders."
              },
              {
                q: "Do you work with organizations outside Africa?",
                a: "Yes. Stiemfield is a global convergence consulting firm serving private sector organizations and development agencies worldwide. We bring deep expertise in African transformation contexts, and that expertise translates globally."
              },
              {
                q: "What sectors do you typically work in?",
                a: "We serve private sector organizations across all industries. Our primary focus in Years 1-4 is fintech, agritech, healthtech, renewable energy, and mid-market manufacturing. From Year 4 onward, we also work with development agencies and international organizations."
              },
              {
                q: "What if we're not ready for transformation?",
                a: "That's exactly what Fieldscan is for. We'll diagnose whether your organization is ready, what needs to happen first, and what the roadmap looks like. Sometimes the answer is 'wait 6 months and build this capability first.'"
              },
              {
                q: "Can we do this virtually?",
                a: "Fieldscan is fully virtual. Fieldforce is hybrid—we typically spend 2-3 days per month on-site, with the rest virtual. Fieldpartner is flexible based on your needs."
              },
              {
                q: "What if we've already tried transformation and failed?",
                a: "That's actually the most common scenario. Most organizations we work with have tried transformation before. The difference with Stiemfield is the convergence model—we diagnose why the previous attempt failed and design a program that works."
              }
            ].map((faq, idx) => (
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
            Fill out the form above or reach out directly. We'll respond within 24 hours with next steps.
          </p>
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
                <li><a href="/insights" className="hover-gold">Insights</a></li>
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
