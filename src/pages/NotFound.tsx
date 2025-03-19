
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="glass rounded-2xl p-8 md:p-12 max-w-xl w-full text-center animate-fade-up">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Home
          </a>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
