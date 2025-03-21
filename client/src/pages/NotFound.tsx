
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <Container className="max-w-3xl">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-primary/20 mb-4 animate-float">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>
            <Button asChild size="lg">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default NotFound;
