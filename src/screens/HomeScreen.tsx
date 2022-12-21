import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid"
import SelectFilterIngredients from "../components/SelectFilterIngredients";
import SearchBeers from "../components/SearchBeers";
import Button from "@mui/material/Button";
import CardBeer from "../components/CardBeer";
import { useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { Link } from "react-router-dom";

interface Beer {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    imageUrl: string;
}

interface userInfoProp {
    userInfo: boolean;
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

    let filterBeers = beers.filter(beer => beer.name.includes(queryBeer) || beer.description.includes(queryBeer))

    if (selectedIngredients.length > 0) {
        filterBeers = beers.filter(beer => {
            return selectedIngredients.some(selectedIngredient => beer.ingredients.some(beerIngredient => beerIngredient.includes(selectedIngredient)))
        })
    }

    const handlerSearchBeer = (text: string) => {
        setQueryBeer(text)
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
                            <CardBeer id={beer.id} name={beer.name} description={beer.description} imageUrl={beer.imageUrl} userInfo={userInfo} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}