import React, { useState, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * PremiumContentGate Component
 * Implements email gating for premium resources
 */
export const PremiumContentGate: React.FC<{
  contentId: string;
  contentTitle: string;
  contentDescription: string;
  fileUrl: string;
}> = ({ contentId, contentTitle, contentDescription, fileUrl }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { trackContentDownload } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // Track the download
      await trackContentDownload(contentId, contentTitle, email);

      // Trigger download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${contentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to process download. Please try again.');
      console.error('Download error:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{contentTitle}</CardTitle>
        <CardDescription>{contentDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <p>Check your email for the download link!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Download Now
            </Button>
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * ServicePricingCard Component
 * Displays service pricing with features and CTA
 */
export const ServicePricingCard: React.FC<{
  serviceName: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
  ctaText: string;
  ctaAction: () => void;
}> = ({ serviceName, subtitle, price, period, features, featured, ctaText, ctaAction }) => {
  const { trackServiceInterest } = useAnalytics();

  const handleCTA = () => {
    trackServiceInterest(serviceName, 'click_cta');
    ctaAction();
  };

  return (
    <Card className={featured ? 'border-amber-200 shadow-lg' : ''}>
      <CardHeader>
        <CardTitle>{serviceName}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-3xl font-bold">{price}</div>
          <p className="text-sm text-muted-foreground">{period}</p>
        </div>

        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button onClick={handleCTA} className="w-full" variant={featured ? 'default' : 'outline'}>
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
};

/**
 * AffiliateResourcesSection Component
 * Displays affiliate links to recommended tools
 */
export const AffiliateResourcesSection: React.FC = () => {
  const { trackServiceInterest } = useAnalytics();

  const affiliateLinks = [
    {
      name: 'Monday.com',
      description: 'Project Management & Team Collaboration',
      url: 'https://monday.com?ref=stiemfield',
      category: 'Project Management',
    },
    {
      name: 'Miro',
      description: 'Collaborative Whiteboarding & Diagramming',
      url: 'https://miro.com?ref=stiemfield',
      category: 'Collaboration',
    },
    {
      name: 'Asana',
      description: 'Work Management & Team Coordination',
      url: 'https://asana.com?ref=stiemfield',
      category: 'Project Management',
    },
    {
      name: 'Tableau',
      description: 'Business Intelligence & Data Visualization',
      url: 'https://tableau.com?ref=stiemfield',
      category: 'Analytics',
    },
    {
      name: 'Coursera',
      description: 'Online Learning & Professional Development',
      url: 'https://coursera.com?ref=stiemfield',
      category: 'Learning',
    },
  ];

  const handleAffiliateClick = (toolName: string) => {
    trackServiceInterest('affiliate_link', `click_${toolName.toLowerCase().replace(/\s+/g, '_')}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Recommended Tools for Transformation</h2>
        <p className="text-muted-foreground">
          We recommend these tools to support your organizational transformation journey. Using our affiliate links helps support Stiemfield.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {affiliateLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:border-amber-600 hover:shadow-md transition-all"
            onClick={() => handleAffiliateClick(link.name)}
          >
            <div className="text-xs font-semibold text-amber-600 uppercase mb-2">{link.category}</div>
            <h3 className="font-semibold mb-1">{link.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{link.description}</p>
            <div className="text-sm font-semibold text-amber-600">Learn More →</div>
          </a>
        ))}
      </div>
    </div>
  );
};

/**
 * LeadForm Component
 * Captures lead information with analytics tracking
 */
export const LeadForm: React.FC<{
  leadSource: string;
  onSubmitSuccess?: () => void;
}> = ({ leadSource, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service_interest: 'Fieldscan',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { trackLead } = useAnalytics();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.name) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      const leadRecord = await trackLead({
        ...formData,
        lead_source: leadSource,
      });

      if (leadRecord) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', service_interest: 'Fieldscan', message: '' });

        if (onSubmitSuccess) {
          onSubmitSuccess();
        }

        // Reset form after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Started with Stiemfield</CardTitle>
        <CardDescription>Fill out the form below to schedule your Fieldscan diagnostic</CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-2 p-6 bg-green-50 text-green-700 rounded-lg text-center">
            <CheckCircle2 className="w-8 h-8" />
            <h3 className="font-semibold">Thank You!</h3>
            <p className="text-sm">We've received your inquiry and will contact you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your organization"
              />
            </div>

            <div>
              <Label htmlFor="service_interest">Service of Interest</Label>
              <Select value={formData.service_interest} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, service_interest: value }))
              }>
                <SelectTrigger id="service_interest">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fieldscan">Fieldscan - Convergence Diagnostic</SelectItem>
                  <SelectItem value="Fieldforce">Fieldforce - Transformation Engine</SelectItem>
                  <SelectItem value="Fieldpartner">Fieldpartner - Retained Advisory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your transformation challenges..."
                rows={4}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Inquiry'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
