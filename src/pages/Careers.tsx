
import PageTemplate from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Careers = () => {
  return (
    <PageTemplate title="Careers">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground">
            We're building the future of AI-powered investment analytics, and we're looking for talented 
            individuals to join us on this exciting journey. At StockPredict, you'll work with cutting-edge 
            technology and collaborate with a team of passionate professionals.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position) => (
              <div key={position.title} className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{position.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{position.location} · {position.type}</p>
                    <p className="mb-4">{position.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {position.skills.map((skill) => (
                        <span key={skill} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4">
              <h3 className="font-bold mb-2">Health & Wellness</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Comprehensive health, dental, and vision insurance</li>
                <li>Mental health resources and support</li>
                <li>Gym membership stipend</li>
              </ul>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-2">Growth & Development</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Professional development budget</li>
                <li>Regular learning and development workshops</li>
                <li>Mentorship opportunities</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

const openPositions = [
  {
    title: "Senior Machine Learning Engineer",
    location: "Remote",
    type: "Full-time",
    description: "Develop and optimize machine learning models for financial prediction and analysis.",
    skills: ["Python", "TensorFlow", "PyTorch", "Financial Data"]
  },
  {
    title: "Frontend Developer",
    location: "New York, NY",
    type: "Full-time",
    description: "Create intuitive user interfaces for our financial analytics platform.",
    skills: ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Financial Data Analyst",
    location: "Remote",
    type: "Full-time",
    description: "Analyze financial data and develop insights for our predictive models.",
    skills: ["Data Analysis", "Python", "Finance", "SQL"]
  }
];

export default Careers;
