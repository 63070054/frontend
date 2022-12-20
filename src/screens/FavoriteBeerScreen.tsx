import Container from "@mui/system/Container"
import { useState } from "react";
import Grid from "@mui/material/Grid"
import CardBeer from "../components/CardBeer";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router";

interface IsLoginProp {
    isLogin: boolean;
}

interface Beer {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    imageUrl: string;
}



export default function FavoriteBeerScreen({ isLogin }: IsLoginProp) {

    const navigate = useNavigate()


    const [beers, setBeers] = useState<Beer[]>([{
        id: 1,
        name: "เบียร์กาว",
        description: "โคตรกาว",
        ingredients: ['กาว'],
        imageUrl: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    }, {
        id: 2,
        name: "เบียร์ไก่",
        description: "เบียร์ไก่",
        ingredients: ['ไก่'],
        imageUrl: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    }, {
        id: 3,
        name: "เบียร์กาว",
        description: "โคตรกาว",
        ingredients: ['กาว'],
        imageUrl: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    }, {
        id: 4,
        name: "เบียร์ไก่",
        description: "เบียร์ไก่",
        ingredients: ['ไก่'],
        imageUrl: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    },
    {
        id: 5,
        name: "เบียร์กาว",
        description: "โคตรกาว",
        ingredients: ['กาว'],
        imageUrl: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    }, {
        id: 6,
        name: "เบียร์ไก่เป็ด",
        description: "เบียร์ไก่",
        ingredients: ['ไก่', "เป็ด"],
        imageUrl: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    },]);


    if (!isLogin) navigate("/")


    return (
        <Container maxWidth="sm" className="p-16">
            <Typography variant="h3">My Favorite Beers</Typography>
            <Grid container spacing={2} className="pt-16">
                {beers.map((beer, index) => (
                    <Grid item xs={4} key={index}>
                        <CardBeer id={beer.id} name={beer.name} description={beer.description} imageUrl={beer.imageUrl} isLogin={isLogin} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}