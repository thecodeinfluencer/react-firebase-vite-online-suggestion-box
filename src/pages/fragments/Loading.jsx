import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        width: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
