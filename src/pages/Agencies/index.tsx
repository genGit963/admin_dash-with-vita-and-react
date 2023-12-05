import { LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'src/components';
import { Role } from 'src/models';
import { RoleServices, UserServices } from 'src/services';
import { Check, Close } from '@mui/icons-material';
import theme from 'src/theme';
const AgenciesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ['users_page'],
    queryFn: () => UserServices.getAll().then((res) => res),
    staleTime: 10,
  });
  const roles = useQuery({
    queryKey: ['roles'],
    queryFn: () => RoleServices.getAll().then((res) => res),
  });

  const columns = [
    { field: 'Id', headerName: 'User Id', width: 200, editable: false },
    {
      field: 'Email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'FirstName',
      headerName: 'First Name',
      width: 200,
      editable: true,
    },
    {
      field: 'LastName',
      headerName: 'Last Name',
      width: 200,
      editable: true,
    },
    {
      field: 'RoleId',
      headerName: 'RoleId',
      type: 'singleSelect',
      valueOptions: (roles.data as Role[])?.map((role) => ({
        value: role.Id,
        label: role.Name,
      })),
      width: 120,
      editable: true,
    },
    {
      field: 'IsVerified',
      headerName: 'Verfied',
      type: 'number',
      width: 120,
      editable: true,
      renderCell: (params: any) => {
        return parseInt(params.value) === 1 ? (
          <Check
            style={{
              color: theme.palette.success.light,
            }}
          />
        ) : (
          <Close
            style={{
              color: theme.palette.error.light,
            }}
          />
        );
      },
    },
  ];
  const dtAction = (type: string, id?: string) => {
    id ? navigate(`/users/${type}/${id}`) : navigate(`/users/${type}`);
  };
  if (isLoading) {
    return <LinearProgress color="primary" />;
  }
  if (error) {
    return <span>Couldn't load data.</span>;
  }
  return (
    <DataTable
      iRows={data || []}
      iCols={columns}
      action={dtAction}
      idColumn="Id"
      name="User"
    />
  );
};

export default AgenciesPage;
