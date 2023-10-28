import React from 'react';
import TextField from "@mui/material/TextField";
import { Controller } from 'react-hook-form';

const InputField = ({ name, control, type, label}) => {
    return(
        <Controller 
            name={name} 
            control={control}  
            render={({field: { onChange, value }}) => 
                <TextField 
                    margin="normal" 
                    required
                    fullWidth
                    variant="outlined"
                    name={name}
                    type={type}
                    label={label}
                    onChange={onChange}
                    value={value}
                    />
            }
        />
    );  
};

export default InputField;