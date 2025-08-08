import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers } from "../features/users/usersThunk";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    TablePagination,
    Skeleton,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router";
import type { User } from "../features/users/usersSlice";

function UsersTableDisplay() {
    const dispatch = useAppDispatch();
    const { allUsers, limit, loading, totalCount } = useAppSelector(
        (state) => state.users
    );
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const users: User[] = allUsers;
    const displayedUsers = users.slice((page - 1) * limit, page * limit);

    useEffect(() => {
        if (allUsers.length === 0) {
            dispatch(fetchUsers());
        }
    }, []);

    const handlePageChange = (_event: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    return (
        <Box display="flex" justifyContent="center" mt={5} px={2}>
            <Card
                sx={{
                    maxWidth: "1000px",
                    width: "100%",
                    borderRadius: 3,
                    boxShadow: 6,
                }}
            >
                <CardContent>
                    <Typography variant="h5" fontWeight={600} mb={2}>
                        📋 Список пользователей
                    </Typography>

                    <Paper elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell>Имя</TableCell>
                                    <TableCell>Фамилия</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Телефон</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    Array.from({ length: limit }).map(
                                        (_, i) => (
                                            <TableRow key={i}>
                                                <TableCell colSpan={4}>
                                                    <Skeleton height={20} />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                ) : displayedUsers.length > 0 ? (
                                    displayedUsers.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                                cursor: "pointer",
                                            }}
                                            hover
                                            onClick={() =>
                                                navigate(`/users/${user.id}`)
                                            }
                                        >
                                            <TableCell>
                                                {user.firstName}
                                            </TableCell>
                                            <TableCell>
                                                {user.lastName}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <Typography>
                                                Нет пользователей
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={totalCount}
                                        rowsPerPage={limit}
                                        rowsPerPageOptions={[limit]}
                                        page={page - 1}
                                        onPageChange={handlePageChange}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UsersTableDisplay;
