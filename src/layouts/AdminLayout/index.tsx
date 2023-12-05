import { AppHeader } from 'src/components';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
function AdminLayout() {

  return (
    <Box sx={{ display: 'flex' }}>
      <AppHeader/>
      <Box component="main" sx={{ flexGrow: 1, paddingX: 3, paddingY: 10, overflow:'auto' }}>
        <Outlet/>
        </Box>
    </Box>
  );
}

export default AdminLayout;
