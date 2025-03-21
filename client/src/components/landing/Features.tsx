
import { 
  CreditCard, 
  Clock, 
  Map, 
  ShieldCheck, 
  Smartphone, 
  BarChart, 
  Car, 
  Calendar 
} from "lucide-react";
import { Container } from "@/components/ui/container";

const features = [
  {
    icon: Map,
    title: "Real-time Availability",
    description: "View available parking spaces in real-time with our interactive map interface.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Process payments securely with multiple payment options including credit cards and mobile wallets.",
  },
  {
    icon: Clock,
    title: "Dynamic Pricing",
    description: "Smart pricing adjusts based on demand, location, and time to ensure optimal resource utilization.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Parking Spots",
    description: "All listed parking spaces are verified for security and service quality standards.",
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Access your bookings and parking details on-the-go with our responsive mobile interface.",
  },
  {
    icon: Calendar,
    title: "Advanced Booking",
    description: "Reserve your parking spot days or weeks in advance to ensure availability.",
  },
  {
    icon: Car,
    title: "Vehicle Type Support",
    description: "Find spots specifically designed for your vehicle type, whether it's a car, motorcycle, or oversized vehicle.",
  },
  {
    icon: BarChart,
    title: "Detailed Analytics",
    description: "Parking owners get comprehensive analytics on usage patterns and revenue generation.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Why Choose ParkSewa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Smart Features for a <span className="animated-gradient-text">Seamless</span> Parking Experience
          </h2>
          <p className="text-xl text-foreground/80">
            Our comprehensive system streamlines parking management for both users and parking space owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-2xl transform transition-transform duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col items-start p-6 transition-all duration-300">
                <div className="rounded-xl bg-primary/10 p-3.5 mb-5 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
