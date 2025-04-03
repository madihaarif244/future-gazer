
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <section className="py-16 mb-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-5xl font-bold mb-6 text-gradient">Dashboard</h1>
            </div>
            
            <div className="glass rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/50 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Market Summary</h2>
                  <p className="text-muted-foreground">View your portfolio performance and market trends at a glance.</p>
                </div>
                
                <div className="bg-white/50 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <p className="text-muted-foreground">Track your recent stock analysis and prediction activities.</p>
                </div>
                
                <div className="bg-white/50 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
                  <p className="text-muted-foreground">Monitor your favorite stocks and receive price alerts.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
