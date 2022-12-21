import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import axios from "axios";

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
}

interface IsLoginProp {
  isLogin: boolean;
}

export default function BeerDetailScreen({ isLogin }: IsLoginProp) {
  const [beer, setBeer] = useState<Beer>({
    id: 4,
    name: "เบียร์แมว",
    description: "เบียร์ที่ทำจากแมวช็อคโกแลต",
    ingredients: [
      {
        name: "ช็อคโกแลต",
        quantity: 3,
        unit: "แท่ง",
      },
      {
        name: "หม้อ",
        quantity: 1,
        unit: "อัน",
      },
    ],
    methods: ["เอาช็อคโกแลตไปไก่", "เอาไก่ไปต้ม", "พร้อมรับประทาน"],
  });
//   useEffect(() => {
//     async function fetchBeers() {
//       try {
//         axios.get("http://localhost:8080/beers/").then((response) => {
//           setBeer(response.data);
//           console.log(
//             "🚀 ~ file: HomeScreen.tsx:46 ~ axios.get ~ response",
//             response
//           );
//         });
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     fetchBeers();
//   }, []);

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
        </Grid>
      </Container>
    </>
  );
}
