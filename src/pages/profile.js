import TextField from '@mui/material/TextField';
import Layout from '@/layouts/Layout';
import { Card, Box, Container, CardContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoginIcon from '@mui/icons-material/Login';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { ApiGetUserInfo, ApiUpdateUserInfo } from '@/helpers/hooks/user';
import customUseForm from '@/helpers/general/customUseForm';
import { ValidateProps } from '@/helpers/api/constants';

function AccountPage(){

    const { data: session } = useSession();
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('Firstname is required'),
        last_name: Yup.string().required('Lastname is required'),
        mobile_number: Yup.string().required('Mobilenumber is required')
    });
    const { register, handleSubmit, setError, reset, setValue, formState, formState:{ errors }}  = customUseForm(useForm({
        resolver: yupResolver(validationSchema)
    }));

    useEffect(() => {
        fetchUserInfo();
    }, [session]);

    const fetchUserInfo = async()=>{
        if(session){
            const { data, error } = await ApiGetUserInfo({ token: "token", username: session.user.username}); 
            const fields = Object.keys(data);
            fields.forEach(field => {
                setValue(field, data[field]);
            });
        }
    }

    async function onSubmit (values)  {
        const fields = Object.keys(ValidateProps.profile);
        let formData = new FormData();
        fields.forEach( field => {
            if( values[field]){
                formData.append(field, values[field]);
            }
        });
        if( session.user.username){
            let formDataObject = Object.fromEntries(formData.entries());            
            const { data, error} = await ApiUpdateUserInfo({ token: "token", username: session.user.username, formData: formDataObject });
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
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        '& .MuiLoadingButton-root': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)} 
                >

                        <Typography variant='h6'>
                            Profile
                        </Typography>
                        <TextField
                            label="First Name"
                            {...register('first_name')}
                            error={errors.first_name != null}
                            helperText={errors.first_name && errors.first_name.message}
                        />
                        <TextField
                            label="Middle Name"
                            {...register('middle_name')}
                            error={errors.middle_name != null}
                            helperText={errors.middle_name && errors.middle_name.message}
                        />
                        <TextField
                            label="Last Name"
                            {...register('last_name')}
                            error={errors.last_name != null}
                            helperText={errors.last_name && errors.last_name.message}
                        />
                        <TextField
                            label="Last Name"
                            {...register('mobile_number')}
                            error={errors.mobile_number != null}
                            helperText={errors.mobile_number && errors.mobile_number.message}
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
                </Box>
            </Container>
        </>
    );
};

AccountPage.getLayout = (page) => (
    <Layout>{page}</Layout>
);

export default AccountPage;