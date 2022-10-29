import { TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';

export default function FormikInput({ name, ...other }) {
    const { handleChange, errors, setFieldTouched, touched, values } =
        useFormikContext();

    return (
        <TextField
            fullWidth
            variant="outlined"
            style={{ marginTop: 8, marginBottom: 8 }}
            error={Boolean(name && touched[name] && errors[name])}
            value={name && values[name]}
            onChange={name && handleChange(name)}
            onBlur={() => name && setFieldTouched(name)}
            helperText={
                !!(name && touched[name] && errors[name]) && errors[name]
            }
            {...other}
        />
    );
}
