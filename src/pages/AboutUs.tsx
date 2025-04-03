
import PageTemplate from "@/components/PageTemplate";

const AboutUs = () => {
  return (
    <PageTemplate title="About Us">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            At StockPredict, our mission is to democratize access to advanced financial analytics. We believe that every investor, 
            regardless of experience or resources, should have access to cutting-edge AI-powered stock analysis tools that were once 
            available only to institutional investors.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground mb-4">
            We are a team of finance professionals, data scientists, and software engineers passionate about bringing transparency 
            and predictive power to the investment world.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="h-32 w-32 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">{member.initials}</span>
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.title}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><span className="font-medium">Innovation</span>: We constantly push the boundaries of what's possible in financial analysis.</li>
            <li><span className="font-medium">Transparency</span>: We believe in clear, understandable insights that explain the "why" behind predictions.</li>
            <li><span className="font-medium">Accessibility</span>: Our tools are designed to be powerful yet intuitive for investors at all levels.</li>
            <li><span className="font-medium">Integrity</span>: We are committed to responsible AI and ethical data practices.</li>
          </ul>
        </section>
      </div>
    </PageTemplate>
  );
};

const teamMembers = [
  { name: "Alex Chen", title: "CEO & Founder", initials: "AC" },
  { name: "Sophia Rodriguez", title: "Chief Data Scientist", initials: "SR" },
  { name: "Michael Johnson", title: "CTO", initials: "MJ" },
];

export default AboutUs;
