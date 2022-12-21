import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid"
import SelectFilterIngredients from "../components/SelectFilterIngredients";
import SearchBeers from "../components/SearchBeers";
import Button from "@mui/material/Button";
import CardBeer from "../components/CardBeer";
import { useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { Link } from "react-router-dom";

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

interface userInfoProp {
    userInfo: User | null;
}

export default function HomeScreen({ userInfo }: userInfoProp) {



    const [queryBeer, setQueryBeer] = useState<string>('')
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    const handleSelectIngredientsChange = (event: SelectChangeEvent<typeof selectedIngredients>) => {
        const {
            target: { value },
        } = event;
        setSelectedIngredients(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [beers, setBeers] = useState<Beer[]>([]);

    let filterBeers = beers.filter(beer => beer.name.includes(queryBeer) || beer.description.includes(queryBeer))

    if (selectedIngredients.length > 0) {
        filterBeers = beers.filter(beer => {
            return selectedIngredients.some(selectedIngredient => beer.ingredients.some(beerIngredient => beerIngredient.name.includes(selectedIngredient)))
        })
    }

    const handlerSearchBeer = (text: string) => {
        setQueryBeer(text)
    }

    let isLogin = false;
    if (userInfo) {
        isLogin = true;
    }

    return (
        <>
            <Container maxWidth="sm" className="p-16">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SearchBeers queryBeer={queryBeer} handlerSearchBeer={handlerSearchBeer} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectFilterIngredients selectedIngredients={selectedIngredients} handleSelectIngredientsChange={handleSelectIngredientsChange} />
                    </Grid>
                    {userInfo && (
                        <Grid item xs={12}>
                            <Link to="/createBeer">
                                <Button variant="contained" style={{ float: "right" }}>Create Beer</Button>
                            </Link>
                        </Grid>
                    )}
                </Grid>
            </Container>
            <Container maxWidth="sm" className="p-n-t-16 p-0">
                <Grid container spacing={2}>
                    {filterBeers.map((beer, index) => (
                        <Grid item xs={4} key={index}>
                            <CardBeer id={beer._id} name={beer.name} description={beer.description} imageUrl={beer.imageUrl} isLogin={isLogin} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}