import { Avatar, Box, Typography } from "@mui/material";

function LiveCouncilor({list, title}){

    return(
        <>

            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '& .MuiTypography-h6': { height: '120px' }
                            }}>
                <Typography variant="h4">{title}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    '& > :not(style)': {
                    m: 1,
                    width: 200,
                    height: 280,
                    },
                }}
            >
                {
                    list[0].candidatelist.map((row)=> {
                        return(
                            <Box key={row.identity_number} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '& .MuiTypography-h6': { height: '120px' }
                            }}>
                                <Avatar sx={{ height: 100, width: 100}} src={row.photo_url} ></Avatar>
                                <Typography variant="h6"> {row.fullname }</Typography>
                                <Typography variant="h6"> {row.totaloverride }</Typography>
                            </Box>
                        )
                    })
                }
            </Box>
            
        </>
    )
}

export default LiveCouncilor;