import React, { useState } from 'react';
import {
  Link,
  TextField,
  Avatar,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { z } from 'zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserStore } from 'src/stores';
import { UserServices } from 'src/services';
import { usePermissionStore } from 'src/stores/permissionStore';

interface LoginInterface {
  email: string;
  password: string;
}

const LoginSchema: z.ZodType<LoginInterface> = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(7, { message: 'Your password is incorrect.' }),
});

const LoginPage: React.FC = () => {
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setPermissions } = usePermissionStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: zodResolver(LoginSchema),
  });

  //const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginInterface> = (
    formData: LoginInterface,
  ) => {
    setLoading(true);
    UserServices.login(formData.email, formData.password)
      .then((data) => {
        setUser(data.User);
        setPermissions(data.Permissions);
        navigate('/');
      })
      .catch((e) => {
        setServerError(e.error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mt: 1, mb: 1 }}>
        Login
      </Typography>
      {serverError && (
        <Alert variant="standard" severity="error" sx={{ width: '80%', m: 1 }}>
          {serverError}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={errors.password ? true : undefined}
          helperText={errors.password?.message}
          {...register('password')}
        />
        {loading ? (
          <Grid sx={{ m: 1 }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
            disabled={loading}
          >
            Sign In
          </Button>
        )}

        <Link
          to="/reset-password"
          variant="body2"
          component={RouterLink}
          color="primary"
        >
          Forgot password?
        </Link>
      </form>
    </>
  );
};

export default LoginPage;
