import React from 'react';
import { Link, TextField, Avatar, Typography, Button } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { z } from 'zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface RequestPasswordResetInterface {
    email: string;
}

const LoginSchema: z.ZodType<RequestPasswordResetInterface> = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
});

const RequestPasswordReset: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RequestPasswordResetInterface>({
        resolver: zodResolver(LoginSchema),
    });

    const navigate = useNavigate();
    const onSubmit: SubmitHandler<RequestPasswordResetInterface> = () => {
        navigate('/dashboard');
    };
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockResetIcon />
            </Avatar>
            <Typography variant="body2" textAlign="left" sx={{ mt: 3, mb: 1 }}>
                Enter your email address below, and we'll send you a link to
                reset your password.
            </Typography>
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    error={errors.email ? true : undefined}
                    helperText={errors.email?.message}
                    {...register('email')}
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

                <Link
                    to="/login"
                    variant="body2"
                    component={RouterLink}
                    color="primary"
                >
                    Back to login
                </Link>
            </form>
        </>
    );
};

export default RequestPasswordReset;
