import { Container, Paper } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import {
    AppHeader,
    CopyrightFooter,
    NavigationBreadcrumb,
} from 'src/components';

const UserLayout: React.FC = () => {
    return (
        <>
            <AppHeader />
            <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:bg-gray-50 bg-primary-50 py-1">
                <Paper
                    elevation={0}
                    sx={{ margin:2, marginLeft: 3, marginRight: 3}}
                >
                    <NavigationBreadcrumb />
                </Paper>
                <Paper
                    elevation={1}
                    sx={{
                        padding: 4,
                        margin: 3,
                        marginTop: 1,
                        minHeight: '70vh',
                    }}
                >
                    <Outlet />
                </Paper>
                <CopyrightFooter />
            </Container>
        </>
    );
};

export default UserLayout;
