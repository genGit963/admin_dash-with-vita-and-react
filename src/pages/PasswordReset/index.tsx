import React from 'react';
import { Link, TextField, Avatar, Typography, Button } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { z } from 'zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface ResetPasswordInterface {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ResetPasswordSchema: z.ZodType<ResetPasswordInterface> = z
    .object({
        currentPassword: z
            .string()
            .min(8, { message: 'Please enter a valid current password.' }),
        newPassword: z.string().min(8, {
            message: 'Password must be at least 8 characters long.',
        }),
        confirmPassword: z.string().min(8, {
            message: 'Password must be at least 8 characters long.',
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ['confirmPassword'],
    });

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordInterface>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const navigate = useNavigate();
    const onSubmit: SubmitHandler<ResetPasswordInterface> = () => {
        navigate('/dashboard');
    };
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1, mb: 1 }}>
                Reset Password
            </Typography>
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Current Password"
                    type="password"
                    autoComplete="current-password"
                    autoFocus
                    error={errors.currentPassword ? true : undefined}
                    helperText={errors.currentPassword?.message}
                    {...register('currentPassword')}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="New Password"
                    type="password"
                    error={errors.newPassword ? true : undefined}
                    helperText={errors.newPassword?.message}
                    {...register('newPassword')}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    error={errors.confirmPassword ? true : undefined}
                    helperText={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                >
                    Submit
                </Button>

                <Link to="/login" variant="body2" component={RouterLink}>
                    Login
                </Link>
            </form>
        </>
    );
};

export default LoginPage;
