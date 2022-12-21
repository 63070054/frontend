import './assets/style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import BeerDetailScreen from './screens/BeerDetailScreen';
import BeerCreateScreen from './screens/BeerCreateScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react'
import { gapi } from 'gapi-script';
import NavBar from './components/NavBar';
import { useState } from 'react';
import MyBeerScreen from './screens/MyBeerScreen';
import FavoriteBeerScreen from './screens/FavoriteBeerScreen';
import BeerEditScreen from './screens/BeerEditScreen';
function App() {

  const clientID = "971797688819-5osp62f7rkgko6ul3uvdja8k8q9jg80p.apps.googleusercontent.com";

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = () => {
    setIsLogin(true);
  }

  const logout = () => {
    setIsLogin(false);
  }

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientID: clientID,
        scope: ""
      })
    };
    gapi.load("client:auth2", start)

  }, [])


  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <NavBar login={login} logout={logout} isLogin={isLogin} />,
        children: [
          {
            path: "/",
            element: <HomeScreen isLogin={isLogin} />,
          },
          {
            path: "/createBeer",
            element: <BeerCreateScreen isLogin={isLogin} />,
          },
          {
            path: "/beer/:id",
            element: <BeerDetailScreen isLogin={isLogin} />,
          },
          {
            path: "/favoriteBeers",
            element: <FavoriteBeerScreen isLogin={isLogin} />,
          },
          {
            path: "/myBeers",
            element: <MyBeerScreen isLogin={isLogin} />,
          },
          {
            path: "/editBeer/:id",
            element: <BeerEditScreen isLogin={isLogin} />,
          }
        ]
      },
    ]
  )

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
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
