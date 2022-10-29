import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import logo from '../../assets/react.svg';
import { useAuth } from '../../firebase/auth';
import { uploadImage } from '../../firebase/storage';
import { saveSuggestion } from '../../firebase/firestore';
import { Form, FormikButton, FormikInput } from '../../formik';
import { useSnackbar } from 'notistack';

export default function AddSuggestion() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { authUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const setStateError = err => {
    setError(err.message);
    setLoading(false);
  };

  const handleSubmit = async (
    { image, subject, description },
    { resetForm }
  ) => {
    setLoading(true);
    setError(null);
    await uploadImage(image, authUser?.uid || `images`)
      .then(imageURL => {
        console.log('uploaded', {
          imageURL,
          subject,
          description,
        });

        saveSuggestion({
          imageURL: `${imageURL}`,
          subject,
          description,
        })
          .then(() => {
            setLoading(false);
            enqueueSnackbar('Suggestion saved', { variant: 'success' });
            resetForm();
          })
          .catch(err => {
            setStateError(err);
          });
      })
      .catch(err => {
        setStateError(err);
      });
  };

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
          Welcome to OSB
        </Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>
          Kindly add your suggestion to the inputs below
        </Typography>
        <Form
          onSubmit={handleSubmit}
          initialValues={{
            image: '',
            subject: '',
            description: '',
          }}
          sx={{ mt: 1 }}
        >
          <FormikInput
            required
            fullWidth
            label='Subject Matter'
            name='subject'
            autoFocus
          />
          <FormikInput
            required
            fullWidth
            name='description'
            label='Description'
            multiline
            rows={4}
          />
          <FormikInput
            required
            fullWidth
            label='Image'
            placeholder='Image'
            name='image'
            accept='image/*'
            type='file'
          />
          {error && (
            <Alert sx={{ my: 2 }} severity='error'>
              {error}
            </Alert>
          )}
          <Stack justifyContent='flex-end' direction='row' spacing={2}>
            <FormikButton
              loading={loading}
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Suggestion
            </FormikButton>
          </Stack>
        </Form>
      </Box>
    </Container>
  );
}
