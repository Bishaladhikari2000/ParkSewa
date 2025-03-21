import { Container } from "@/components/ui/container";
import { Users, Target, Star, Building } from "lucide-react";

const teamMembers = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    description: "Visionary leader with 15+ years in urban mobility solutions."
  },
  {
    name: "Sarah Johnson",
    role: "Head of Operations",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    description: "Expert in scaling parking operations and customer experience."
  },
  {
    name: "Mike Chen",
    role: "Tech Lead",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    description: "Passionate about building smart parking solutions."
  },
  {
    name: "Lisa Brown",
    role: "Customer Success",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    description: "Dedicated to ensuring seamless parking experiences."
  }
];

const values = [
  {
    icon: Target,
    title: "Mission",
    description: "To revolutionize urban parking through smart technology and sustainable solutions."
  },
  {
    icon: Star,
    title: "Vision",
    description: "Creating cities where finding parking is effortless, efficient, and environmentally conscious."
  },
  {
    icon: Building,
    title: "Impact",
    description: "Reducing traffic congestion and emissions while improving urban mobility for everyone."
  }
];

export const About = () => {
  return (
    <div className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            About ParkSewa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transforming Urban <span className="animated-gradient-text">Parking</span> Experience
          </h2>
          <p className="text-xl text-foreground/80">
            We're on a mission to make parking smarter, easier, and more sustainable for cities and citizens alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {values.map((value, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl transform transition-transform duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center p-6 text-center transition-all duration-300">
                <div className="rounded-xl bg-primary/10 p-3.5 mb-5 text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet the <span className="animated-gradient-text">People</span> Behind ParkSewa
          </h2>
          <p className="text-xl text-foreground/80">
            Dedicated professionals working to revolutionize the parking industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl transform transition-transform duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center p-6 text-center transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 bg-primary/10"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-foreground/70">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default About;