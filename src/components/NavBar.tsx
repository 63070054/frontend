import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { AccountCircle, Google } from "@mui/icons-material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import LoadingBackDrop from "./LoadingBackDrop";

interface NavBarProps {
    login: (a: User) => void;
    logout: () => void;
    userInfo: User | null;
}
interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}
interface Beer {
    _id: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    methods: string[];
    imageUrl: string;
    userId: string;
}

interface User {
    googleId: string;
    favorite: Beer[];
    owner: Beer[];
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
}
export default function NavBar({ login, logout, userInfo }: NavBarProps) {
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const clientID =
        "971797688819-5osp62f7rkgko6ul3uvdja8k8q9jg80p.apps.googleusercontent.com";
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleProfileMenuOpen = () => {
        setIsMenuOpen(true);
    };

    const handleProfileMenuClose = () => {
        setIsMenuOpen(false);
    };

    const handleGoogleLoginSuccess = async (response: any) => {
        console.log(response)
        setIsLoading(true);
        const newUser = {
            googleId: response.googleId,
            favorite: [],
            owner: [],
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl,
        };
        await axios.post("http://localhost:8080/user/login", newUser);
        const userInfo = await axios.get(
            "http://localhost:8080/user/" + response.googleId
        );
        login(userInfo.data);
        setIsLoading(false);
    };

    const handleNavigateMenu = (path: string) => {
        navigate(path);
    };

    const handleGoogleLoginFailure = (response: any) => { };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem onClick={() => handleNavigateMenu("/myBeers")}>
                <ListItemIcon>
                    <RecentActorsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Beers</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleNavigateMenu("/favoriteBeers")}>
                <ListItemIcon>
                    <FavoriteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Favorite Beers</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem
                onClick={() => {
                    setIsMenuOpen(false);
                }}
            >
                <GoogleLogout
                    clientId={clientID}
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    render={(renderProps) => (
                        <Button
                            onClick={renderProps.onClick}
                            variant="outlined"
                            startIcon={<Google />}
                            fullWidth
                        >
                            Sign Out
                        </Button>
                    )}
                />
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Link to="/" style={{ textDecoration: "none", color: "#ffa31a" }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: "block" } }}
                                minWidth="fit-content"
                                onClick={() => handleNavigateMenu("/")}

                            >
                                Hold My Beers
                            </Typography>
                        </Link>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "flex" } }}>
                            {userInfo ? (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    style={{ margin: 5 }}
                                >
                                    <Avatar alt="Remy Sharp" src={userInfo.imageUrl} />
                                </IconButton>
                            ) : (
                                <GoogleLogin
                                    clientId={clientID}
                                    buttonText="Sign In With Google"
                                    onSuccess={handleGoogleLoginSuccess}
                                    onFailure={handleGoogleLoginFailure}
                                    cookiePolicy={"single_host_origin"}
                                    isSignedIn={true}
                                    render={(renderProps) => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            variant="outlined"
                                            startIcon={<Google />}
                                        >
                                            Sign In With Google
                                        </Button>
                                    )}
                                />
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </Box>
            <Outlet />
            <LoadingBackDrop isLoading={isLoading} />
        </>
    );
}
