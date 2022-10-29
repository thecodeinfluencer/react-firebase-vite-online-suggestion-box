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
import { useState } from 'react';
import * as Yup from 'yup';

const validator = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  description: Yup.string().required('Description is required'),
});

export default function AddSuggestion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageBlob, setImageBlob] = useState({});

  const { authUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const setStateError = err => {
    setError(err.message);
    setLoading(false);
  };

  const handleSubmit = async ({ subject, description }, { resetForm }) => {
    setLoading(true);
    setError(null);

    const saveWithImage = imageURL =>
      saveSuggestion({
        imageURL,
        subject,
        description,
        date: Date.now(),
      })
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Suggestion saved', { variant: 'success' });
          resetForm();
        })
        .catch(err => {
          setStateError(err);
        });

    if (!imageBlob) {
      saveWithImage('https://via.placeholder.com/50');
      return;
    }

    await uploadImage(imageBlob[0], authUser?.uid || `images`)
      .then(imageURL => {
        saveWithImage(imageURL);
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
          validationSchema={validator}
          initialValues={{
            image: '',
            subject: 'Your company HQ',
            description:
              'Please move your HQ to a more central place so that more people can access your services',
          }}
          sx={{ mt: 1 }}
        >
          <FormikInput
            required
            fullWidth
            label='Subject'
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
            onSelectFiles={setImageBlob}
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
