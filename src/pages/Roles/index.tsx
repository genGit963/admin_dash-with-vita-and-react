import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { RoleServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';

const columns=[    
    { field: 'Id', headerName: 'Role Id', width: 250, editable: false },
    { field: 'Name', headerName: 'Name', width: 250, editable: false },
    { field: 'Desc', headerName: 'Description', width: 230, editable: false },
];
const RolesPage: React.FC = () => {
    const navigate = useNavigate();
    
    const {isLoading, error, data} = useQuery({
        queryKey: ['permissions'],
        queryFn: ()=>RoleServices.getAll()
        .then((res) => {
            return res;
        }),
        staleTime: 10,
    });
    const dtAction = (type: string, id?: string) => {
        id ? navigate(`/Roles/${type}/${id}`) : navigate(`/Roles/${type}`);
    };
    if (isLoading) {
        return <LinearProgress color="primary" />;
    }
    if (error) {
        return <Alert variant='outlined' severity='error'>Couldn't load data.</Alert>;
    }
    return (
        <DataTable 
            iRows={data || []} 
            iCols={columns} 
            idColumn='Id' 
            action={dtAction} 
            name='Roles'/>
    );
};

export default RolesPage;
