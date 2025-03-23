import { useState, useEffect } from "react";
import { adminService } from "@/lib/adminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  createdAt: string;
};

type ParkingOwner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  parkingLots: number;
  totalRevenue: number;
  createdAt: string;
};

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [parkingOwners, setParkingOwners] = useState<ParkingOwner[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOwnerData, setNewOwnerData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
    fetchParkingOwners();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users",
      });
    }
  };

  const fetchParkingOwners = async () => {
    try {
      const data = await adminService.getParkingOwners();
      setParkingOwners(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch parking owners",
      });
    }
  };

  const handleCreateParkingOwner = async () => {
    try {
      await adminService.createParkingOwner(newOwnerData);
      toast({
        title: "Success",
        description: "Parking owner account created successfully",
      });
      setIsCreateModalOpen(false);
      fetchParkingOwners();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create parking owner account",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>Create Parking Owner</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Parking Owner Account</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new parking owner account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label>Name</label>
                <Input
                  value={newOwnerData.name}
                  onChange={(e) =>
                    setNewOwnerData({ ...newOwnerData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label>Email</label>
                <Input
                  type="email"
                  value={newOwnerData.email}
                  onChange={(e) =>
                    setNewOwnerData({ ...newOwnerData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label>Phone</label>
                <Input
                  value={newOwnerData.phone}
                  onChange={(e) =>
                    setNewOwnerData({ ...newOwnerData, phone: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleCreateParkingOwner} className="w-full">
                Create Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Users</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Parking Owners</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Parking Lots</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parkingOwners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>{owner.phone}</TableCell>
                  <TableCell>{owner.parkingLots}</TableCell>
                  <TableCell>${owner.totalRevenue.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(owner.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};