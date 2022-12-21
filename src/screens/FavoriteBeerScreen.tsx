import Container from "@mui/system/Container";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import CardBeer from "../components/CardBeer";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

interface IsLoginProp {
  isLogin: boolean;
}

interface Beer {
  _id: string;
  name: string;
  description: string;
  ingredients: object;
  methods: string[];
  imageUrl: string;
  userId: string;
}

export default function FavoriteBeerScreen({ isLogin }: IsLoginProp) {
  const navigate = useNavigate();

  const [beers, setBeers] = useState<Beer[]>([
    {
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
    },
  ]);

  if (!isLogin) navigate("/");
  return (
    <Container maxWidth="sm" className="p-16">
      <Typography variant="h3">My Favorite Beers</Typography>
      <Grid container spacing={2} className="pt-16">
        {beers.map((beer, index) => (
          <Grid item xs={4} key={index}>
            <CardBeer
              _id={beer._id}
              name={beer.name}
              description={beer.description}
              imageUrl={beer.imageUrl}
              userId={beer.userId}
              isLogin={isLogin}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
