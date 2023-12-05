import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from 'src/theme';

export interface LinkCardProps {
  title: string;
  uri: string;
  description: string;
  icon: React.ReactNode;
}

const LinkCard: React.FC<LinkCardProps> = ({
  title,
  uri,
  description,
  icon,
}) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sx={{ m: 2 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: '10px',
          background: theme.palette.primary.main,
          color: theme.palette.tertiary.main,
          '&:hover': {
            background: theme.palette.tertiary.main,
            color: theme.palette.primary.main,
          },
        }}
      >
        <CardActionArea onClick={() => navigate(uri)}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid
                item
                sx={{
                  background: theme.palette.secondary.main,
                  padding: '0px',
                  margin: '10px 10px 0 10px',
                  borderRadius: '50px',
                }}
              >
                {icon}
              </Grid>
              <Grid item>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body1">{description}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default LinkCard;
