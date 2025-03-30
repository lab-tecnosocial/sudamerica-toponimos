
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Mapa from './Mapa';
import Proyecto from './Proyecto';
import LogoNoTopos from '../assets/logo-no-topos.png';
import { Routes, Route } from 'react-router';
import Header from './Header';
export default function Inicio() {
  return (
    <>
      <Header />
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


