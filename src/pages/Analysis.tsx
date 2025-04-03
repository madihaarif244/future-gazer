
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";

const Analysis = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <section className="py-16 mb-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-5xl font-bold mb-6 text-gradient">Analysis</h1>
            </div>
            
            <div className="glass rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <AnalysisCard
                  icon={<BarChart3 className="h-8 w-8" />}
                  title="Historical Data Analysis"
                  description="Deep dive into historical price movements and trends."
                />
                
                <AnalysisCard
                  icon={<TrendingUp className="h-8 w-8" />}
                  title="Technical Indicators"
                  description="Key technical indicators to inform your investment decisions."
                />
                
                <AnalysisCard
                  icon={<PieChart className="h-8 w-8" />}
                  title="Portfolio Analysis"
                  description="Analyze your portfolio's performance and risk factors."
                />
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  className="button-glow hover-scale" 
                  size="lg"
                >
                  Run Advanced Analysis
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const AnalysisCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white/50 rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Analysis;
