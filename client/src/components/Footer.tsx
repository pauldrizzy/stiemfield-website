import { Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="w-full bg-[#0a1a3a] border-t border-[#c49241]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-lg md:text-xl font-bold text-[#c49241] mb-4">STIEM</h3>
            <p className="font-lato text-[#f5f3f0]/70 text-sm md:text-base">
              Premium convergence firm specializing in strategy, technology, innovation, execution, and management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-base md:text-lg font-bold text-[#f5f3f0] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'About', id: 'about' },
                { label: 'Framework', id: 'framework' },
                { label: 'Services', id: 'services' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="font-lato text-[#f5f3f0]/70 hover:text-[#c49241] transition-colors text-sm md:text-base"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-base md:text-lg font-bold text-[#f5f3f0] mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {['Fieldscan', 'Fieldforce', 'Fieldpartner'].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="font-lato text-[#f5f3f0]/70 hover:text-[#c49241] transition-colors text-sm md:text-base"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-playfair text-base md:text-lg font-bold text-[#f5f3f0] mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/stiemfield"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#f5f3f0]/70 hover:text-[#c49241] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:terungwa@stiemfield.com"
                aria-label="Email"
                className="text-[#f5f3f0]/70 hover:text-[#c49241] transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#c49241]/20 pt-8 md:pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-lato text-[#f5f3f0]/70 text-xs md:text-sm text-center sm:text-left">
              © {currentYear} Stiemfield Global Convergence Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-lato text-[#f5f3f0]/70 hover:text-[#c49241] transition-colors text-xs md:text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-lato text-[#f5f3f0]/70 hover:text-[#c49241] transition-colors text-xs md:text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}