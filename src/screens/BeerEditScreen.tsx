import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import CardBeer from '../components/CardBeer';
import IconButton from '@mui/material/IconButton';
import { Delete } from "@mui/icons-material";
import LoadingBackDrop from '../components/LoadingBackDrop';

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

export default function BeerEditScreen({ userInfo, fetchUserInfo }: userInfoProp) {
    const params = useParams()
    const beerId = params.id

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || (userInfo.owner.every(beer => beer._id != beerId))) {
            navigate("/")
        }
        axios.get("http://localhost:8080/beers/" + beerId).then((result: any) => {
            const beer: Beer = result.data;
            setNameBeer(beer.name)
            setDescriptionBeer(beer.description)
            setIngredients([...beer.ingredients])
            setMethods([...beer.methods])
            setImageUrl(beer.imageUrl)
            setUserId(beer.userId)
        }).catch(error => {
            navigate("/")
        })
    }, [])

    const [nameBeer, setNameBeer] = useState<string>("")
    const [descriptionBeer, setDescriptionBeer] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("")
    const [fileImage, setFileImage] = useState<File | null>(null)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [methods, setMethods] = useState<string[]>([])
    const [userId, setUserId] = useState<string>("")
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleClose = () => {
        setOpenSnackBar(false);
    };
    const handleClosesuccess = () => {
        setOpenSnackBarSuccess(false);
        navigate("/beer/" + beerId)
    };

    const handlerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const objectImage = URL.createObjectURL(e.target.files[0])
        setImageUrl(objectImage)
        setFileImage(e.target.files[0])
    }

    const handlerNameBeer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameBeer(e.target.value)
    }

    const handlerDescriptionBeer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionBeer(e.target.value)
    }

    const handlerIngredientChange = (index: number, value: any) => {
        const copyIngredients: Ingredient[] = ingredients
        copyIngredients[index] = { ...copyIngredients[index], ...value }
        setIngredients([...copyIngredients])
    }

    const handlerMethodChange = (index: number, value: string) => {
        const copyMethods: string[] = methods
        copyMethods[index] = value
        setMethods([...copyMethods])
    }

    const addIngredient = () => {
        const newIngredient: Ingredient = {
            name: "",
            quantity: 0,
            unit: ""
        }
        setIngredients([...ingredients, newIngredient])
    }

    const deleteIngredient = (index: number) => {
        const copyIngredients = ingredients;
        copyIngredients.splice(index, 1)
        setIngredients([...copyIngredients])
    }

    const addMethod = () => {
        const newMethod = ''
        setMethods([...methods, newMethod])
    }

    const deleteMethod = (index: number) => {
        const copyMethods = methods;
        copyMethods.splice(index, 1)
        setMethods([...copyMethods])
    }

    const submit = async () => {
        const isIngredientsEmpty = ingredients.some(ingredient => ingredient.name == '' || ingredient.quantity == 0 || ingredient.unit == '');
        const isMethodsEmpty = methods.some(method => method == '');
        if (!nameBeer || !imageUrl || isIngredientsEmpty || isMethodsEmpty || ingredients.length == 0 || methods.length == 0) {
            setOpenSnackBar(true)
        }
        else {

            setIsLoading(true)

            var image = imageUrl

            if (fileImage) {
                const API_KEY = '00002718d0f7d7ea69ee38b7ad9a6f15'
                const headers = {
                    'content-type': 'multipart/form-data'
                }
                const formData = new FormData()
                formData.append('key', API_KEY)
                formData.append('media', fileImage)
                const thumbnail = await axios.post("https://thumbsnap.com/api/upload", formData, {
                    headers
                })
                setImageUrl(thumbnail.data.data.thumb)
                image = thumbnail.data.data.thumb
            }
            console.log({
                _id: params.id,
                name: nameBeer,
                description: descriptionBeer,
                ingredients: ingredients,
                methods: methods,
                imageUrl: image,
                userId: userInfo?.googleId
            })
            axios.put(`http://localhost:8080/beers`, {
                _id: params.id,
                name: nameBeer,
                description: descriptionBeer,
                ingredients: ingredients,
                methods: methods,
                imageUrl: image,
                userId: userInfo?.googleId
            }).then(function (response) {
                setOpenSnackBarSuccess(true)
                fetchUserInfo()
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            });

        }
    }

    let isLogin = false;
    if (userInfo) {
        isLogin = true;
    }

    return (
        <>
            <Container maxWidth="sm" className="p-16">
                <Grid container>
                    <Grid item xs={7} className="p-16">
                        <Stack spacing={2}>
                            <Typography variant='h3' style={{ color: "#e3a13e" }}>
                                Edit Beer
                            </Typography>
                            <Button variant="contained" component="label">
                                ?????????????????????????????????????????????????????????
                                <input hidden accept="image/*" onChange={(e) => handlerFileUpload(e)} type="file" />
                            </Button>
                            <TextField
                                multiline
                                minRows={1}
                                label="??????????????????????????????"
                                value={nameBeer}
                                onChange={handlerNameBeer}
                                required
                            />
                            <TextField
                                multiline
                                minRows={2}
                                label="????????????????????????????????????????????????"
                                value={descriptionBeer}
                                onChange={handlerDescriptionBeer}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={5} className="p-16">
                        <CardBeer _id={"0"} userId={"0"} name={nameBeer} description={descriptionBeer} imageUrl={imageUrl} isLogin={isLogin} userInfo={null} />
                    </Grid>
                    <Grid item xs={12} className="p-16">
                        <Stack spacing={2}>
                            <Typography variant='h6'>
                                ????????????????????????
                                <Button onClick={addIngredient} className="ml-16">
                                    ???????????????????????????????????????
                                </Button>
                            </Typography>
                            <Grid container spacing={1} className="width-100">
                                <Grid item xs={6} className="pt-0">
                                    <Paper className="p-16 ta-center" elevation={4}>
                                        ????????????
                                    </Paper>
                                </Grid>
                                <Grid item xs={2} className="pt-0">
                                    <Paper className="p-16 ta-center" elevation={4}>
                                        ??????????????????
                                    </Paper>
                                </Grid>
                                <Grid item xs={2} className="pt-0">
                                    <Paper className="p-16 ta-center" elevation={4}>
                                        ???????????????
                                    </Paper>
                                </Grid>
                                <Grid item xs={2} className="pt-0">
                                    <Paper className="p-16 ta-center" elevation={4}>
                                        Action
                                    </Paper>
                                </Grid>
                            </Grid>
                            {ingredients.map((ingredient, index) => (
                                <Grid container spacing={1} className="width-100 m-0" key={index} alignItems="center">
                                    <Grid item xs={6}>
                                        <TextField
                                            multiline
                                            minRows={1}
                                            value={ingredient.name}
                                            onChange={(e) => handlerIngredientChange(index, { name: e.target.value })}
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            value={ingredient.quantity}
                                            onChange={(e) => handlerIngredientChange(index, { quantity: Number(e.target.value) })}
                                            type="number"
                                            size="small"
                                            fullWidth

                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            multiline
                                            minRows={1}
                                            value={ingredient.unit}
                                            onChange={(e) => handlerIngredientChange(index, { unit: e.target.value })}
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={2} display="flex" justifyContent="center">
                                        <IconButton aria-label="delete" size="large" onClick={() => deleteIngredient(index)}>
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                            <Typography variant='h6'>
                                ??????????????????
                                <Button onClick={addMethod} className="ml-16">
                                    ???????????????????????????????????????????????????
                                </Button>
                            </Typography>
                            {methods.map((method, index) => (
                                <Grid container spacing={1} className="width-100 m-0" key={index} alignItems="center">
                                    <Grid item xs={10} className="pl-0">
                                        <TextField
                                            key={index}
                                            multiline
                                            minRows={1}
                                            value={method}
                                            onChange={(e) => handlerMethodChange(index, e.target.value)}
                                            size="small"
                                            fullWidth
                                            className="m-0 mt-8"
                                        />
                                    </Grid>
                                    <Grid item xs={2} display="flex" justifyContent="center">
                                        <IconButton aria-label="delete" size="large" onClick={() => deleteMethod(index)}>
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}

                            <Button variant="contained" onClick={submit} color="success">
                                ????????????????????????????????????????????????????????????
                            </Button>
                            <Snackbar

                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                open={openSnackBar}
                                onClose={handleClose}

                            >
                                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                                    ???????????????????????????????????????????????????????????????????????????
                                </Alert>
                            </Snackbar>

                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                open={openSnackBarSuccess}
                                onClose={handleClosesuccess}
                            >
                                <Alert onClose={handleClosesuccess} severity="success" sx={{ width: '100%' }}>
                                    ???????????????????????????????????????????????????????????????
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <LoadingBackDrop isLoading={isLoading} />
        </>
    )

}