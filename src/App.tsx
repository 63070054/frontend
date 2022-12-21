import "./assets/style.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
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
// import BeerEditScreen from './screens/BeerEditScreen';
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
    setuserInfo(userInfo);
  }

  const logout = () => {
    setuserInfo(null);
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
          element: <HomeScreen userInfo={userInfo} />,
        },
        {
          path: "/createBeer",
          element: <BeerCreateScreen userInfo={userInfo} />,
        },
        {
          path: "/beer/:id",
          element: <BeerDetailScreen userInfo={userInfo} />,
        },
        {
          path: "/favoriteBeers",
          element: <FavoriteBeerScreen userInfo={userInfo} />,
        },
        {
          path: "/myBeers",
          element: <MyBeerScreen userInfo={userInfo} />,
        },
        // {
        //   path: "/editBeer/:id",
        //   element: <BeerEditScreen userInfo={userInfo} />,
        // }
      ],
    },
  ]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
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
