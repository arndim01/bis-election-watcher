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
import { signIn, useSession } from 'next-auth/react';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect } from 'react';
import { useTallyVote, useTally } from '@/helpers/hooks/tally';
import Layout from '@/layouts/Layout';
import Head from 'next/head';
import LiveTallyList from '@/content/Live/LiveList';

function LivePage(props){
    const formData = new FormData();
    formData.append('barangay_id', props.data.barangay),
    formData.append('party_id',props.data.party);
    let formDataObject = Object.fromEntries(formData.entries());    
    const { data, error} = useTallyVote({ formData: formDataObject});

    return(
        <>
            <Head>
                <title>Live Tally</title>
            </Head>
            <Container maxWidth="false">
                { data && 
                    <LiveTallyList list={data} />
                }
            </Container>
        </>
    );
}

export default LivePage;

export async function getServerSideProps( context ){
    const { barangay, party} = context.query;
    const data = {barangay, party}
    return { props: {
        data
     }}
}