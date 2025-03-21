
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// This is a placeholder component that would typically check the user's role
// and redirect to the appropriate dashboard
const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // This is a mock function that simulates checking user role from a backend
  // In a real application, this would come from your auth system
  const checkUserRole = (): Promise<"user" | "owner" | "admin"> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // For demo purposes, randomly return a role
        // In a real app, you'd get this from your auth system
        const roles = ["user", "owner", "admin"];
        const role = roles[Math.floor(Math.random() * roles.length)] as "user" | "owner" | "admin";
        resolve(role);
      }, 1000);
    });
  };
  
  useEffect(() => {
    const redirectToDashboard = async () => {
      try {
        const userRole = await checkUserRole();
        
        // Redirect based on user role
        switch (userRole) {
          case "admin":
            navigate("/admin");
            break;
          case "owner":
            navigate("/owner");
            break;
          case "user":
            navigate("/user");
            break;
          default:
            // Default to user dashboard if role is unknown
            navigate("/user");
        }
      } catch (error) {
        console.error("Error determining user role:", error);
        toast({
          title: "Error",
          description: "Could not determine your user role. Please try again.",
          variant: "destructive",
        });
        // Redirect to login on error
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    
    redirectToDashboard();
  }, [navigate, toast]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[300px] h-[200px] flex items-center justify-center">
        <CardContent className="pt-6 text-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-lg font-medium">Loading your dashboard...</p>
            </div>
          ) : (
            <p>Redirecting to your dashboard...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
