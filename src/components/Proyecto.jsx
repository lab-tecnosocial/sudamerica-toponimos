import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function Proyecto() {
    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    El proyecto
                </Typography>
                <Typography variant="body1" >
                    Este proyecto tiene como objetivo.......
                </Typography>
                <Typography variant="body1" >
                    La base de datos se encuentra disponible......
                </Typography>
            </Box>
        </Container>
    )
}

export default Proyecto