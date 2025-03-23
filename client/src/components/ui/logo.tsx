
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
  link = false
}: LogoProps) => {
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

  if (link) {
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
