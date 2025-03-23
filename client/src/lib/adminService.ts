import { api } from "./api";

type UserStats = {
  totalUsers: number;
  totalParkingOwners: number;
  totalBookings: number;
  monthlyRevenue: number;
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  createdAt: string;
};

type ParkingOwnerInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
  parkingLots: number;
  totalRevenue: number;
  createdAt: string;
};

type AdminProfile = {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
};

export const adminService = {
  // Dashboard Statistics
  getDashboardStats: async (): Promise<UserStats> => {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  // User Management
  getUsers: async (): Promise<UserInfo[]> => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  updateUserStatus: async (userId: string, status: string): Promise<void> => {
    await api.patch(`/admin/users/${userId}/status`, { status });
  },

  // Parking Owner Management
  getParkingOwners: async (): Promise<ParkingOwnerInfo[]> => {
    const response = await api.get("/admin/parking-owners");
    return response.data;
  },

  createParkingOwner: async (data: Omit<UserInfo, "id" | "role" | "createdAt">) => {
    const response = await api.post("/admin/parking-owners", data);
    return response.data;
  },

  // Admin Profile Management
  updateProfile: async (data: AdminProfile): Promise<void> => {
    await api.patch("/admin/profile", data);
  },
};