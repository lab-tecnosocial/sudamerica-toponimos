import './App.css';
import Inicio from './components/Inicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router';


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
      <BrowserRouter>
        <Inicio />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
