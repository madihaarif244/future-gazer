
import { Link } from 'react-router-dom';
import { TrendingUp, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white bg-opacity-90 backdrop-blur-md border-t border-border py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              <span className="font-bold text-xl">StockPredict</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered stock analysis and predictive insights for investors.
            </p>
            <div className="flex space-x-4 pt-2">
              <ExternalLink href="https://github.com" ariaLabel="GitHub">
                <Github className="h-5 w-5" />
              </ExternalLink>
              <ExternalLink href="https://twitter.com" ariaLabel="Twitter">
                <Twitter className="h-5 w-5" />
              </ExternalLink>
              <ExternalLink href="https://linkedin.com" ariaLabel="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </ExternalLink>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Features</h3>
            <ul className="space-y-2">
              <FooterLink to="/stock-analysis">Stock Analysis</FooterLink>
              <FooterLink to="/price-predictions">Price Predictions</FooterLink>
              <FooterLink to="/market-trends">Market Trends</FooterLink>
              <FooterLink to="/portfolio-manager">Portfolio Manager</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="/documentation">Documentation</FooterLink>
              <FooterLink to="/api-reference">API Reference</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/community">Community</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink to="/about-us">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/press">Press</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StockPredict. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink to="/privacy-policy" className="text-xs">
              Privacy Policy
            </FooterLink>
            <FooterLink to="/terms-of-service" className="text-xs">
              Terms of Service
            </FooterLink>
            <FooterLink to="/cookies-policy" className="text-xs">
              Cookies Policy
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) => (
  <li>
    <Link to={to} className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${className}`}>
      {children}
    </Link>
  </li>
);

const ExternalLink = ({ href, children, ariaLabel }: { href: string; children: React.ReactNode; ariaLabel: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={ariaLabel}
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    {children}
  </a>
);

export default Footer;
