import { MenuItem, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';

export default function FormikSelect({
    data,
    onSelectItem,
    selectedItem,
    name,
    ...other
}) {
    const {
        errors,
        setFieldTouched,
        touched,
        handleChange,
        setFieldValue,
        values,
    } = useFormikContext();

    useEffect(() => {
        name && handleChange(name);
        selectedItem && setFieldValue(name, selectedItem);
    }, [handleChange, name, setFieldValue, selectedItem]);

    return (
        <TextField
            select
            variant="outlined"
            style={{ width: '100%', marginTop: 8, marginBottom: 8 }}
            error={Boolean(name && touched[name] && errors[name])}
            value={name && values[name]}
            helperText={
                !!(name && touched[name] && errors[name]) && errors[name]
            }
            onBlur={() => {
                name && setFieldTouched(name);
            }}
            onChange={(e) => onSelectItem && onSelectItem(e.target.value)}
            {...other}
        >
            {data?.map((item) => {
                const value = item.value;
                return (
                    <MenuItem
                        key={value}
                        value={value}
                        onClick={() => {
                            setFieldValue(name, value);
                        }}
                    >
                        {item.label}
                    </MenuItem>
                );
            })}
        </TextField>
    );
}
