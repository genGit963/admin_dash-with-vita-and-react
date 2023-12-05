import { LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { VehicleServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';

const columns = [
  { field: 'Id', headerName: 'Vehicle Type', width: 100, editable: false },
  { field: 'Name', headerName: 'Name', width: 100, editable: false },
  { field: 'Image1', headerName: 'Image Url', width: 200, editable: false },
  { field: 'Image2', headerName: 'Image Url', width: 200, editable: false },
  { field: 'Image3', headerName: 'Image Url', width: 200, editable: false },
  {
    field: 'Desc',
    headerName: 'Description',
    width: 230,
    editable: false,
  },
  {
    field: 'LocationId',
    headerName: 'Located At',
    width: 130,
    editable: false,
  },
];
const VehiclesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ['vehicle_page'],
    queryFn: () => VehicleServices.getAll().then((res) => res),
    staleTime: 5,
  });
  const dtAction = (type: string, id?: string) => {
    id ? navigate(`/vehicles/${type}/${id}`) : navigate(`/vehicles/${type}`);
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
      name="Vehicle"
    />
  );
};

export default VehiclesPage;
