import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import NextLink from 'next/link';
import { styled, alpha } from '@mui/material';
import Layout from '@/layouts/Layout';
import { useSession } from 'next-auth/react';


const MenuWrapper = styled(Box)(
  ({theme}) => `
    a.menutiles  {
      text-decoration: none;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: #333;
    }
    .MuiTypography-h5{
      font-size: 20px;
    }
  `
);

function HomePage() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data: session} = useSession();


  
  React.useEffect(() => {

    if( session){
    }
  }, [session]);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

      <>
      <Head>
      <title>Election Watcher</title>
      </Head>
      <MenuWrapper>
      <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            '& > :not(style)': {
              m: 1,
              width: 160,
              height: 258,
            },
          }}
        >      
            <Paper elevation={3}
              sx={{
                textAlign: "center",
              }}
            >
              <NextLink className='menutiles' href="/tally" passHref>
                <Box sx={{
                  mt: 3,
                  width: 150
                  
                }}>
                  <Typography
                    variant='h5'
                  >
                    Tally Votes
                  </Typography>
                </Box>
                <Box
                  
                  component="img"
                  sx={{
                    m:1,
                    width: 150,
                  }}
                  alt="Upload preview"
                  src="/static/images/watcher/tally-votes.png"
                  />
              </NextLink>
            </Paper>

            { session && session.user.role !== 'watcher' &&
              <>
                
              <Paper elevation={3}
                sx={{
                  textAlign: "center",
                }}
              >
                <NextLink className='menutiles' href="/checker" passHref>
                  <Box sx={{
                    mt: 3,
                    width: 150
                    
                  }}>
                    <Typography
                      variant='h5'
                    >
                      Check results
                    </Typography>
                  </Box>
                  <Box
                    
                    component="img"
                    sx={{
                      m:1,
                      width: 120,
                    }}
                    alt="Upload preview"
                    src="/static/images/watcher/check-tally.png"
                    />
                </NextLink>
              </Paper>
              </>
            }

            
          </Box>
        </MenuWrapper>
      </>
      
  );
}

HomePage.getLayout = (page) => (
  <Layout>{page}</Layout>
);

export default HomePage;