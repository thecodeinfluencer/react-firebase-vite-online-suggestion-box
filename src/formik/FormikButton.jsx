import { LoadingButton } from '@mui/lab';
import { useFormikContext } from 'formik';
import React from 'react';

export default function FormikButton({ children, ...other }) {
  const formikContext = useFormikContext();

  return (
    <LoadingButton
      style={{
        marginTop: 4,
        marginBottom: 4,
      }}
      onClick={formikContext.handleSubmit}
      {...other}
    >
      {children}
    </LoadingButton>
  );
}
