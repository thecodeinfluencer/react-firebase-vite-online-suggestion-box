import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuth } from '../../firebase/auth';
import { auth } from '../../firebase/firebase';
import AuthGuard from '../fragments/AuthGuard';

export default function Suggestions() {
  const { authUser } = useAuth();

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthGuard>
      <>
        <AppBar>
          <Toolbar
            sx={{ bgcolor: 'background.default', color: 'text.primary' }}
          >
            <Typography>Suggestions</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction='row' spacing={2}>
              <Button variant='outlined' size='small' onClick={logout}>
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container component='main' maxWidth='md'>
          <Box sx={{ width: '100%', height: 56 + 16 }} />
          <Alert sx={{ mb: 2 }} severity='info'>
            Logged in as {authUser?.email}
          </Alert>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
              <Grid key={item} item xs={12} sm={6} md={6}>
                <Card variant='outlined'>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary='Text' secondary='Secondary text' />
                  </ListItem>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    </AuthGuard>
  );
}
