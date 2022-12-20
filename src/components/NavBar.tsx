import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AccountCircle, Google } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';


export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const clientID = "971797688819-5osp62f7rkgko6ul3uvdja8k8q9jg80p.apps.googleusercontent.com"
    const handleProfileMenuOpen = () => {
        setIsMenuOpen(true)
    };

    const handleProfileMenuClose = () => {
        setIsMenuOpen(false);
    };

    const responseGoogle = (response: any) => {
        console.log(response)
        setIsLogin(true)

        try {
            axios.post('http://localhost:8080/user', {
                favorite: [],
                owner: [],
                fname: response.profileObj.givenName,
                lname: response.profileObj.familyName,
                imageurl: response.profileObj.imageUrl,
                email: response.profileObj.email
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }


    }
    const CheckLogout = () => {
        setIsLogin(false)
        console.log("Log out success")
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem>
                <ListItemIcon>
                    <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Beers</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <FavoriteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Favorite Beers</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {
                setIsLogin(false)
                setIsMenuOpen(false)
            }}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                    <GoogleLogout
                        clientId={clientID}
                        buttonText="Logout"
                        onLogoutSuccess={CheckLogout}

                    /></ListItemText>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block' } }}
                        minWidth="fit-content"
                    >
                        Hold My Beers
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'flex' } }}>
                        {isLogin ? (
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        ) : (
                            <GoogleLogin
                                clientId={clientID}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}

                            />
                        )}

                    </Box>


                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}

