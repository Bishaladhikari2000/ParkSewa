
import React from "react";
import { Container } from "@/components/ui/container";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container size="lg" className="flex min-h-screen">
        <div className="hidden lg:flex flex-1 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="relative z-10 flex items-center justify-center w-full h-full p-8">
            <div className="glass-card bg-primary/5 rounded-3xl p-8 w-full max-w-xl shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Smart Parking Management System</h2>
              <p className="text-xl mb-6 text-foreground/80">
                Find and book parking spaces in real-time with our easy-to-use platform.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Real-time Availability</h3>
                    <p className="text-foreground/70">See available parking spots instantly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Secure Payments</h3>
                    <p className="text-foreground/70">Pay safely with multiple payment options</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Mobile Access</h3>
                    <p className="text-foreground/70">Manage bookings from any device</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </Container>
    </div>
  );
};
