import { 
    Avatar, 
    Alert,
    Container,
    Box,
    Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputField  from 'src/components/Input/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';

function LoginPage() {

    const router = useRouter();
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const { control, handleSubmit, setError, formState } = useForm({
        defaultValues: {
          username: '',
          password: ''
        },
        resolver: yupResolver(validationSchema)
      });

    const { errors } = formState;

    const onSubmit = async({ username, password}) => {
        return await signIn('credentials', {
                redirect: false,
                username: username,
                password: password
            }).then( ({ ok, error}) => {

                if( ok ){
                    router.push('/');
                }else{
                    setError('apiError', { message: error}); 
                }
            });
            // .catch( error => {
            //     setError('apiError', { message: error});
            // })
    };

    return(
        <>
            <Container
                component="main"
                maxWidth="xs"
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }} src='/static/images/watcher/barangay_carreta.png' />
                    <Typography component="h1" variant='h6'>
                        Barangay Election
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                        <InputField name="username" control={control} type="text" label="Username" />
                        <InputField name="password" control={control} type="password" label="Password" />

                        <LoadingButton
                            fullWidth
                            disabled={formState.isSubmitting}
                            color="primary"
                            loading={formState.isSubmitting}
                            loadingPosition="start"
                            startIcon={<LoginIcon/>}
                            variant="contained"
                            type="submit"
                        >
                            <span color='#fff'>Login</span>
                        </LoadingButton>
                        { errors.apiError &&
                            <Alert severity="success" color="error">
                                { errors.apiError?.message }
                            </Alert>
                        }
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default LoginPage;