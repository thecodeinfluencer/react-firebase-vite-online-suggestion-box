import { TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';

export default function FormikInput({ name, type, onSelectFiles, ...other }) {
  const {
    handleChange,
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = useFormikContext();

  return (
    <TextField
      fullWidth
      variant='outlined'
      type={type}
      style={{ marginTop: 8, marginBottom: 8 }}
      error={Boolean(name && touched[name] && errors[name])}
      value={name && values[name]}
      onChange={e => {
        name && setFieldValue(name, e.target.value);
        type == 'file' && onSelectFiles(e.target.files);
      }}
      onBlur={() => name && setFieldTouched(name)}
      helperText={!!(name && touched[name] && errors[name]) && errors[name]}
      {...other}
    />
  );
}
