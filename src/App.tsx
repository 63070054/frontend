import './assets/style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import BeerDetailScreen from './screens/BeerDetailScreen';
import BeerCreateScreen from './screens/BeerCreateScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react'
import { gapi } from 'gapi-script';
function App() {

  const clientID = "971797688819-5osp62f7rkgko6ul3uvdja8k8q9jg80p.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientID: clientID,
        scope: ""
      })
    };
    gapi.load("client:auth2", start)
  }, [])

  try {
    var check = gapi.auth.getToken().access_token
    console.log("-------")
    console.log(check)

  } catch (error) {
    console.log(error)
  }
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
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
