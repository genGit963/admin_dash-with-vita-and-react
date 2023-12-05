import React, { useState } from 'react';
import {
  Alert,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FormActions } from 'src/components';
import { useNavigate, useParams } from 'react-router-dom';
import { Vehicle } from 'src/models';
import { VehicleServices, VehicleTypesServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useQuery } from '@tanstack/react-query';

const VehicleSchema: z.ZodType<Vehicle> = z.object({
  Name: z.string().min(3, 'Name must be at least 3 characters long.'),
  Desc: z.string().min(10, 'Description must be at least 10 characters long.'),
  Image1: z.string().min(1, 'Image url is required.'),
  Image2: z.string().min(1, 'Image url is required.'),
  Image3: z.string().min(1, 'Image url is required.'),
  VehicleTypeId: z.string(),
  LocationId: z.string(),
});

const VehiclePage: React.FC = () => {
  const vehiclestypes = useQuery({
    queryKey: ['vehicletypes'],
    queryFn: () => VehicleTypesServices.getAll().then((res) => res),
  });

  const { action, id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  //React hook form related intiialization
  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Vehicle>({
    defaultValues: async () => (id ? VehicleServices.get(id) : ({} as Vehicle)),
    resolver: zodResolver(VehicleSchema),
  });

  const onSubmit: SubmitHandler<Vehicle> = (formData: Vehicle) => {
    if (id) {
      const confirm = window.confirm(
        `This will update vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        VehicleServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            navigate('/vehicles');
          });
      }
    } else {
      setLoading(true);
      VehicleServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          navigate('/vehicles');
        });
    }
  };

  const onCancel = () => {
    navigate('/vehicles');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      VehicleServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          navigate('/vehicles');
        });
    }
  };

  if (!defaultValues && id) {
    return <LinearProgress />;
  }

  return (
    <Grid>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ textTransform: 'uppercase' }}
          >
            {action} Vehicle Type
          </Typography>
        </Grid>
      </Grid>
      {loading && <LinearProgress />}
      {error && (
        <Alert variant="standard" severity="error" sx={{ width: '80%', m: 1 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} marginTop={1}>
          <Grid item sm={8}>
            <TextField
              id="Name"
              label="Name"
              variant="outlined"
              fullWidth
              error={errors.Name ? true : undefined}
              helperText={errors.Name?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Name')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="Image1"
              label="Image URL1"
              variant="outlined"
              fullWidth
              error={errors.Image1 ? true : undefined}
              helperText={errors.Image1?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Image1')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="Image2"
              label="Image URL2"
              variant="outlined"
              fullWidth
              error={errors.Image2 ? true : undefined}
              helperText={errors.Image2?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Image2')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="Image3"
              label="Image URL3"
              variant="outlined"
              fullWidth
              error={errors.Image3 ? true : undefined}
              helperText={errors.Image3?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Image3')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="Desc"
              label="Desc"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={errors.Desc ? true : undefined}
              helperText={errors.Desc?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Desc')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel id="VehicleTypeLabelId">Vehicle Types Id</InputLabel>
              <Select
                labelId="VehicleTypeLabelId"
                label="VehicleTypeId"
                error={errors.VehicleTypeId ? true : undefined}
                defaultValue={defaultValues?.VehicleTypeId || ''}
                {...register('VehicleTypeId')}
              >
                {vehiclestypes.data?.map((vehiclestypes) => (
                  <MenuItem key={vehiclestypes.Id} value={vehiclestypes.Id}>
                    {vehiclestypes.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <FormControl sx={{ minWidth: 250 }}>
              <InputLabel id="LocationLabelId">Location Id</InputLabel>
              <Select
                labelId="LocationLabelId"
                id="LocationId"
                error={errors.LocationId ? true : undefined}
                label="Location Id"
                {...register('LocationId')}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
              </Select>
              <FormHelperText>{errors.LocationId?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormActions
              pageAction={action}
              isDirty={isDirty}
              submitText={id ? 'Update' : 'Create'}
              onCancel={onCancel}
              onDelete={onDelete}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default VehiclePage;
