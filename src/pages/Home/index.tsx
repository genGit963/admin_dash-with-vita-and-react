import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <TextField
        label="Search Products and Shops"
        variant="outlined"
        value={searchTerm}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default HomePage;
