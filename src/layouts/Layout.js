import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NextLink from 'next/link';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { signOut, useSession } from 'next-auth/react';

const Layout = ({ children }) => {

    const { data: session } = useSession();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        if( session ){


            console.log(session);
            signOut();
        }
    };



    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <NextLink href="/" passHref style={{ textDecoration: 'none', color: '#fff' }}>
                        Watcher
                    </NextLink>
                </Typography>
                {auth && (
                    <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                         <MenuItem onClick={handleClose}>
                            <NextLink href="/profile" passHref style={{ textDecoration: 'none', color: '#333' }}>
                                Profile
                            </NextLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <NextLink href="/account" passHref style={{ textDecoration: 'none', color: '#333' }}>
                                Account
                            </NextLink>
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                    </Menu>
                    </div>
                )}
                </Toolbar>
            </AppBar>
            <Box sx={{ height: 20 }} />
            <Box 
             sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
             }}
            
            display="block">{children}</Box>
        </Box>
    );

}

Layout.prototype = {
    children: PropTypes.node
};

export default Layout;