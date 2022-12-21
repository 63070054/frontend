import Container from "@mui/system/Container";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CardBeer from "../components/CardBeer";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import axios from "axios";
import { gapi } from "gapi-script";

interface IsLoginProp {
  isLogin: boolean;
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

export default function FavoriteBeerScreen({ isLogin }: IsLoginProp) {
  const navigate = useNavigate();
  const [idUser, serIdUser] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isLogin) {
      const auth2 = gapi.auth2.getAuthInstance();
      const googleId = auth2.currentUser.get().googleId;
      try {
        axios.get(`http://localhost:8080/user/${googleId}`).then((response) => {
          setUser(response.data);
          console.log(
            "🚀 ~ file: FavoriteBeerScreen.tsx:62 ~ axios.get ~ googleId",
            googleId
          );
          console.log(
            "🚀 ~ file: FavoriteBeerScreen.tsx:46 ~ axios.get ~ response",
            response
          );
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  if (!isLogin) navigate("/");

  return (
    <Container maxWidth="sm" className="p-16">
      <Typography variant="h3">My Favorite Beers</Typography>
      <Grid container spacing={2} className="pt-16">
        {user?.favorite &&
          user.favorite.map((beer, index) => (
            <Grid item xs={4} key={index}>
              <CardBeer
                _id={beer._id}
                name={beer.name}
                description={beer.description}
                imageUrl={beer.imageUrl}
                isLogin={isLogin}
                userId={beer.userId}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
