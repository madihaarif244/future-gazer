
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StockAnalysis from "@/components/StockAnalysis";

const Predictions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <section className="py-16 mb-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-5xl font-bold mb-6 text-gradient">Predictions</h1>
            </div>
            
            <div className="glass rounded-xl p-8">
              <StockAnalysis />
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Predictions;
