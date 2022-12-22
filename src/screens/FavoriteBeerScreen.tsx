import Container from "@mui/system/Container"
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid"
import CardBeer from "../components/CardBeer";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import axios from "axios";
import { gapi } from "gapi-script";

interface userInfoProp {
    userInfo: User | null;
    fetchUserInfo: () => void;
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

interface User {
    googleId: string;
    favorite: Beer[];
    owner: Beer[];
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
}

export default function FavoriteBeerScreen({ userInfo, fetchUserInfo }: userInfoProp) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (isLogin) {
            const auth2 = gapi.auth2.getAuthInstance();
            const googleId = auth2.currentUser.get().googleId;
            axios.get(`http://localhost:8080/user/${googleId}`).then((response) => {
                setUser(response.data);
            });

        }
    }, []);

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }
    }, [])

    let isLogin = false;
    if (userInfo) {
        isLogin = true;
    }

    let beers = null;

    if (userInfo) {
        beers = userInfo.favorite
        beers.sort((a: Beer, b: Beer) => a.name.localeCompare(b.name))
    }


    return (
        <>
            {beers && (
                <Container maxWidth="sm" className="p-16">
                    <Typography variant="h3" style={{ color: "#e3a13e" }}>My Favorite Beers</Typography>
                    <Grid container spacing={2} className="pt-16">
                        {beers.map((beer, index) => (
                            <Grid item xs={6} sm={4} key={index}>
                                <CardBeer _id={beer._id} userId={beer.userId} name={beer.name} description={beer.description} imageUrl={beer.imageUrl} isLogin={isLogin} userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}
        </>
    )
}
