
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { DollarSign, Car, Map, FileText } from "lucide-react";
import { AddParkingLotModal } from "@/components/dashboard/AddParkingLotModal";

interface ParkingLot {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  pricePerHour: number;
  availableSpots: number;
}

interface Booking {
  id: string;
  lotName: string;
  spotId: string;
  startTime: string;
  endTime: string;
  amount: number;
}

const OwnerDashboard = () => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([
    {
      id: "1",
      name: "Downtown Lot #1",
      address: "123 Main St",
      totalSpots: 50,
      pricePerHour: 5,
      availableSpots: 35,
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      lotName: "Downtown Lot #1",
      spotId: "A1",
      startTime: "2:00 PM",
      endTime: "6:00 PM",
      amount: 12.50,
    },
  ]);

  const handleAddParkingLot = (newLot: Omit<ParkingLot, "id" | "availableSpots">) => {
    const parkingLot: ParkingLot = {
      ...newLot,
      id: Date.now().toString(),
      availableSpots: newLot.totalSpots,
    };
    setParkingLots([...parkingLots, parkingLot]);
  };

  const calculateTotalRevenue = () => {
    return bookings.reduce((total, booking) => total + booking.amount, 0);
  };

  return (
    <DashboardLayout>
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Parking Owner Dashboard</h1>
            <AddParkingLotModal onAdd={handleAddParkingLot} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Revenue</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">
                    {calculateTotalRevenue().toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Parking Lots</CardTitle>
                <CardDescription>Active locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">{parkingLots.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Bookings</CardTitle>
                <CardDescription>Active reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">{bookings.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest parking reservations at your locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="font-medium">{booking.lotName}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.amount.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Spot {booking.spotId}</p>
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

export default OwnerDashboard;
