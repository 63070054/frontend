import "./assets/style.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BeerDetailScreen from "./screens/BeerDetailScreen";
import BeerCreateScreen from "./screens/BeerCreateScreen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import NavBar from "./components/NavBar";
import { useState } from "react";
import MyBeerScreen from "./screens/MyBeerScreen";
import FavoriteBeerScreen from "./screens/FavoriteBeerScreen";
import BeerEditScreen from './screens/BeerEditScreen';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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

function App() {

  const clientID = "971797688819-5osp62f7rkgko6ul3uvdja8k8q9jg80p.apps.googleusercontent.com";

  const [userInfo, setuserInfo] = useState<User | null>(null);

  const login = (userInfo: User) => {
    setuserInfo({ ...userInfo });
  }

  const logout = () => {
    setuserInfo(null);
    window.location.replace("http://localhost:3000")

  }

  const fetchUserInfo = () => {
    if (userInfo) {
      axios.get("http://localhost:8080/user/" + userInfo?.googleId).then(result => {
        setuserInfo({ ...result.data })
      })
    }
  }

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientID: clientID,
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar login={login} logout={logout} userInfo={userInfo} />,
      children: [
        {
          path: "/",
          element: <HomeScreen userInfo={userInfo} fetchUserInfo={fetchUserInfo} />,
        },
        {
          path: "/createBeer",
          element: <BeerCreateScreen userInfo={userInfo} fetchUserInfo={fetchUserInfo} />,
        },
        {
          path: "/beer/:id",
          element: <BeerDetailScreen userInfo={userInfo} fetchUserInfo={fetchUserInfo} />,
        },
        {
          path: "/favoriteBeers",
          element: <FavoriteBeerScreen userInfo={userInfo} fetchUserInfo={fetchUserInfo} />,
        },
        {
          path: "/myBeers",
          element: <MyBeerScreen userInfo={userInfo} fetchUserInfo={fetchUserInfo} />,
        },
        {
          path: "/editBeer/:id",
          element: <BeerEditScreen userInfo={userInfo} fetchUserInfo={fetchUserInfo} />,
        }
      ],
    },
  ]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: "Prompt, sans-serif"
    }
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
