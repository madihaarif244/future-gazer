
import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
      scrolled ? "bg-white/80 shadow-sm backdrop-blur-md" : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <TrendingUp className="h-6 w-6 mr-2" />
          <span className="font-bold text-xl">StockPredict</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#" icon={<BarChart3 className="h-4 w-4 mr-2" />}>
            Dashboard
          </NavLink>
          <NavLink href="#" icon={<TrendingUp className="h-4 w-4 mr-2" />}>
            Predictions
          </NavLink>
          <NavLink href="#" icon={<PieChart className="h-4 w-4 mr-2" />}>
            Analysis
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center">
          <button className="px-4 py-2 rounded-lg bg-primary text-black font-medium transition-all hover:bg-primary/90">
            Start Free Trial
          </button>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? 
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white transition-all duration-300 ease-in-out transform",
        mobileMenuOpen 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0 pointer-events-none"
      )}>
        <div className="pt-20 px-6 space-y-6">
          <MobileNavLink href="#" icon={<BarChart3 className="h-5 w-5 mr-3" />}>
            Dashboard
          </MobileNavLink>
          <MobileNavLink href="#" icon={<TrendingUp className="h-5 w-5 mr-3" />}>
            Predictions
          </MobileNavLink>
          <MobileNavLink href="#" icon={<PieChart className="h-5 w-5 mr-3" />}>
            Analysis
          </MobileNavLink>
          
          <div className="pt-6">
            <button className="w-full px-4 py-3 rounded-lg bg-primary text-black font-medium transition-all hover:bg-primary/90">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ 
  href, 
  children, 
  icon 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon?: React.ReactNode;
}) => (
  <a 
    href={href} 
    className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
  >
    {icon}
    {children}
  </a>
);

const MobileNavLink = ({ 
  href, 
  children, 
  icon 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon?: React.ReactNode;
}) => (
  <a 
    href={href} 
    className="flex items-center text-lg py-3 border-b border-border text-foreground"
  >
    {icon}
    {children}
  </a>
);

export default Header;
