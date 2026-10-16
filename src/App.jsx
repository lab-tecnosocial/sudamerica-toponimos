import './App.css';
import Inicio from './components/Inicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router';

// Con base relativa, la ruta de montaje se deduce de dónde se sirve el bundle
// (…/assets/index-*.js → …/). En desarrollo, src/App.jsx → '/'.
const basename = new URL('..', import.meta.url).pathname;

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#795548",
      },
    },
  }
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={basename}>
        <Inicio />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
