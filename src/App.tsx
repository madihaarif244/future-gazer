
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Predictions from "./pages/Predictions";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import StockAnalysis from "./pages/StockAnalysis";
import PricePredictions from "./pages/PricePredictions";
import MarketTrends from "./pages/MarketTrends";
import PortfolioManager from "./pages/PortfolioManager";
import Documentation from "./pages/Documentation";
import ApiReference from "./pages/ApiReference";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Press from "./pages/Press";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CookiesPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/analysis" element={<Analysis />} />
          
          {/* Features */}
          <Route path="/stock-analysis" element={<StockAnalysis />} />
          <Route path="/price-predictions" element={<PricePredictions />} />
          <Route path="/market-trends" element={<MarketTrends />} />
          <Route path="/portfolio-manager" element={<PortfolioManager />} />
          
          {/* Resources */}
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/api-reference" element={<ApiReference />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/community" element={<Community />} />
          
          {/* Company */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/press" element={<Press />} />
          
          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
