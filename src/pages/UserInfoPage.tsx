import {
    Avatar,
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    Divider,
    Paper,
    Skeleton,
    Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUserById } from "../features/users/UsersThunk";

function UserDetailsPage() {
    const userId = useParams().userId;
    const dispatch = useAppDispatch();
    const { selectedUser, loading, error } = useAppSelector(
        (state) => state.users
    );
    const user = selectedUser;
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) dispatch(fetchUserById(userId));
    }, []);

    const skeletonMode = loading || !user;

    if (error) {
        return (
            <Box mt={5} textAlign="center">
                <Typography variant="h6" color="error">
                    Пользователь не найден 😕
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    {error}
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{ mt: 2 }}
                >
                    ← Назад
                </Button>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" mt={5} px={2}>
            <Card
                sx={{
                    maxWidth: 500,
                    width: "100%",
                    borderRadius: 3,
                    boxShadow: 6,
                }}
            >
                <CardContent>
                    <Stack spacing={3}>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                            ← Назад
                        </Button>

                        <Stack spacing={2} alignItems="center">
                            {skeletonMode ? (
                                <Skeleton
                                    variant="circular"
                                    width={100}
                                    height={100}
                                />
                            ) : (
                                <Avatar
                                    src={user.avatar}
                                    sx={{ width: 100, height: 100 }}
                                />
                            )}

                            <Typography variant="h5" fontWeight={600}>
                                {skeletonMode ? (
                                    <Skeleton width={200} />
                                ) : (
                                    `${user.firstName} ${user.lastName}`
                                )}
                            </Typography>
                        </Stack>

                        <Divider />

                        <Stack spacing={1}>
                            {skeletonMode ? (
                                <>
                                    <Skeleton height={24} />
                                    <Skeleton height={24} />
                                    <Skeleton height={24} />
                                </>
                            ) : (
                                <>
                                    <Info label="📧 Email" value={user.email} />
                                    <Info
                                        label="📞 Телефон"
                                        value={user.phone}
                                    />
                                    <Info
                                        label="🕒 Зарегистрирован"
                                        value={new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    />
                                </>
                            )}
                        </Stack>

                        <Divider />

                        <Paper
                            elevation={0}
                            sx={{ p: 2, backgroundColor: "#f9f9f9" }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight={500}
                                gutterBottom
                            >
                                📝 О пользователе
                            </Typography>
                            {skeletonMode ? (
                                <>
                                    <Skeleton height={20} />
                                    <Skeleton height={20} width="90%" />
                                    <Skeleton height={20} width="70%" />
                                </>
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {user.bio}
                                </Typography>
                            )}
                        </Paper>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={500}>{label}</Typography>
            <Typography color="text.secondary">{value}</Typography>
        </Box>
    );
}
export default UserDetailsPage;
