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
};

export default usersApi;
