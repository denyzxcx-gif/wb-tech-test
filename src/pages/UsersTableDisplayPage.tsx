import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers } from "../features/users/UsersThunk";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { Link } from "react-router";
import type { User } from "../features/users/usersSlice";

function UsersTableDisplay() {
    const dispatch = useAppDispatch();

    const { allUsers, limit, loading, totalCount } = useAppSelector(
        (state) => state.users
    );
    let [page, setPage] = useState(1);
    const users: User[] = allUsers;
    let displayedUsers = users.slice((page - 1) * limit, page * limit);
    function handlePageChange(newPage: number) {
        setPage(newPage);
        displayedUsers = users.slice((newPage - 1) * limit, newPage * limit);
    }

    useEffect(() => {
        if (allUsers.length === 0) {
            dispatch(fetchUsers());
        }
    }, []);
    return (
        <>
            <h2>Пользователи</h2>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell align="left">FirstName</TableCell>
                        <TableCell align="left">LastName</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <b>Loading...</b>
                            </TableCell>
                        </TableRow>
                    ) : displayedUsers.length > 0 ? (
                        displayedUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                component={Link}
                                to={`/users/${user.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    cursor: "pointer",
                                }}
                                viewTransition
                            >
                                <TableCell align="left">
                                    {user.firstName}
                                </TableCell>
                                <TableCell align="left">
                                    {user.lastName}
                                </TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                <TableCell align="left">{user.phone}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <b>No users found</b>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10]}
                            count={totalCount}
                            rowsPerPage={limit}
                            onPageChange={(_event, newPage) =>
                                handlePageChange(newPage + 1)
                            }
                            page={page - 1}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}

export default UsersTableDisplay;
