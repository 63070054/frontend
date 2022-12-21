import Container from "@mui/system/Container"
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid"
import CardBeer from "../components/CardBeer";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router";

interface userInfoProp {
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



export default function FavoriteBeerScreen({ userInfo }: userInfoProp) {

    const navigate = useNavigate()


    const [beers, setBeers] = useState<Beer[]>([]);


    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }
    }, [])

    let isLogin = false;
    if (userInfo) {
        isLogin = true;
    }


    return (
        <>
            {beers && (
                <Container maxWidth="sm" className="p-16">
                    <Typography variant="h3">My Favorite Beers</Typography>
                    <Grid container spacing={2} className="pt-16">
                        {beers.map((beer, index) => (
                            <Grid item xs={4} key={index}>
                                <CardBeer id={beer._id} name={beer.name} description={beer.description} imageUrl={beer.imageUrl} isLogin={isLogin} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}
        </>
    )
}