import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { gapi } from 'gapi-script';
import { useParams, useNavigate } from 'react-router-dom';
import ImageIngredient from '../components/ImageIngredient';
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

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

export default function BeerDetailScreen({ userInfo, fetchUserInfo }: userInfoProp) {

    const params = useParams()
    const beerId = params.id
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const navigate = useNavigate()
    const handleClose = () => {
        setOpenSnackBar(false);
        navigate("/")
    };
    const [beer, setBeer] = useState<Beer | null>(null);
    const deleteBeer = (beerId: string) => {
        if (userInfo) {
            axios.delete("http://localhost:8080/beers", {
                data: {
                    "beerId": beerId,
                    "userId": userInfo.googleId
                }
            }).then(result => {
                setOpenSnackBar(true)
                fetchUserInfo()

            })

        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/beers/" + beerId).then((result: any) => {
            setBeer({ ...result.data })
        }).catch(err => {
            navigate("/")
        })

    }, [])

    return (
        <>
            {beer && (
                <Container maxWidth="sm" className="p-16">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h3" style={{ color: "#e3a13e" }}>
                                {beer.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <img src={beer.imageUrl} className='cover-image' alt="รูปภาพเบียร์"></img>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className="p-16" elevation={2}>
                                <Typography variant="h5">
                                    รายละเอียด
                                </Typography>
                                <Paper className="p-16" elevation={4} style={{ minHeight: "50px" }}>
                                    <Typography variant="subtitle2">
                                        {beer.description}
                                    </Typography>
                                </Paper>

                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className="p-16" elevation={2}>
                                <Typography variant="h5">
                                    ส่วนผสม
                                </Typography>
                                <Stack spacing={1}>
                                    {beer.ingredients.map(ingredient => (
                                        <Box style={{ display: 'flex', width: '100%' }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={2}>
                                                    <Paper className="p-8" elevation={4} style={{ alignItems: "center", display: "flex" }}>
                                                        <ImageIngredient name={ingredient.name} />
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper className="p-16" elevation={4}>
                                                        <Typography variant="subtitle2">
                                                            {ingredient.name}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Paper className="p-16 ta-center" elevation={4}>
                                                        <Typography variant="subtitle2">
                                                            {ingredient.quantity}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Paper className="p-16 ta-center" elevation={4}>
                                                        <Typography variant="subtitle2">
                                                            {ingredient.unit}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className="p-16" elevation={2}>
                                <Typography variant="h5">
                                    ขั้นตอนการทำ
                                </Typography>
                                <Stack spacing={1}>
                                    {beer.methods.map((method, index) => (
                                        <Paper className="p-16" elevation={4}>
                                            <Typography variant="subtitle2">
                                                {index + 1}. {method}
                                            </Typography>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>
                        {
                            (userInfo && userInfo.owner.some(beer => beer._id == beerId)) && (
                                <Grid item xs={12}>
                                    <Paper className="p-16" elevation={2}>
                                        <Box style={{ display: 'flex', width: '100%' }}>
                                            <Grid item xs={6}>
                                                <Link to={`/editBeer/${beer._id}`}>
                                                    <Button variant="contained" style={{ float: "right", marginRight: 10 }}>Edit Beer</Button>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button onClick={() => deleteBeer(beer._id)} variant="contained" style={{ float: "right", backgroundColor: "rgb(255 101 132)" }}>Delete Beer</Button>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Grid>
                            )
                        }


                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={openSnackBar}
                        onClose={handleClose}

                    >
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            ลบเบียร์สำเร็จแล้ว
                        </Alert>
                    </Snackbar>
                </Container>
            )
            }
        </>
    )
}
