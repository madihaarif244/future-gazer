
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageTemplateProps {
  title: string;
  children?: React.ReactNode;
}

const PageTemplate = ({ title, children }: PageTemplateProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <section className="py-16 mb-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-5xl font-bold mb-6 text-gradient">{title}</h1>
            </div>
            
            <div className="glass rounded-xl p-8">
              {children || (
                <div className="text-center text-muted-foreground">
                  <p className="mb-6">This page is under construction.</p>
                  <p>Check back soon for more information!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageTemplate;
