import './assets/style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import BeerDetailScreen from './screens/BeerDetailScreen';
import BeerCreateScreen from './screens/BeerCreateScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react'
import { gapi } from 'gapi-script';
import NavBar from './components/NavBar';
import { Router } from 'react-router-dom';
import amqp from "amqplib"
import { useState } from 'react';
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
        element: <HomeScreen />,
      },
      {
        path: "/createBeer",
        element: <BeerCreateScreen />,
      },
      {
        path: "/beer/:id",
        element: <BeerDetailScreen />,
      }
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
        <NavBar login={login} logout={logout} isLogin={isLogin} />
        {/* <RouterProvider router={router} isLogin={isLogin} /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
