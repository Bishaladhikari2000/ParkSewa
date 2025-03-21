
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  mono?: boolean;
  link?: boolean;
}

export const Logo = ({ 
  className, 
  size = "md", 
  mono = false,
  link = true
}: LogoProps) => {
  // Check if we're inside a Link component to prevent nesting
  const isInsideLink = document.querySelector('a:hover') !== null;
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const LogoContent = () => (
    <span className={cn(
      "font-bold tracking-tight transition-all duration-300",
      sizes[size],
      mono ? "text-foreground" : "animated-gradient-text",
      className
    )}>
      Park<span className="font-extrabold">Sewa</span>
    </span>
  );

  if (link && !isInsideLink) {
    return (
      <Link 
        to="/" 
        className="no-underline focus-visible:focus-ring rounded-md"
        aria-label="ParkSewa Home"
      >
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};
