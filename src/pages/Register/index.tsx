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
  LinearProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { z } from 'zod';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UserServices } from 'src/services';
import { User } from 'src/models/User';

const RegisterSchema: z.ZodType<User> = z
  .object({
    VerificationToken: z.string().min(1),
    FirstName: z.string().min(1, { message: 'First name is Required' }),
    LastName: z.string().min(1, { message: 'Last name is Required' }),
    Pwd: z
      .string()
      .min(7, { message: 'Password must be at least 7 character long.' }),
    Confirm: z
      .string()
      .min(7, { message: 'Password must be at least 7 character long.' }),
  })
  .refine((data) => data.Pwd == data.Confirm, {
    message: "Passwords don't match",
    path: ['Confirm'],
  });

const SignupPage: React.FC = () => {
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { verficationToken } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: async () =>
      verficationToken
        ? UserServices.getUserByVerificationToken(verficationToken).then(
            (res) => res,
          )
        : ({} as User),
  });

  //const navigate = useNavigate();
  const onSubmit: SubmitHandler<User> = (formData: User) => {
    setLoading(true);
    UserServices.completeRegistration(formData)
      .then((data) => {
        if (data) {
          setSuccess(true);
          setTimeout(() => {
            navigate('/login');
          }, 4000);
        }
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
        Register
      </Typography>
      {serverError && (
        <Alert variant="standard" severity="error" sx={{ width: '80%', m: 1 }}>
          {serverError}
        </Alert>
      )}
      {success && (
        <>
          <Alert
            variant="standard"
            severity="success"
            sx={{ width: '80%', m: 1 }}
          >
            Account successfully registered! <br />
            Redirecting to login page
          </Alert>
          <LinearProgress />
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Verification Token"
          InputLabelProps={{ shrink: true }}
          error={errors.VerificationToken ? true : undefined}
          helperText={errors.VerificationToken?.message}
          {...register('VerificationToken')}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="First Name"
          autoFocus
          error={errors.FirstName ? true : undefined}
          helperText={errors.FirstName?.message}
          {...register('FirstName')}
        />
        <TextField
          id="lastname"
          variant="outlined"
          margin="normal"
          fullWidth
          label="Last Name"
          error={errors.LastName ? true : undefined}
          helperText={errors.LastName?.message}
          {...register('LastName')}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          error={errors.Pwd ? true : undefined}
          helperText={errors.Pwd?.message}
          {...register('Pwd')}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Confirm Password"
          type="password"
          error={errors.Confirm ? true : undefined}
          helperText={errors.Confirm?.message}
          {...register('Confirm')}
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
            Complete Registration
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

export default SignupPage;
