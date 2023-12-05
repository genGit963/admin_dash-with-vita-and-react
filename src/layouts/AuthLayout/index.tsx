import { Avatar, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import './index.css';
import { CopyrightFooter } from 'src/components';

const AuthLayout: React.FC = () => {
  return (
    <Container
      className="auth-layout-wrapper"
      style={{ backgroundColor: 'background.default' }}
    >
      <Container className="auth-box-container">
        <Avatar
          src="logo.png"
          sx={{
            height: '50px',
            width: '50px',
            margin: '0px auto',
            boxShadow: '0px 3px 3px 3px rgba(0,0,0,0.4)',
          }}
        />
        <Typography
          variant="h5"
          sx={{ marginTop: 1, marginBottom: 2 }}
          color="primary"
        >
          Aussie Everest
        </Typography>
        <Paper className="auth-box" elevation={10}>
          <Outlet />
        </Paper>
        <CopyrightFooter />
      </Container>
    </Container>
  );
};

export default AuthLayout;
