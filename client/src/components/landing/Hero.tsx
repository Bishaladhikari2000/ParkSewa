
import { ArrowRight, Calendar, CreditCard, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block animate-fade-up">
            <span className="inline-block px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-pulse-subtle">
              Smart Parking Management System
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Book Your Parking Space <span className="text-balance animated-gradient-text">Hassle-Free</span>, Anytime, Anywhere!
          </h1>
          
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            ParkSewa streamlines the parking experience with real-time availability, dynamic pricing, and secure payments - making parking stress-free for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>

        {/* Mock UI */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="glass-card overflow-hidden p-1 shadow-xl">
            <div className="relative bg-gradient-to-b from-background to-background/80 rounded-xl p-4 sm:p-8">
              {/* Mock parking UI */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
                    {Array.from({ length: 18 }).map((_, i) => {
                      const isAvailable = ![2, 5, 8, 11, 15].includes(i);
                      return (
                        <div 
                          key={i} 
                          className={cn(
                            "aspect-[4/3] rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                            isAvailable 
                              ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer" 
                              : "bg-red-100 text-red-800 opacity-50",
                            i % 6 === 2 && i < 12 ? "col-span-2 aspect-[8/3]" : ""
                          )}
                        >
                          {String.fromCharCode(65 + Math.floor(i / 6))}{i % 6 + 1}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Selected</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="glass-card bg-white/40 p-4">
                    <h3 className="text-lg font-semibold mb-3">Booking Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">Central City Parking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">Today, 2:00 PM - 5:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <span className="text-sm">$12.50 (3 hours)</span>
                      </div>
                      <Button className="w-full mt-2">Confirm Booking</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
