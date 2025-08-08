import { createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";
import type { RootState } from "../../store";
interface FetchUsersArgs {
    page: number;
    limit: number;
}

export const fetchPaginatedUsers = createAsyncThunk(
    "users/fetchPaginated",
    async ({ page, limit }: FetchUsersArgs, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const cachedPage = state.users.pages[page];

        if (cachedPage) {
            // Уже есть — отменяем запрос и возвращаем кеш
            return rejectWithValue({
                type: "CACHED",
                page,
                users: cachedPage,
            });
        }

        const response = await usersApi.getPaginated(page, limit);

        return {
            users: response.data,
            // totalCount: response.totalCount,
            page,
            limit,
        };
    }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await usersApi.getAll();
    return response;
});

export const fetchUserById = createAsyncThunk(
    "users/fetchUserById",
    async (id: string) => {
        const response = await usersApi.getById(id);
        return response;
    }
);
