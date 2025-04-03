
import PageTemplate from "@/components/PageTemplate";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Press = () => {
  return (
    <PageTemplate title="Press & Media">
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Press Contact</h2>
          <p className="text-muted-foreground mb-6">
            For press inquiries, please contact our media relations team at{" "}
            <a href="mailto:press@stockpredict.example" className="text-primary hover:underline">
              press@stockpredict.example
            </a>
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">Download Media Kit</Button>
            <Button variant="outline">Download Brand Assets</Button>
            <Button variant="outline">Company Fact Sheet</Button>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div key={release.title} className="border-b border-border pb-6 last:border-b-0">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{release.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                <p className="text-muted-foreground mb-4">{release.summary}</p>
                <Button variant="link" className="p-0 h-auto flex items-center gap-2">
                  Read Full Release <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">In the News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsArticles.map((article) => (
              <a 
                key={article.title}
                href="#" 
                className="block p-6 border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-sm">{article.source}</span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p className="text-muted-foreground text-sm">{article.excerpt}</p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  Read Article <ExternalLink className="h-3 w-3 ml-1" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

const pressReleases = [
  {
    date: "April 1, 2025",
    title: "StockPredict Launches New AI-Powered Portfolio Management Tool",
    summary: "StockPredict today announced the launch of its new AI-powered portfolio management tool, designed to help investors optimize their investment strategies with advanced predictive analytics."
  },
  {
    date: "March 15, 2025",
    title: "StockPredict Raises $20M in Series A Funding",
    summary: "StockPredict, the AI-driven stock analysis platform, today announced it has raised $20 million in Series A funding led by Capital Ventures, with participation from several prominent fintech investors."
  },
  {
    date: "February 28, 2025",
    title: "StockPredict Partners with Major Financial Institution",
    summary: "StockPredict announced a strategic partnership with Global Bank to provide its AI-powered stock analysis tools to the bank's investment advisors and retail clients."
  }
];

const newsArticles = [
  {
    source: "TechCrunch",
    date: "March 20, 2025",
    title: "How StockPredict is Democratizing Financial Analytics",
    excerpt: "StockPredict is making waves in the fintech industry with its accessible approach to AI-powered financial analytics..."
  },
  {
    source: "Financial Times",
    date: "March 17, 2025",
    title: "StockPredict's $20M Funding Points to Growing Interest in AI Financial Tools",
    excerpt: "The recent funding round for StockPredict signals growing investor confidence in AI-driven financial analysis tools..."
  },
  {
    source: "Wall Street Journal",
    date: "March 5, 2025",
    title: "Can AI Really Predict Stock Movements? StockPredict Says Yes",
    excerpt: "With claims of predictive accuracy that outperform traditional analysis, StockPredict is challenging conventional wisdom..."
  },
  {
    source: "Bloomberg",
    date: "February 28, 2025",
    title: "Global Bank Teams Up with AI Startup StockPredict",
    excerpt: "In a move that signals the growing acceptance of AI in financial services, Global Bank has announced a partnership..."
  }
];

export default Press;
