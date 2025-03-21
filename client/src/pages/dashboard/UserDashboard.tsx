
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ParkingMap } from "@/components/dashboard/ParkingMap";
import { MapPin, Calendar, Clock, CreditCard, Car } from "lucide-react";

interface Booking {
  id: string;
  spotId: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  vehicleType: string;
  amount: number;
  status: "active" | "completed" | "cancelled";
}

const UserDashboard = () => {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      spotId: "A1",
      location: "Central City Parking",
      date: "June 10, 2023",
      startTime: "2:00 PM",
      endTime: "5:00 PM",
      vehicleType: "4-wheeler",
      amount: 12.50,
      status: "active",
    },
    {
      id: "2",
      spotId: "B2",
      location: "Downtown Parking",
      date: "June 11, 2023",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      vehicleType: "4-wheeler",
      amount: 8.00,
      status: "active",
    },
  ]);

  const handleBookingConfirm = () => {
    if (selectedSpot) {
      const newBooking: Booking = {
        id: Date.now().toString(),
        spotId: selectedSpot,
        location: "Central City Parking",
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        startTime: "2:00 PM",
        endTime: "5:00 PM",
        vehicleType: "4-wheeler",
        amount: 12.50,
        status: "active",
      };
      setBookings([...bookings, newBooking]);
      setSelectedSpot(null);
    }
  };

  const calculateTotalSpent = () => {
    return bookings
      .filter((booking) => booking.status === "active")
      .reduce((total, booking) => total + booking.amount, 0);
  };

  const activeBookings = bookings.filter((booking) => booking.status === "active");
  const favoriteLocations = [...new Set(bookings.map((booking) => booking.location))].length;

  return (
    <DashboardLayout>
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <Button onClick={() => setSelectedSpot(null)}>Book a Parking Spot</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Bookings</CardTitle>
                <CardDescription>Your current parking reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activeBookings.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Spent</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${calculateTotalSpent().toFixed(2)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Favorite Locations</CardTitle>
                <CardDescription>Your most visited spots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{favoriteLocations}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Find a Parking Spot</CardTitle>
                  <CardDescription>Select a location to book a parking spot</CardDescription>
                </CardHeader>
                <CardContent>
                  <ParkingMap onSpotSelect={setSelectedSpot} />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>
                    {selectedSpot 
                      ? `Spot ${selectedSpot} selected` 
                      : "Select a spot on the map"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedSpot ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>Central City Parking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Today, {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>2:00 PM - 5:00 PM (3 hours)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-primary" />
                        <span>4-wheeler</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <span>$12.50</span>
                      </div>
                      <Button className="w-full mt-4" onClick={handleBookingConfirm}>
                        Confirm Booking
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                      <Car className="h-12 w-12 mb-2 opacity-20" />
                      <p>Select a parking spot on the map to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default UserDashboard;
