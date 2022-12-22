import Container from "@mui/system/Container"
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid"
import CardBeer from "../components/CardBeer";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";

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

export default function MyBeerScreen({ userInfo, fetchUserInfo }: userInfoProp) {

    const navigate = useNavigate()


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
        beers = userInfo.owner
        beers.sort((a: Beer, b: Beer) => a.name.localeCompare(b.name))
    }


    return (
        <>
            {beers && (
                <Container maxWidth="sm" className="p-16">
                    <Box display="flex" alignItems="center">
                        <Typography variant="h3">My Beers</Typography>
                        <Link to="/createBeer" style={{ marginLeft: 10, textDecoration: 'none' }}>
                            <Button variant="contained">
                                Create Beer
                            </Button>
                        </Link>
                    </Box>

                    <Grid container spacing={2} className="pt-16">
                        {beers.map((beer, index) => (
                            <Grid item xs={4} key={index}>
                                <CardBeer _id={beer._id} userId={beer.userId} name={beer.name} description={beer.description} imageUrl={beer.imageUrl} isLogin={isLogin} userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}
        </>
    )
}
