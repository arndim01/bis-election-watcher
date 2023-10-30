import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
    Grid,
    Tab,
    Tabs,
    Container,
    Card,   
    Box,
    useTheme,
    styled,
    Typography,
    TextField
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { getToken } from 'next-auth/jwt';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Layout from '@/layouts/Layout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import { ApiPostCount, ApiPostCountTally } from '@/helpers/hooks/tally';
import { ValidateProps } from '@/helpers/api/constants';
import SendIcon from '@mui/icons-material/Send';
import VoteField from '@/components/Input/VoteField';

const applyFilters = (list, filter) => {

    const filtered = list.filter( function(candidate){
        return candidate.position_name == filter;
    });


    return filtered.length > 0? filtered: null;
}

function TallyList({list, status}){

    const [loading, setLoading] = useState(false);

    const filterCaptain = applyFilters(list, "Captain");
    const filterCounsilor = applyFilters(list, "Councilor");
    const filterSkChairman = applyFilters(list, "SK Chairman");
    const filterSKCounsilor = applyFilters(list, "SK Councilor");
    const filterIndependent = applyFilters(list, "Independent");

    const { data: session } = useSession();

    async function postVote(values, types){
        setLoading(true);
        if( values.totalcount == 0 && types == "minus"  ) {
            setLoading(false);
            return false;
        } 
        if( types =="add"){
            values.totalcount++;
        }else{
            values.totalcount--;
        }
        
        const fields = Object.keys(ValidateProps.candidate_count);
        let formData = new FormData();
        
        formData.append("type", types); //user_id session
        fields.forEach(field => {
            if( values[field]){
                formData.append(field, values[field]);
            }
        });

        if(session){
            formData.append("created_by", session.user.uid); //user_id session
        }

        let formDataObjects = Object.fromEntries(formData.entries());
        const { data, error} = await ApiPostCount({ token: "token", formData: formDataObjects});
        setLoading(false);        
    }

    const handleClickAdd = async (values) => {
        
        await postVote(values, "add");
    };

    const handleClickMinus = async (values) => {
        
        await postVote(values, "minus");
    };

    const uploadCountValue = async (object, values) => {
        setLoading(true);
        let formData = new FormData();
        const fields = Object.keys(ValidateProps.candidate_count);
        formData.append("tally_number", values);
        fields.forEach(field => {
            if( object[field]){
                formData.append(field, object[field]);
            }
        });

        if(session){
            formData.append("user_id", session.user.uid); //user_id session
        }
        let formDataObjects = Object.fromEntries(formData.entries());
        const {data, error} = await ApiPostCountTally({ token: "token", formData: formDataObjects});
        setLoading(false);
    }

    return(
        <>
            <Box sx={{
                    mt: 5
                }}>

                    { filterCaptain &&
                        <>
                            <Typography variant='h6'>
                                Captain
                            </Typography>
                            <List
                            sx={{
                                width: '100%',
                                maxWidth: 560,
                                bgcolor: 'background.paper',
                                '& .MuiListItemText-primary': { width: '150px' },
                                '& .MuiTextField-root': { m: 1, width: '80px' },
                            }}
                            >

                            {  filterCaptain.map((row)=> {

                                return(
                                    <ListItem key={row.cand_id}>
                                        <Box
                                            sx={{
                                                display:'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display:'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >

                                                <ListItemAvatar sx={{
                                                    mr:2
                                                }}>
                                                {
                                                    row.photo_url &&
                                                    <Avatar sx={{ height: 50, width: 50}} src={row.photo_url}/>
                                                }
                                                </ListItemAvatar>
                                                <ListItemText primary={row.fullname} secondary="Captain" />
                                            </Box>
                                            <Box
                                                sx={{
                                                    display:'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <VoteField 
                                                    value={row.totaloverride}
                                                    handleUploadValue={uploadCountValue}
                                                    disable={loading || status}
                                                    object={row}
                                                />
                                            </Box>
                                        </Box>

                                    </ListItem>
                                )
                                
                            })}
                            
                            </List>
                        </>
                    }

                    { filterCounsilor &&
                        <>
                            <Typography variant='h6'>
                                Councilor
                            </Typography>
                            <List
                            sx={{
                                width: '100%',
                                maxWidth: 560,
                                bgcolor: 'background.paper',
                                '& .MuiListItemText-primary': { width: '200px' }
                            }}
                            >
                                {  filterCounsilor.map((row)=> {

                                    return(
                                        <ListItem key={row.cand_id}>
                                            <Box
                                                sx={{
                                                    display:'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display:'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >

                                                    <ListItemAvatar sx={{
                                                        mr:2
                                                    }}>
                                                    {
                                                        row.photo_url &&
                                                        <Avatar sx={{ height: 50, width: 50}} src={row.photo_url}/>
                                                    }
                                                    </ListItemAvatar>
                                                    <ListItemText primary={row.fullname} secondary="Councilor" />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display:'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >
                                                    <VoteField 
                                                        value={row.totaloverride}
                                                        handleUploadValue={uploadCountValue}
                                                        disable={loading || status}
                                                        object={row}
                                                    />
                                                </Box>
                                            </Box>
                                        </ListItem>
                                    )

                                })}

                                {  filterIndependent.map((row)=> {

                                return(
                                    <ListItem key={row.cand_id} >
                                        <Box
                                                sx={{
                                                    display:'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display:'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >

                                                    <ListItemAvatar sx={{
                                                        mr:2
                                                    }}>
                                                    {
                                                        row.photo_url &&
                                                        <Avatar sx={{ height: 50, width: 50}} src={row.photo_url}/>
                                                    }
                                                    </ListItemAvatar>
                                                    <ListItemText primary={row.fullname} secondary="Councilor" />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display:'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >
                                                    <VoteField 
                                                        value={row.totaloverride}
                                                        handleUploadValue={uploadCountValue}
                                                        disable={loading || status}
                                                        object={row}
                                                    />
                                                </Box>
                                            </Box>
                                    </ListItem>
                                )

                                })}
                            </List>
                        </>
                    }

                    { filterSkChairman &&
                        <>
                            <Typography variant='h6'>
                                SK Chairman
                            </Typography>
                            <List
                            sx={{
                                width: '100%',
                                maxWidth: 560,
                                bgcolor: 'background.paper',
                                '& .MuiListItemText-primary': { width: '200px' }
                            }}
                            >
                                {  filterSkChairman.map((row)=> {

                                    return(
                                        <ListItem key={row.cand_id}>
                                            <Box
                                                sx={{
                                                    display:'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display:'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >

                                                    <ListItemAvatar sx={{
                                                        mr:2
                                                    }}>
                                                    {
                                                        row.photo_url &&
                                                        <Avatar sx={{ height: 50, width: 50}} src={row.photo_url}/>
                                                    }
                                                    </ListItemAvatar>
                                                    <ListItemText primary={row.fullname} secondary="SK Chairman" />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display:'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >
                                                    <VoteField 
                                                        value={row.totaloverride}
                                                        handleUploadValue={uploadCountValue}
                                                        disable={loading || status}
                                                        object={row}
                                                    />
                                                </Box>
                                            </Box>
                                        </ListItem>
                                    )

                                })}
                            </List>
                        </>
                    }

                    { filterSKCounsilor &&
                        <>
                            <Typography variant='h6'>
                                SK Councilor
                            </Typography>
                            <List
                            sx={{
                                width: '100%',
                                maxWidth: 560,
                                bgcolor: 'background.paper',
                                '& .MuiListItemText-primary': { width: '200px' }
                            }}
                            >
                                {  filterSKCounsilor.map((row)=> {

                                    return(
                                        <ListItem key={row.cand_id}>
                                            <Box
                                                sx={{
                                                    display:'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display:'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >

                                                    <ListItemAvatar sx={{
                                                        mr:2
                                                    }}>
                                                    {
                                                        row.photo_url &&
                                                        <Avatar sx={{ height: 50, width: 50}} src={row.photo_url}/>
                                                    }
                                                    </ListItemAvatar>
                                                    <ListItemText primary={row.fullname} secondary="SK Councilor" />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display:'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >
                                                    <VoteField 
                                                        value={row.totaloverride}
                                                        handleUploadValue={uploadCountValue}
                                                        disable={loading || status}
                                                        object={row}
                                                    />
                                                </Box>
                                            </Box>
                                        </ListItem>
                                    )

                                })}
                            </List>
                        </>
                    }
                    
                </Box>
        </>
    );
}

export default TallyList;