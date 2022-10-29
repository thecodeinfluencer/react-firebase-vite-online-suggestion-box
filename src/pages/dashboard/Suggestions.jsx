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
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../firebase/auth';
import { auth } from '../../firebase/firebase';
import { fetchSuggestions } from '../../firebase/firestore';
import AuthGuard from '../fragments/AuthGuard';
import Loading from '../fragments/Loading';

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const { authUser, isLoading } = useAuth();

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    (async () => {
      if (authUser) {
        const unsubscribe = await fetchSuggestions(
          setSuggestions,
          setLoadingSuggestions
        );
        return () => unsubscribe();
      }
    })();
  }, [authUser]);

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
            {suggestions.map(({ id, subject, description, imageURL }) => (
              <Grid key={id} item xs={12} sm={6} md={6}>
                <Card variant='outlined'>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={imageURL} />
                    </ListItemAvatar>
                    {console.log(imageURL)}
                    <ListItemText primary={subject} secondary={description} />
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
