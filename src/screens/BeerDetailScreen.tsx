import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

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

interface IsLoginProp {
  isLogin: boolean;
}

export default function BeerDetailScreen({ isLogin }: IsLoginProp) {
  const [beer, setBeer] = useState<Beer>({
    _id: "63a3597cc6491c394bce0364",
    name: "เบียร์กาว",
    description: "โคตรกาว",
    ingredients: [
      {
        name: "งับ",
        quantity: 10,
        unit: "งับ",
      },
      {
        name: "งับ",
        quantity: 2,
        unit: "งับ",
      },
    ],
    methods: [
      "งับ",
      "Boil the wort with the hops for 60 minutes",
      "Cool the wort and transfer to a fermenter",
    ],
    imageUrl: "งับ",
    userId: "103000190698724848066",
  });
  const deleteBeer = (id: string) => {};
  return (
    <>
      <Container maxWidth="sm" className="p-16">
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ position: "relative" }}>
            <img
              src="https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="
              className="cover-image"
              alt="รูปภาพเบียร์"
            ></img>
            <Typography variant="h3" className="center-offset">
              {beer.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className="p-16">
              <Typography variant="h5">รายละเอียด</Typography>
              <Paper
                className="p-16"
                elevation={4}
                style={{ minHeight: "50px" }}
              >
                <Typography variant="subtitle2">{beer.description}</Typography>
              </Paper>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="p-16">
              <Typography variant="h5">ส่วนผสม</Typography>
              <Stack spacing={1}>
                {beer.ingredients.map((ingredient) => (
                  <Box style={{ display: "flex", width: "100%" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
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
            <Paper className="p-16">
              <Typography variant="h5">ขั้นตอนการทำ</Typography>
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
          {isLogin && (
            <Grid item xs={12}>
              <Paper className="p-16">
                <Box style={{ display: "flex", width: "100%" }}>
                  <Grid item xs={6}>
                    <Link to={`/editBeer/${beer._id}`}>
                      <Button variant="contained" style={{ float: "right" }}>
                        Edit Beer
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      onClick={() => deleteBeer(beer._id)}
                      variant="contained"
                      style={{ float: "right" }}
                    >
                      Delete Beer
                    </Button>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
