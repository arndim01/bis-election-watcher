import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    MenuItem,
    Button
} from '@mui/material';
import Layout from '@/layouts/Layout';
import { ApiGetTally, useTally } from '@/helpers/hooks/tally';
import TallyList from '@/content/Tally/TallyList';
import { useSession } from 'next-auth/react';
import { ApiGetPrecinctByParty } from '@/helpers/hooks/precinct';
import TallyCheckerList from '@/content/Tally/TallyCheckerList';
import DisableVotesDialog from '@/components/Dialog/DisableVotesDialog';
import { getToken } from 'next-auth/jwt';


const precinctMapper = (data) => {

    let list = [];
    if( data && data.length > 0){
        data.forEach(element => {
        
            list.push({ value: element.identity_number, label: element.name });
    
        });
    }
    return list;
};


function CheckerTallyPage(){
    const { data: session} = useSession();
    const [precinct, setPrecinct] = useState('1');
    const [precinctList, setPrencinctList] = useState([]);
    const [ data, setData ] = useState('');
    const [loading, setLoading ] = useState(false);

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);
    const [mode, setMode] = useState('');
    

    const handleConfirmationOpen = async (value) => {
        setSelectedItem(precinct);
        setMode(value);
        setOpen(true);
    }

    const handleConfirmationClose = (value) => {
        setOpen(false);
    }

    useEffect(() => {
        getPrecinctList();
        getPrecinctCandidate(1);
    }, [session]);
    
    const getPrecinctList = async () => {
        if( session ){
            const { data, error} = await ApiGetPrecinctByParty({  token: 'token', id: session.user.party});
            setPrencinctList(precinctMapper(data));
        }

    }

    const getPrecinctCandidate = async (value) => {
        setLoading(true);
        if( session ) {
            const { data, error } = await ApiGetTally({ token: 'token', precinct: value});
            if( data) setData(data);
        }
        setLoading(false);

    }

    if( loading ) return (<h1>Loading...</h1>);

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
                                    getPrecinctCandidate(event.target.value);
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
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Status: {data.disable_count?'Freeze': 'Unfreeze'}
                        </Typography>
                    </Box>
                    { data.candidates &&
                        <TallyCheckerList list={data.candidates} />
                    }
                    <Box sx={{
                        display: 'flex',
                        '& .MuiButton-contained': { m: 2, width: '200px' }
                    }}>
                        <Button variant="contained" onClick={() => handleConfirmationOpen("freeze")}  >Freeze</Button>
                        <Button variant="contained" onClick={() => handleConfirmationOpen("unfreeze")} color='error'>Unfreeze</Button>
                    </Box>
                </Container>
            }
            <DisableVotesDialog 
                open={open}
                onClose={handleConfirmationClose}
                selectedItem={selectedItem}
                mode={mode}
            />
        </>
    );
}

CheckerTallyPage.getLayout = (page) => (
    <Layout>{page}</Layout>
);

export default CheckerTallyPage;

export async function getServerSideProps( context ){
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req: context.req, secret});

    if( token.user.role == "watcher"){
        return {
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }


    return { props: {}}
}