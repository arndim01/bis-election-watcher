import TextField from '@mui/material/TextField';
import Layout from '@/layouts/Layout';
import { Card, Box, Container, CardContent, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoginIcon from '@mui/icons-material/Login';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ApiGetUserInfo, ApiUpdatePassword, ApiUpdateUserInfo } from '@/helpers/hooks/user';
import customUseForm from '@/helpers/general/customUseForm';
import { ValidateProps } from '@/helpers/api/constants';

function AccountPage(){

    const [message, setMessage] = useState('');
    const { data: session } = useSession();
    const validationSchema = Yup.object().shape({
        oldpassword: Yup.string().required('Old password is required'),
        newpassword: Yup.string().required('New password is required'), 
        confirmpassword: Yup.string().oneOf([Yup.ref('newpassword'), null], 'Password must be match')
    });
    const { register, handleSubmit, setError, reset, setValue, formState, formState:{ errors }}  = customUseForm(useForm({
        resolver: yupResolver(validationSchema)
    }));


    const onSubmit = async(values) => {
        const fields = Object.keys(ValidateProps.password);
        let formData = new FormData();
        fields.forEach( field => {
            if( values[field]){
                formData.append(field, values[field]);
            }
        });
        if( session.user.username){
            let formDataObject = Object.fromEntries(formData.entries());            
            const { data, error} = await ApiUpdatePassword({ token: "token", username: session.user.username, formData: formDataObject });
                setMessage('');
            if( data.error){
                setError('apiError', { message: 'Failed to change password'}); 
                console.log('error');
            }else{
                setMessage('Password changed.')
            }
        }
    }

    return(
        <>
            <Container
                component="main"
                maxWidth="xs"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)} 
                    noValidate 
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        '& .MuiLoadingButton-root': { m: 1, width: '25ch' }
                    }}
                >
                        <Typography variant='h6'>
                            Change password
                        </Typography>
                        <TextField
                            label="Old Password"
                            type="password"
                            {...register('oldpassword')}
                            error={errors.oldpassword != null}
                            helperText={errors.oldpassword && errors.oldpassword.message}
                        />
                        
                        <TextField
                            label="New Password"
                            type="password"
                            {...register('newpassword')}
                            error={errors.newpassword != null}
                            helperText={errors.newpassword && errors.newpassword.message}
                        />

                         <TextField
                            label="Confirm Password"
                            type="password"
                            {...register('confirmpassword')}
                            error={errors.confirmpassword != null}
                            helperText={errors.confirmpassword && errors.confirmpassword.message}
                        />

                        <LoadingButton
                            disabled={formState.isSubmitting}
                            color="primary"
                            loading={formState.isSubmitting}
                            loadingPosition="start"
                            startIcon={<SaveIcon/>}
                            variant="contained"
                            type="submit"
                        >
                            <span color='#fff'>Save</span>
                        </LoadingButton>
                        { message &&
                            <Alert severity="success" color="success">
                                { message }
                            </Alert>
                        }
                        { errors.apiError &&
                            <Alert severity="success" color="error">
                                { errors.apiError?.message }
                            </Alert>
                        }
                </Box>

            </Container>
        </>
    );
};

AccountPage.getLayout = (page) => (
    <Layout>{page}</Layout>
);

export default AccountPage;