
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Users, Building, Car, DollarSign, Activity } from "lucide-react";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer 
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/lib/adminService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface DashboardStats {
  data: {
    totalUsers: number;
    totalParkingOwners: number;
    totalBookings: number;
    monthlyRevenue: number;
    weeklyBookings: { name: string; bookings: number; }[];
    recentActivities: { type: string; timestamp: string; }[];
  };
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  return await adminService.getDashboardStats();
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }
  const { data: statsResponse, isLoading, error } = useQuery<DashboardStats>(['adminStats'], fetchDashboardStats, {
    onError: (err) => {
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive"
      });
    }
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <Container>
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </Container>
      </DashboardLayout>
    );
  }

  if (error || !statsResponse) {
    return (
      <DashboardLayout>
        <Container>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
            <p className="text-lg text-muted-foreground">Failed to load dashboard data</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={() => window.location.href = "/api/admin/reports/download"}>Download Reports</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Users</CardTitle>
                <CardDescription>All registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">{statsResponse.data.totalUsers.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Parking Owners</CardTitle>
                <CardDescription>Registered owners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">{statsResponse.data.totalParkingOwners.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Bookings</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">{statsResponse.data.totalBookings.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenue</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">${statsResponse.data.monthlyRevenue.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Booking Statistics</CardTitle>
              <CardDescription>Number of bookings over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {statsResponse.data.weeklyBookings && statsResponse.data.weeklyBookings.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statsResponse.data.weeklyBookings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="bookings" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No booking data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities and logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statsResponse.data.recentActivities && statsResponse.data.recentActivities.length > 0 ? (
                  statsResponse.data.recentActivities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                      <Activity className="h-5 w-5 mt-0.5 text-primary" />
                      <div className="space-y-1">
                        <p className="font-medium">{activity.type}</p>
                        <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    No recent activities
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default AdminDashboard;
