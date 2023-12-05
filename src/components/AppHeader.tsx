import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Logo from 'src/assets/logo.svg';
import { Badge, Collapse, Menu, MenuItem } from '@mui/material';
import {
  AccountCircle,
  Business,
  Category,
  ChevronLeft,
  Commute,
  DirectionsCar,
  CarRental,
  ExpandLess,
  ExpandMore,
  Home,
  Key,
  ManageAccounts,
  Notifications,
  PeopleAlt,
  Person,
  Shield,
} from '@mui/icons-material';
import { useUserStore } from 'src/stores';
import { UserServices } from 'src/services';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 0,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(99% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const AppHeader: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { delUser } = useUserStore();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    UserServices.logout().then(() => {
      delUser();
    });
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Home />, link: '/' },
    {
      text: 'Fleet Management',
      icon: <CarRental />,
      subItems: [
        { text: 'Vehicles', icon: <DirectionsCar />, link: '/vehicles' },
        { text: 'Vehicle Types', icon: <Commute />, link: '/vehicles/create' },
      ],
    },
    {
      text: 'Users & Permission',
      icon: <ManageAccounts />,
      subItems: [
        { text: 'Users', icon: <Person />, link: '/users' },
        { text: 'Roles', icon: <Shield />, link: '/roles' },
        { text: 'Features', icon: <Category />, link: '/features' },
        { text: 'Permission', icon: <Key />, link: '/permissions' },
      ],
    },
    {
      text: 'Agencies & Agents',
      icon: <ManageAccounts />,
      subItems: [
        { text: 'Agencies', icon: <Business />, link: '/agencies' },
        { text: 'Agents', icon: <PeopleAlt />, link: '/agents' },
      ],
    },
  ];

  const [openSubItems, setOpenSubItems] = React.useState<Array<boolean>>(
    new Array(menuItems.length).fill(false),
  );

  const handleClick = (index: number) => {
    const newOpenSubItems = [...openSubItems];
    newOpenSubItems[index] = !newOpenSubItems[index];
    setOpenSubItems(newOpenSubItems);
  };

  // Button theme
  const generateButtonStyles = () => ({
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    color: theme.palette.tertiary?.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '10px',
      margin: '5px 5px',
    },
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          boxShadow: 'none',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(2px)',
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: '5%',
              display: open ? 'none' : 'block',
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleDrawerClose}
            sx={{
              display: open ? 'block' : 'none',
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="primary"
            sx={{ marginLeft: 'auto' }}
          >
            <Badge badgeContent={17} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            color="primary"
            aria-label="user profile"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '10px',
            margin: '5px',
            height: '99%',
          },
        }}
      >
        {open ? (
          <DrawerHeader sx={{ color: theme.palette.tertiary?.main }}>
            <Box
              component={'img'}
              sx={{
                width: '50px',
                height: 'auto',
              }}
              alt=""
              src={Logo}
            ></Box>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ margin: 'auto' }}
            >
              Aussieverest
            </Typography>
          </DrawerHeader>
        ) : (
          <Box
            component={'img'}
            sx={{
              width: '50px',
              height: 'auto',
              margin: 'auto',
              marginTop: '5px',
              marginBottom: '5px',
            }}
            alt=""
            src={Logo}
          ></Box>
        )}
        <Divider
          sx={{
            border: `1px solid ${theme.palette.secondary.main}`,
            margin: 'auto',
            marginTop: '0',
            marginBottom: '0',
            width: '88%',
            borderRadius: '2px',
          }}
        />
        <List>
          {menuItems.map((menuItem, index) => (
            <React.Fragment key={index}>
              {menuItem.subItems ? (
                <React.Fragment>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      color: theme.palette.tertiary?.main,
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.tertiary?.main,
                        borderRadius: '10px',
                        margin: '5px',
                      },
                    }}
                    onClick={() => handleClick(index)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                        ml: open ? 'auto' : 3,
                        color: theme.palette.tertiary?.main,
                      }}
                    >
                      {menuItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        ml: 3,
                      }}
                      primary={menuItem.text}
                    />
                    {open ? (
                      openSubItems[index] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={openSubItems[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {open ? (
                      <List component="div" disablePadding sx={{ pl: 1 }}>
                        {menuItem.subItems.map((subItem, subIndex) => (
                          <Box>
                            <ListItemButton
                              key={subIndex}
                              component={Link}
                              to={subItem.link}
                              sx={{
                                width: '95%',
                                ...generateButtonStyles(),
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  color: theme.palette.tertiary?.main,
                                }}
                              >
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText primary={subItem.text} />
                            </ListItemButton>
                          </Box>
                        ))}
                      </List>
                    ) : (
                      <List
                        component="div"
                        disablePadding
                        sx={{
                          m: 10,
                          position: 'fixed',
                          background: `${theme.palette.primary.main}99`,
                          borderRadius: '10px',
                          mt: -7,
                          width: 1/5,
                          backdropFilter: 'blur(5px)',
                        }}
                      >
                        {menuItem.subItems.map((subItem, subIndex) => (
                          <ListItemButton
                            key={subIndex}
                            component={Link}
                            to={subItem.link}
                            sx={{
                              display: 'flex',
                              alignContent: 'space-between',
                              ...generateButtonStyles(),
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color: theme.palette.tertiary?.main,
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        ))}
                      </List>
                    )}
                  </Collapse>
                </React.Fragment>
              ) : (
                <ListItemButton
                  component={Link}
                  to={menuItem.link}
                  sx={{
                    ...generateButtonStyles(),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.tertiary?.main,
                      mr: 1,
                      ml: open ? 'auto' : 3,
                    }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText 
                  sx={{
                    ml: -2
                  }}
                  primary={menuItem.text} />
                </ListItemButton>
              )}
            </React.Fragment>
          ))}
        </List>
        {/* <Box
            sx={{
              background: theme.palette.tertiary?.main,
              color: theme.palette.primary.main,
              padding: '96px',
              margin: 'auto',
              marginBottom: '5px',
              marginLeft: '5px',
              marginRight: '5px',
              position: 'absolute',
              bottom:'0',
              alignItems: 'flex-end',
              borderRadius: '10px'
            }}
          >
            Hello
          </Box> */}
      </Drawer>
    </Box>
  );
};
export default AppHeader;