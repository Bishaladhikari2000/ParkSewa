
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ParkingMapProps {
  onSpotSelect: (spot: string | null) => void;
}

export const ParkingMap = ({ onSpotSelect }: ParkingMapProps) => {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  
  // Mock data for parking spots
  const parkingSpots = Array.from({ length: 30 }).map((_, i) => ({
    id: `A${i + 1}`,
    isAvailable: ![3, 7, 12, 15, 18, 22, 25].includes(i),
  }));
  
  const handleSpotClick = (spotId: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    
    const newSelectedSpot = selectedSpot === spotId ? null : spotId;
    setSelectedSpot(newSelectedSpot);
    onSpotSelect(newSelectedSpot);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span>Selected</span>
        </div>
      </div>
      
      <div className="border border-border rounded-lg p-4">
        <div className="grid grid-cols-5 md:grid-cols-6 gap-3">
          {parkingSpots.map((spot) => (
            <button
              key={spot.id}
              className={cn(
                "aspect-[4/3] rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                spot.isAvailable
                  ? selectedSpot === spot.id
                    ? "bg-primary text-primary-foreground" 
                    : "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                  : "bg-red-100 text-red-800 opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleSpotClick(spot.id, spot.isAvailable)}
              disabled={!spot.isAvailable}
            >
              {spot.id}
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-center text-muted-foreground text-sm">
        <p>Select a parking spot to proceed with booking</p>
      </div>
    </div>
  );
};
