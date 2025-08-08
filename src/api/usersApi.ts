import axiosClient from "./axiosClient";
import type { User } from "../features/users/usersSlice";

interface PaginatedResponse {
    data: User[];
}

const usersApi = {
    async getAll(): Promise<User[]> {
        const res = await axiosClient.get<User[]>("/users");
        return res.data;
    },

    async getPaginated(
        page: number,
        limit: number
    ): Promise<PaginatedResponse> {
        const res = await axiosClient.get<User[]>("/users", {
            params: { page, limit },
        });

        return {
            data: res.data,
        };
    },

    async getById(id: string): Promise<User> {
        const res = await axiosClient.get<User>(`/users/${id}`);
        return res.data;
    },

    async create(userData: Omit<User, "id" | "createdAt">): Promise<User> {
        const res = await axiosClient.post<User>("/users", userData);
        return res.data;
    },

    async update(
        userId: number,
        userData: Omit<User, "id" | "createdAt">
    ): Promise<User> {
        const res = await axiosClient.put<User>(`/users/${userId}`, userData);
        return res.data;
    },
};

export default usersApi;
