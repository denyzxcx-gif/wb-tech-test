import { Button, TextField, Avatar, Paper, Grid } from "@mui/material";
import { useState } from "react";
import type { User } from "../features/users/usersSlice";

interface UserFormProps {
    initialData?: Partial<User>;
    onSubmit: (data: Omit<User, "id" | "createdAt">) => void;
}

export default function UserForm({
    initialData = {},
    onSubmit,
}: UserFormProps) {
    const [formData, setFormData] = useState<Omit<User, "id" | "createdAt">>({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        avatar: initialData.avatar || "",
        bio: initialData.bio || "",
    });

    const handleChange =
        (field: keyof typeof formData) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [field]: event.target.value });
        };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Avatar
                        src={formData.avatar}
                        sx={{ width: 80, height: 80, mx: "auto" }}
                    />
                    <TextField
                        fullWidth
                        label="Имя"
                        value={formData.firstName}
                        onChange={handleChange("firstName")}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Фамилия"
                        value={formData.lastName}
                        onChange={handleChange("lastName")}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange("email")}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Телефон"
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Ссылка на аватар"
                        value={formData.avatar}
                        onChange={handleChange("avatar")}
                        required
                    />
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="Биография"
                        value={formData.bio}
                        onChange={handleChange("bio")}
                        required
                    />
                    <Button type="submit" variant="contained">
                        Сохранить
                    </Button>
                </Grid>
            </form>
        </Paper>
    );
}
