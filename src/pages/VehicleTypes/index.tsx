import { LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { VehicleTypesServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';

const columns = [
  { field: 'Id', headerName: 'Vehicle Id', width: 100, editable: false },
  { field: 'Name', headerName: 'Name', width: 150, editable: false },
  { field: 'Image', headerName: 'Image Url', width: 130, editable: false },
  { field: 'Desc', headerName: 'Description', width: 130, editable: false },
  { field: 'Seats', headerName: 'Seats', width: 100, editable: false },
  { field: 'Luggages', headerName: 'Luggages', width: 100, editable: false },
  { field: 'Price', headerName: 'Price per KM', width: 150, editable: false },
];
const VehicleTypesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ['vehicle_types_page'],
    queryFn: () => VehicleTypesServices.getAll().then((res) => res),
    staleTime: 5,
  });
  const dtAction = (type: string, id?: string) => {
    id
      ? navigate(`/vehicletypes/${type}/${id}`)
      : navigate(`/vehicletypes/${type}`);
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

export default VehicleTypesPage;
