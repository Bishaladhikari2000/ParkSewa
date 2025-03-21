import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddParkingLotModalProps {
  onAdd: (parkingLot: {
    name: string;
    address: string;
    totalSpots: number;
    pricePerHour: number;
  }) => void;
}

export const AddParkingLotModal = ({ onAdd }: AddParkingLotModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    totalSpots: "",
    pricePerHour: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      totalSpots: parseInt(formData.totalSpots),
      pricePerHour: parseFloat(formData.pricePerHour),
    });
    setOpen(false);
    setFormData({ name: "", address: "", totalSpots: "", pricePerHour: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Parking Lot
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Parking Lot</DialogTitle>
          <DialogDescription>
            Fill in the details for your new parking lot location.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Parking Lot Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Downtown Parking"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="123 Main St"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalSpots">Total Parking Spots</Label>
            <Input
              id="totalSpots"
              type="number"
              value={formData.totalSpots}
              onChange={(e) =>
                setFormData({ ...formData, totalSpots: e.target.value })
              }
              placeholder="50"
              required
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pricePerHour">Price per Hour ($)</Label>
            <Input
              id="pricePerHour"
              type="number"
              value={formData.pricePerHour}
              onChange={(e) =>
                setFormData({ ...formData, pricePerHour: e.target.value })
              }
              placeholder="5.00"
              required
              min="0"
              step="0.01"
            />
          </div>
          <Button type="submit" className="w-full">
            Add Parking Lot
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};