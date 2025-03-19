
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StockAnalysis from '@/components/StockAnalysis';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const scrollToAnalysis = () => {
    const analysisSection = document.getElementById('analysis-section');
    analysisSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <section className="py-16 mb-12 min-h-[70vh] flex flex-col justify-center items-center">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 neo-blur text-sm font-medium rounded-full mb-6 animate-fade-down">
                Powered by AI
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gradient animate-fade-down">
                Predict Market Movements <br/>with Precision
              </h1>
              <p className="text-xl text-muted-foreground mb-10 animate-fade-up">
                Advanced stock price prediction using machine learning models to help you make better investment decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
                <Button 
                  className="button-glow hover-scale" 
                  size="lg"
                  onClick={scrollToAnalysis}
                >
                  Start Analyzing
                </Button>
                <Button 
                  variant="outline" 
                  className="hover-scale transition-all duration-300 hover:bg-white/10" 
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="mt-16 animate-float">
              <ArrowDown className="animate-bounce h-8 w-8 opacity-70" />
            </div>
          </section>
          
          <section id="analysis-section" className="py-12 glass rounded-xl p-6">
            <StockAnalysis />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
