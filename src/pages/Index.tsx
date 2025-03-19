
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StockAnalysis from '@/components/StockAnalysis';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <section className="py-12 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 bg-secondary text-sm font-medium rounded-full mb-6 animate-fade-down">
                Powered by AI
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-down">
                Predict Market Movements with Precision
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-fade-up">
                Advanced stock price prediction using machine learning models to help you make better investment decisions.
              </p>
            </div>
          </section>
          
          <StockAnalysis />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
