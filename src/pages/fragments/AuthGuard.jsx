import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import { useAuth } from '../../firebase/auth';
import Loading from './Loading';

export default function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { authUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !authUser) {
      navigate('/login');
    }
  }, [authUser, isLoading]);

  console.log({
    isLoading,
    authUser,
  });

  return !authUser ? <Loading /> : <Box>{children}</Box>;
}
