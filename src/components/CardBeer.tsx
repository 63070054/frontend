import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { gapi } from 'gapi-script';
import { useState, useEffect } from 'react';

interface BeerProps {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    userId: string;
    isLogin: boolean;
    userInfo: User | null;
    fetchUserInfo?: () => void;
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

export default function CardBeer({ _id, name, description, imageUrl, isLogin, userInfo, fetchUserInfo }: BeerProps) {

    const MAX_LENGTH_DESCRIPTION = 30

    if (description.length > MAX_LENGTH_DESCRIPTION) {
        description = description.slice(0, MAX_LENGTH_DESCRIPTION) + "...";
    }

    const addToFavoriteBeer = (beerId: string) => {
        if (userInfo && fetchUserInfo) {
            const auth2 = gapi.auth2.getAuthInstance();
            const userId = auth2.currentUser.get().googleId
            axios.post('http://localhost:8080/favorite/add', {
                beerId: beerId,
                userId: userId
            })
                .then(function (response) {
                    fetchUserInfo()
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    const removeToFavoriteBeer = (beerId: string) => {
        if (userInfo && fetchUserInfo) {
            const auth2 = gapi.auth2.getAuthInstance();
            const userId = auth2.currentUser.get().googleId
            axios.delete('http://localhost:8080/favorite/remove', {
                data: {
                    beerId: beerId,
                    userId: userId
                }
            })
                .then(function (response) {
                    fetchUserInfo();
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    const renderIconFavorite = () => {

        if (!userInfo || (userInfo.favorite.every(beer => beer._id != _id))) {
            return (
                <IconButton aria-label="add to favorites" onClick={() => addToFavoriteBeer(_id)}>
                    <FavoriteIcon />
                </IconButton>
            )
        }

        return (
            <IconButton aria-label="remove to favorites" style={{ color: "	rgb(240,128,128)" }} onClick={() => removeToFavoriteBeer(_id)}>
                <FavoriteIcon />
            </IconButton>
        )

    }

    return (
        <Card sx={{ maxWidth: 345 }} className="center-y" >
            <CardMedia
                component="img"
                height="140"
                image={imageUrl ? imageUrl : "https://semantic-ui.com/images/wireframe/image.png"}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" className='word-wrap'>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className='word-wrap'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions >
                {(isLogin) && (
                    renderIconFavorite()
                )}
                {_id !== "0" ? (
                    <Link style={{ textDecoration: 'none' }} to={`/beer/${_id}`}>
                        <Button size="small">อ่านเพิ่มเติม</Button>
                    </Link>
                ) : (
                    <Button size="small">อ่านเพิ่มเติม</Button>
                )
                }

            </CardActions >
        </Card >
    );
}