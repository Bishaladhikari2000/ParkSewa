import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authService } from "@/lib/api";

type User = {
  name: string;
  role: string;
  email: string;
};

type LoginResponse = {
  user: User;
  token: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token and user data on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await authService.login(email, password);
    const { user: userData, token: authToken } = response;

    if (!userData || !authToken || !userData.role || !userData.name || !userData.email) {
      throw new Error("Invalid login response: Missing required user data");
    }

    // Validate user role
    if (!['admin', 'parking_owner', 'user'].includes(userData.role)) {
      throw new Error("Invalid user role");
    }

    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));

    return response;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};