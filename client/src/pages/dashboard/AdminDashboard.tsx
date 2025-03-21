
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

const data = [
  { name: "Mon", bookings: 120 },
  { name: "Tue", bookings: 145 },
  { name: "Wed", bookings: 132 },
  { name: "Thu", bookings: 167 },
  { name: "Fri", bookings: 212 },
  { name: "Sat", bookings: 189 },
  { name: "Sun", bookings: 134 },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button>Download Reports</Button>
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
                  <span className="text-3xl font-bold">1,256</span>
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
                  <span className="text-3xl font-bold">85</span>
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
                  <span className="text-3xl font-bold">24,892</span>
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
                  <span className="text-3xl font-bold">32,450</span>
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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="bookings" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
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
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                    <Activity className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-medium">
                        {[
                          "New user registered",
                          "New parking lot added",
                          "Booking cancelled",
                          "Payment received",
                          "User updated profile",
                        ][i - 1]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.floor(i * 12)} minutes ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default AdminDashboard;
