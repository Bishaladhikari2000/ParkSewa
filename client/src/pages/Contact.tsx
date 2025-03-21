import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    description: "123 Innovation Drive, Tech Valley, CA 94043",
    details: "Open in Google Maps"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+1 (555) 123-4567",
    details: "Mon-Fri from 8am to 6pm"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "support@parksewa.com",
    details: "We'll respond within 24 hours"
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "Monday to Friday",
    details: "8:00 AM - 6:00 PM"
  }
];

export const Contact = () => {
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
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get in <span className="animated-gradient-text">Touch</span> With Us
          </h2>
          <p className="text-xl text-foreground/80">
            Have questions about ParkSewa? We're here to help you find the perfect parking solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl transform transition-transform duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col items-center p-6 text-center transition-all duration-300">
                    <div className="rounded-xl bg-primary/10 p-3.5 mb-5 text-primary">
                      <info.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    <p className="text-foreground/70 mb-1">{info.description}</p>
                    <p className="text-sm text-primary">{info.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative group rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6661457020704!2d-122.08374688447531!3d37.42199997982367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1624308999821!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ParkSewa Location"
                className="rounded-2xl"
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl transform transition-transform duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-100" />
            <div className="relative z-10 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;