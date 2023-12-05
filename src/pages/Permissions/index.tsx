import { Alert, LinearProgress } from '@mui/material';
import React from 'react';
import { DataTable } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { FeatureServices, PermissionServices, RoleServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';
import { Feature, Role } from 'src/models';


const PermissionsPage: React.FC = () => {
    const navigate = useNavigate();
    const {isLoading, error, data} = useQuery({
        queryKey: ['permissions_page'],
        queryFn: ()=>PermissionServices.getAll()
        .then((res) => {
            return res;
        }),
        staleTime: 20,
    });
    const dtAction = (type: string, id?: string) => {
        id ? navigate(`/permissions/${type}/${id}`) : navigate(`/permissions/${type}`);
    };
    
    const roles = useQuery({
        queryKey: ['roles'],
        queryFn: () => RoleServices.getAll().then((res) => res),
    });
    
    const features = useQuery({
        queryKey: ['features'],
        queryFn: () => FeatureServices.getAll().then((res) => res),
    });
    if (isLoading) {
        return <LinearProgress color="primary" />;
    }
    if (error) {
        return <Alert variant='outlined' severity='error'>Couldn't load data.</Alert>;
    }
    const columns=[    
        { 
            field: 'RoleId', 
            headerName: 'Feature Id', 
            width: 250, 
            editable: false,
            type: 'singleSelect',
            valueOptions:(roles.data as Role[])?.map((role) =>({'value': role.Id, 'label': role.Name})),
        },
        { 
            field: 'FeatureId', 
            headerName: 'Feature Name', 
            width: 250, 
            editable: false,
            type: 'singleSelect',
            valueOptions:(features.data as Feature[])?.map((feature) =>({'value': feature.Id, 'label': feature.Name})),
        },
        { 
            field: 'PermissionLevel', 
            headerName: 'PermissionLevel', 
            width: 230, 
            editable: false,
            type: 'singleSelect',
            valueOptions:[{'value':1, 'label':'read'},{'value':2, 'label':'write'},{'value':3, 'label':'delete'}]
        },
    ];
    return (
        <DataTable 
            iRows={data || []} 
            iCols={columns} 
            idColumn='Id' 
            action={dtAction} 
            name='permissions'/>
    );
};

export default PermissionsPage;
