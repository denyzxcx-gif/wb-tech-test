import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPaginatedUsers,
    fetchUserById,
    fetchUsers,
    addUser,
    updateUser,
} from "./usersThunk";
interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    avatar: string;
    bio: string;
    createdAt: string;
}

interface UsersState {
    pages: {
        [page: number]: User[];
    };
    allUsers: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
    page: number;
    limit: number;
    totalCount: number;
}

const initialState: UsersState = {
    pages: {},
    allUsers: [],
    selectedUser: null,
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    totalCount: 0,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchPaginatedUsers.fulfilled, (state, action) => {
                state.pages[action.payload.page] = action.payload.users;
                // state.totalCount = action.payload.totalCount;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.loading = false;
            })

            .addCase(fetchPaginatedUsers.rejected, (state, action) => {
                const error = action.payload as any;

                if (error?.type === "CACHED") {
                    state.page = error.page;
                    state.loading = false;
                    return;
                }

                state.error = action.error.message ?? "Ошибка";
                state.loading = false;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
                state.totalCount = action.payload.length;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error =
                    action.error.message ?? "Ошибка при загрузке пользователей";
                state.loading = false;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedUser = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.selectedUser = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.error = action.error.message ?? "Ошибка загрузки";
                state.loading = false;
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.allUsers.push(action.payload);
                state.totalCount += 1;
                state.loading = false;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error =
                    action.error.message ??
                    "Ошибка при добавлении пользователя";
                state.loading = false;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.allUsers.findIndex(
                    (user) => user.id === action.payload.id
                );
                if (index !== -1) {
                    state.allUsers[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error =
                    action.error.message ??
                    "Ошибка при обновлении пользователя";
                state.loading = false;
            });
    },
});

export default usersSlice.reducer;
export type { User };
