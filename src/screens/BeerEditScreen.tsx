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

import CardBeer from '../components/CardBeer';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}
interface Beer {
    id: number;
    name: string;
    description: string;
    ingredients: Ingredient[];
    methods: string[];
    imageUrl: string;
}

interface IsLoginProp {
    isLogin: boolean;
}

export default function BeerEditScreen({ isLogin }: IsLoginProp) {
    const params = useParams()
    const [beer, setBeer] = useState<Beer>({
        id: 4,
        name: "เบียร์แมว",
        description: "เบียร์ที่ทำจากแมวช็อคโกแลต",
        ingredients: [{
            name: "ช็อคโกแลต",
            quantity: 3,
            unit: "แท่ง"
        }, {
            name: "หม้อ",
            quantity: 1,
            unit: "อัน"
        }],
        methods: ['เอาช็อคโกแลตไปไก่', 'เอาไก่ไปต้ม', 'พร้อมรับประทาน'],
        imageUrl: "https://img.redbull.com/images/c_fill,w_1200,h_630,g_auto,f_auto,q_auto/redbullcom/2016/09/20/1331818966444_2/pok%C3%A9mon-super-mystery-dungeon"
    });

    const navigate = useNavigate();

    const [nameBeer, setNameBeer] = useState<string>(beer.name)
    const [descriptionBeer, setDescriptionBeer] = useState<string>(beer.description)
    const [imageUrl, setImageUrl] = useState<string>(beer.imageUrl)
    const [fileImage, setFileImage] = useState<File | null>(null)
    const [ingredients, setIngredients] = useState<Ingredient[]>(beer.ingredients)
    const [methods, setMethods] = useState<string[]>(beer.methods)
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false);

    if (!isLogin) navigate("/")


    const handleClose = () => {
        setOpenSnackBar(false);
    };
    const handleClosesuccess = () => {
        setOpenSnackBarSuccess(false);
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

    const addMethod = () => {
        const newMethod = ''
        setMethods([...methods, newMethod])
    }

    const submit = () => {
        const isIngredientsEmpty = ingredients.some(ingredient => ingredient.name == '' || ingredient.quantity == 0 || ingredient.unit == '');
        const isMethodsEmpty = methods.some(method => method == '');
        if (!nameBeer || !imageUrl || isIngredientsEmpty || isMethodsEmpty || !fileImage || ingredients.length == 0 || methods.length == 0) {
            setOpenSnackBar(true)
        }
        else {
            setOpenSnackBarSuccess(true)

            const API_KEY = '00002718d0f7d7ea69ee38b7ad9a6f15'
            const headers = {
                'content-type': 'multipart/form-data'
            }
            const formData = new FormData()
            formData.append('key', API_KEY)
            formData.append('media', fileImage)
            try {
                axios.post("https://thumbsnap.com/api/upload", formData, {
                    headers
                }).then(result => {
                    console.log("image", result.data.data.thumb)
                    axios.put(`http://localhost:8080/beers/${params.id}`, {
                        name: nameBeer,
                        description: descriptionBeer,
                        ingredients: ingredients,
                        methods: methods,
                        imageUrl: result.data.data.thumb
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })

            } catch (e) {
                console.log(e)
            }
        }
    }


    return (
        <>
            <Container maxWidth="sm" className="p-16">
                <Grid container>
                    <Grid item xs={7} className="p-16">
                        <Stack spacing={2}>
                            <Typography variant='h3'>
                                Edit Beer
                            </Typography>
                            <Button variant="contained" component="label">
                                อัพโหลดรูปภาพเบียร์
                                <input hidden accept="image/*" onChange={(e) => handlerFileUpload(e)} type="file" />
                            </Button>
                            <TextField
                                multiline
                                minRows={1}
                                label="ชื่อเบียร์"
                                value={nameBeer}
                                onChange={handlerNameBeer}
                                required
                            />
                            <TextField
                                multiline
                                minRows={2}
                                label="รายละเอียดเบียร์"
                                value={descriptionBeer}
                                onChange={handlerDescriptionBeer}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={5} className="p-16">
                        <CardBeer id={0} name={nameBeer} description={descriptionBeer} imageUrl={imageUrl} isLogin={isLogin} />
                    </Grid>
                    <Grid item xs={12} className="p-16">
                        <Stack spacing={2}>
                            <Typography variant='h6'>
                                วัตถุดิบ
                                <Button onClick={addIngredient} className="ml-16">
                                    เพิ่มวัตถุดิบ
                                </Button>
                            </Typography>
                            <Grid container spacing={1} className="width-100">
                                <Grid item xs={6} className="pl-0 pt-0">
                                    <Paper className="p-16 ta-center" elevation={4}>
                                        ชื่อ
                                    </Paper>
                                </Grid>
                                <Grid item xs={3} className="pt-0">
                                    <Paper className="p-16 ta-center" elevation={4}>
                                        ปริมาณ
                                    </Paper>
                                </Grid>
                                <Grid item xs={3} className="pt-0">
                                    <Paper className="p-16 ta-center" elevation={4}>
                                        หน่วย
                                    </Paper>
                                </Grid>
                            </Grid>
                            {ingredients.map((ingredient, index) => (
                                <Grid container spacing={1} className="width-100 m-0" key={index}>
                                    <Grid item xs={6} className="pl-0">
                                        <TextField
                                            multiline
                                            minRows={1}
                                            value={ingredient.name}
                                            onChange={(e) => handlerIngredientChange(index, { name: e.target.value })}
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            multiline
                                            minRows={1}
                                            value={ingredient.quantity}
                                            onChange={(e) => handlerIngredientChange(index, { quantity: Number(e.target.value) })}
                                            size="small"
                                            fullWidth

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            multiline
                                            minRows={1}
                                            value={ingredient.unit}
                                            onChange={(e) => handlerIngredientChange(index, { unit: e.target.value })}
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            ))}
                            <Typography variant='h6'>
                                วิธีทำ
                                <Button onClick={addMethod} className="ml-16">
                                    เพิ่มขั้นตอนการทำ
                                </Button>
                            </Typography>
                            {methods.map((method, index) => (
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
                            ))}

                            <Button variant="contained" onClick={submit} color="success">
                                ยืนยันการแก้ไขสูตรเบียร์
                            </Button>
                            <Snackbar

                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                open={openSnackBar}
                                onClose={handleClose}

                            >
                                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                                    กรุณากรอกข้อมูลให้ครบถ้วน
                                </Alert>
                            </Snackbar>

                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                open={openSnackBarSuccess}
                                onClose={handleClosesuccess}
                            >
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    แก้ไขสูตรเบียร์สำเร็จ
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    )

}