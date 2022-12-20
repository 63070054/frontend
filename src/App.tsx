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

function App() {

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
