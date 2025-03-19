
import { TrendingUp, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white bg-opacity-90 backdrop-blur-md border-t border-border py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              <span className="font-bold text-xl">StockPredict</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered stock analysis and predictive insights for investors.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Features</h3>
            <ul className="space-y-2">
              <FooterLink>Stock Analysis</FooterLink>
              <FooterLink>Price Predictions</FooterLink>
              <FooterLink>Market Trends</FooterLink>
              <FooterLink>Portfolio Manager</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink>Documentation</FooterLink>
              <FooterLink>API Reference</FooterLink>
              <FooterLink>Blog</FooterLink>
              <FooterLink>Community</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink>About Us</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Contact</FooterLink>
              <FooterLink>Press</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StockPredict. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <li>
    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
      {children}
    </a>
  </li>
);

export default Footer;
