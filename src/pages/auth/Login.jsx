import { Alert, Box, Container, Stack, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as React from 'react';
import { useNavigate } from 'react-router-dom/dist';
import logo from '../../assets/react.svg';
import { useAuth } from '../../firebase/auth';
import { auth } from '../../firebase/firebase';
import { Form, FormikButton, FormikInput } from '../../formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import Loading from '../fragments/Loading';

const validator = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function AddSuggestion() {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { isLoading, authUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    setError(null);
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigate('/dashboard');
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isLoading && authUser) {
      navigate('/dashboard');
    }
  }, [authUser, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          my: 4,
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <img src={logo} style={{ width: 48, height: 48 }} />
        <Typography sx={{ mt: 2 }} variant='h6'>
          Sign in to OSB
        </Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>
          Submit you credentials as required below
        </Typography>
        <Form
          validationSchema={validator}
          onSubmit={handleSubmit}
          initialValues={{
            email: '',
            password: '',
          }}
          sx={{ mt: 1 }}
        >
          <FormikInput
            fullWidth
            label='Email address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <FormikInput
            fullWidth
            name='password'
            label='Password'
            type='password'
            autoComplete='current-password'
          />
          {error && (
            <Alert severity='error' sx={{ my: 2 }} hidden={!error}>
              {error}
            </Alert>
          )}
          <Stack
            sx={{ my: 1 }}
            justifyContent='space-between'
            alignItems='center'
            direction='row'
            spacing={2}
          >
            <Typography>Forgot password?</Typography>
            <FormikButton
              loading={loading}
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </FormikButton>
          </Stack>
        </Form>
      </Box>
    </Container>
  );
}
