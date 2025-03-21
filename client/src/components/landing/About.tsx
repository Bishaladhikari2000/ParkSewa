import { Container } from "@/components/ui/container";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            About <span className="animated-gradient-text">ParkSewa</span>
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            ParkSewa is Nepal's leading smart parking management system, revolutionizing
            the way people find and book parking spaces. Our mission is to make parking
            hassle-free and efficient for everyone.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-foreground/70">
                To transform urban parking through innovative technology, making it
                easier for drivers to find spaces and helping property owners maximize
                their parking assets.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-foreground/70">
                To create smart cities where parking is no longer a challenge,
                contributing to reduced traffic congestion and a better urban
                environment.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};