import React from 'react';
import { Grid, Typography } from '@mui/material';
import { QuickLinks } from 'src/components';
import NotificationList from 'src/components/NotificationList';

const DashboardPage: React.FC = () => {
    return (
        <Grid container>
            <Grid item xs={8}>
                <Typography variant="h6" sx={{ marginLeft: 2 }}>
                    System Notification
                </Typography>
                <NotificationList />
            </Grid>
            <Grid item xs={3} sx={{ml: 4}}>
                <Typography variant="h6" sx={{ marginLeft: 2 }}>
                    Quick Links
                </Typography>
                <QuickLinks />
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
