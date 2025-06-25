import { Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Products",
      links: [
        "Payments",
        "Billing",
        "Connect",
        "Corporate Card",
        "Checkout",
        "Elements"
      ]
    },
    {
      title: "Use Cases",
      links: [
        "E-commerce",
        "SaaS",
        "Marketplaces",
        "Embedded Finance",
        "Creator Economy",
        "Crypto"
      ]
    },
    {
      title: "Developers",
      links: [
        "Documentation",
        "API Reference",
        "Guides",
        "Support",
        "Status",
        "GitHub"
      ]
    },
    {
      title: "Company",
      links: [
        "About",
        "Customers",
        "Enterprise",
        "Partners",
        "Jobs",
        "Newsroom"
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                stripe
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Online payment processing for internet businesses. Stripe is a suite of payment APIs that powers commerce for businesses of all sizes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-slate-400 text-sm">
            <span>© 2024 Stripe, Inc.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <div className="text-slate-400 text-sm">
            English (United States)
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;