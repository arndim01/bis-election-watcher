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
    Typography, ListItem, ListItemAvatar, ListSubheader, List, Avatar, ListItemText
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const applyFilters = (list, filter) => {

    const filtered = list.filter( function(position){
        return position.name == filter;
    });
    return filtered.length > 0? filtered: null;
}


function LiveTallyList({list}){

    const filterCaptain = applyFilters(list.barangay.positionlist, "Captain");
    const filterCounsilor = applyFilters(list.barangay.positionlist, "Counsilor");
    const filterSkChairman = applyFilters(list.barangay.positionlist, "SK Chairman");
    const filterSKCounsilor = applyFilters(list.barangay.positionlist, "SK Counsilor");

    console.log(filterSKCounsilor);

    return(
        <>
            <Box sx={{
                    mt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>

                    
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Party {list.name}
                        </Typography>
                    </Box>
                    { 
                        filterCaptain && filterCaptain[0].candidatelist.length > 0 &&
                            <>

                                <Typography variant='h6'>
                                    Captain
                                </Typography>
                                <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                }}
                                >

                                    { filterCaptain[0].candidatelist.map((row) => {

                                        return(
                                            <ListItem key={row.identity_number} >
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={row.fullname} />
                                                <span>{row.totalcount}</span>
                                            </ListItem>
                                        )

                                    })
                                    }
                                </List>
                            
                            </>

                    }

                    { 
                        filterCounsilor && filterCounsilor[0].candidatelist.length > 0 &&
                            <>

                                <Typography variant='h6'>
                                    Counsilor
                                </Typography>
                                <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                }}
                                >

                                    { filterCounsilor[0].candidatelist.map((row) => {

                                        return(
                                            <ListItem key={row.identity_number} >
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={row.fullname} />
                                                <span>{row.totalcount}</span>
                                            </ListItem>
                                        )

                                    })
                                    }
                                </List>
                            
                            </>

                    }

                    { 
                        filterSkChairman && filterSkChairman[0].candidatelist.length > 0 &&
                            <>

                                <Typography variant='h6'>
                                    SK Chairman
                                </Typography>
                                <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                }}
                                >

                                    { filterSkChairman[0].candidatelist.map((row) => {

                                        return(
                                            <ListItem key={row.identity_number} >
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={row.fullname} />
                                                <span>{row.totalcount}</span>
                                            </ListItem>
                                        )

                                    })
                                    }
                                </List>
                            
                            </>

                    }

                    { 
                        filterSKCounsilor && filterSKCounsilor[0].candidatelist.length > 0 &&
                            <>

                                <Typography variant='h6'>
                                    SK Counsilor
                                </Typography>
                                <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                }}
                                >

                                    { filterSKCounsilor[0].candidatelist.map((row) => {

                                        return(
                                            <ListItem key={row.identity_number} >
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={row.fullname} />
                                                <span>{row.totalcount}</span>
                                            </ListItem>
                                        )

                                    })
                                    }
                                </List>
                            
                            </>

                    }
                </Box>
        </>
    );
}

export default LiveTallyList;

