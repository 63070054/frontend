import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SelectFilterIngredients from "../components/SelectFilterIngredients";
import SearchBeers from "../components/SearchBeers";
import Button from "@mui/material/Button";
import CardBeer from "../components/CardBeer";
import { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBackDrop from './../components/LoadingBackDrop';

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
    fetchUserInfo: () => void;
}

export default function HomeScreen({ userInfo, fetchUserInfo }: userInfoProp) {

    const [queryBeer, setQueryBeer] = useState<string>('')
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [beers, setBeers] = useState<Beer[]>([])
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSelectIngredientsChange = (event: SelectChangeEvent<typeof selectedIngredients>) => {
        const {
            target: { value },
        } = event;
        setSelectedIngredients(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        async function fetchBeers() {
            setIsLoading(true)
            const ingredients: string[] = [];
            axios.get("http://localhost:8080/beers").then((response) => {
                const beers = response.data
                beers.sort((a: Beer, b: Beer) => a.name.localeCompare(b.name))
                setBeers([...beers]);
                response.data.map((beer: Beer) => {
                    beer.ingredients.map(ingredient => {
                        if (!ingredients.includes(ingredient.name)) {
                            ingredients.push(ingredient.name);
                        }
                    })
                })
                ingredients.sort((a, b) => a.localeCompare(b))
                setIngredients([...ingredients])
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false)
            });

        }
        fetchBeers();
    }, []);

    const handlerSearchBeer = (text: string) => {
        setQueryBeer(text);
    };

    let filterBeers = beers.filter((beer) => beer.name.includes(queryBeer));

    if (selectedIngredients.length > 0) {
        filterBeers = beers.filter((beer) => {
            return selectedIngredients.some((selectedIngredient) =>
                beer.ingredients.some((beerIngredient) =>
                    beerIngredient.name.includes(selectedIngredient)
                )
            );
        });
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
                        <SearchBeers
                            queryBeer={queryBeer}
                            handlerSearchBeer={handlerSearchBeer}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectFilterIngredients
                            selectedIngredients={selectedIngredients}
                            handleSelectIngredientsChange={handleSelectIngredientsChange}
                            ingredients={ingredients}
                        />
                    </Grid>
                    {isLogin && (
                        <Grid item xs={12}>
                            <Link to="/createBeer">
                                <Button variant="contained" style={{ float: "right" }}>
                                    Create Beer
                                </Button>
                            </Link>
                        </Grid>
                    )}
                </Grid>
            </Container>
            <Container maxWidth="sm" className="p-n-t-16 p-0">
                <Grid container spacing={2}>
                    {filterBeers.map((beer, index) => (
                        <Grid item xs={6} sm={4} key={index}>
                            <CardBeer
                                _id={beer._id}
                                name={beer.name}
                                description={beer.description}
                                imageUrl={beer.imageUrl}
                                userId={beer.userId}
                                isLogin={isLogin}
                                userInfo={userInfo}
                                fetchUserInfo={fetchUserInfo}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <LoadingBackDrop isLoading={isLoading} />
        </>
    );
}
