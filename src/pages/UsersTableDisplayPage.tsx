import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addUser, fetchUsers, updateUser } from "../features/users/usersThunk";
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
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import type { User } from "../features/users/usersSlice";
import UserForm from "../components/UserForm";

function UsersTableDisplay() {
    const dispatch = useAppDispatch();
    const { allUsers, limit, loading, totalCount } = useAppSelector(
        (state) => state.users
    );
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const users: User[] = allUsers;
    const displayedUsers = users.slice((page - 1) * limit, page * limit);

    const handlePageChange = (_event: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    useEffect(() => {
        if (allUsers.length === 0) {
            dispatch(fetchUsers());
        }
    }, []);

    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        avatar: "",
        bio: "",
    });

    return (
        <>
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
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h5" fontWeight={600} mb={2}>
                                📋 Список пользователей
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ mb: 2 }}
                                onClick={() => {
                                    setEditingUser(null); // при добавлении
                                    setOpen(true);
                                    setFormData({
                                        firstName: "",
                                        lastName: "",
                                        email: "",
                                        phone: "",
                                        avatar: "",
                                        bio: "",
                                    });
                                }}
                            >
                                Добавить пользователя
                            </Button>
                        </Box>

                        <Paper elevation={0}>
                            <Table>
                                <TableHead>
                                    <TableRow
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    >
                                        <TableCell>Имя</TableCell>
                                        <TableCell>Фамилия</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Телефон</TableCell>
                                        <TableCell>Опции</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        Array.from({ length: limit }).map(
                                            (_, i) => (
                                                <TableRow key={i}>
                                                    <TableCell colSpan={5}>
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
                                                    navigate(
                                                        `/users/${user.id}`
                                                    )
                                                }
                                            >
                                                <TableCell>
                                                    {user.firstName}
                                                </TableCell>
                                                <TableCell>
                                                    {user.lastName}
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    {user.phone}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setFormData(user);
                                                            setEditingUser(
                                                                user
                                                            );
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                align="center"
                                            >
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
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        maxWidth="sm"
                        fullWidth
                    >
                        <DialogTitle>
                            {editingUser
                                ? "Редактировать пользователя"
                                : "Добавить пользователя"}
                        </DialogTitle>
                        <DialogContent dividers>
                            <UserForm
                                initialData={formData}
                                onSubmit={(formData) => {
                                    console.log("SUBMIT", formData);
                                    if (editingUser) {
                                        dispatch(
                                            updateUser({
                                                id: editingUser.id,
                                                data: formData,
                                            })
                                        ).then(() => {
                                            setOpen(false);
                                        });
                                    } else {
                                        dispatch(addUser(formData)).then(() => {
                                            setOpen(false);
                                        });
                                    }
                                    setOpen(false);
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>
                                Отмена
                            </Button>
                        </DialogActions>
                    </Dialog>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default UsersTableDisplay;
