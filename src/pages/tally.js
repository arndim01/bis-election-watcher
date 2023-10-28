import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    MenuItem
} from '@mui/material';
import Layout from '@/layouts/Layout';
import { useTally } from '@/helpers/hooks/tally';
import TallyList from '@/content/Tally/TallyList';
import { useSession } from 'next-auth/react';
import { ApiGetPrecinctByParty } from '@/helpers/hooks/precinct';


const precinctMapper = (data) => {

    let list = [];
    if( data && data.length > 0){
        data.forEach(element => {
        
            list.push({ value: element.identity_number, label: element.name });
    
        });
    }
    return list;
};


function TallyPage(){
    const { data: session} = useSession();
    const [precinct, setPrecinct] = useState('1');
    const [precinctList, setPrencinctList] = useState([]);
    const { data, error } = useTally({ precinct: precinct});
    
    
    useEffect(() => {
        getPrecinctList();
    }, [session]);
    
    const getPrecinctList = async () => {
        if( session ){
            const { data, error} = await ApiGetPrecinctByParty({  token: 'token', id: session.user.party});
            setPrencinctList(precinctMapper(data));
        }

    }
    
    if( error ) return (<h1>Loading failed...</h1>);
    if( !data ) return (<h1>Loading...</h1>);

    return (
        <>
            <Head>
            <title>Start tally</title>
            </Head>
            {data &&
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}

                    >
                        <Box sx={{m: 1}}>
                            <Typography variant='h5'>
                                Precinct
                            </Typography>
                        </Box>
                        <Box >
                            <TextField
                                select
                                label="Precinct"
                                defaultValue=""
                                value={precinct}
                                onChange={(event) => {
                                    setPrecinct(event.target.value);
                                }}
                                sx={{
                                    width: 150
                                }}
                            
                            >   
                                {precinctList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        

                        
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Barangay {data.brgy_name}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Inspector: {data.inspector}
                        </Typography>
                    </Box>
                    { data.candidates &&
                        <TallyList list={data.candidates} />
                    }
                    
                </Container>
            }
        </>
    );
}

TallyPage.getLayout = (page) => (
    <Layout>{page}</Layout>
);

export default TallyPage;