import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { Notification } from 'src/models';
import { NotificationServices } from 'src/services';
import { useUserStore } from 'src/stores';
import theme from 'src/theme';

const NotificationList = () => {
    const { user } = useUserStore();
    const { isLoading, error, data } = useQuery<Notification[], Error>({
        queryKey: ['dashboardNotificationData'],
        queryFn: () =>
            NotificationServices.getAll(user?.RoleId || '0')
                .then((res) => res),
    });

    const handleView = (id: number) => {
        console.log('Viewing details for ID:', id);
    };
    const convertDate = (date: number) => {
        const d = new Date(date);
        return d.toDateString();
    };
    if (isLoading) {
        return <LinearProgress color='primary'/>;
    }
    if (error) {
        return <span>Couldn't load data.</span>;
    }
    return (
        <TableContainer component={Paper} sx={{ m: 2, boxShadow: 0, border: `1px solid ${theme.palette.primary.main}`}}>
            <Table>
                <TableHead 
                    sx={{
                        background: theme.palette.primary.main,
                    }}
                >
                    <TableRow>
                        <TableCell sx={{color: 'white'}}>ID</TableCell>
                        <TableCell sx={{color: 'white'}}>Date</TableCell>
                        <TableCell sx={{color: 'white'}}>Name</TableCell>
                        <TableCell sx={{color: 'white'}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((notification) => (
                        <TableRow key={notification.Id}>
                            <TableCell>{notification.Id}</TableCell>
                            <TableCell>
                                {convertDate(notification.CreatedOn)}
                            </TableCell>
                            <TableCell>{notification.Message}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleView(notification.Id)}
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NotificationList;
