import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Mapa from './Mapa';
import Proyecto from './Proyecto';
import LogoNoTopos from '../assets/logo-no-topos.png';
import { Routes, Route } from 'react-router';
import { NavLink } from 'react-router';

export default function Inicio() {
  return (
    <>
      <AppBar position="static" >
        <Toolbar className="header" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" color="inherit" >
            <b>Topónimos en Sudamérica</b>
          </Typography>
          <Box >
            <Button color="inherit" size="large"
              component={NavLink}
              to="/"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >Mapa</Button>
            <Button color="inherit" size="large"
              component={NavLink}
              to="/proyecto"
              style={{ textDecoration: 'none', color: 'inherit' }}

            >El proyecto</Button>
          </Box>
        </Toolbar>
      </AppBar >
      <main>
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/proyecto" element={<Proyecto />} />
        </Routes>
      </main>
      <Box className='footer'>
        <Typography variant="subtitle2" color="inherit" align="center" gutterBottom >
          <Link href="https://labtecnosocial.org/" color="inherit" underline="hover" target="_blank" rel="noopener" >
            <img src="https://labtecnosocial.org/wp-content/uploads/2021/07/cropped-logo-claro-300x149.png" alt="logo" width="80px" style={{ marginTop: '2px' }} />
          </Link>
          <img src={LogoNoTopos} alt="logo" width="55px" style={{ marginTop: '2px', marginLeft: '10px' }} />
        </Typography>
      </Box>
    </>
  );
}