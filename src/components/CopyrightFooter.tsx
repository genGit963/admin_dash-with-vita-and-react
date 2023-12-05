import React from 'react';

import { Typography } from '@mui/material';

const CopyrightFooter: React.FC = () => {
    return (
        <Typography className='copyright' padding={2} variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} Aussie Everest pvt. ltd.
        </Typography>
    );
};

export default CopyrightFooter;
