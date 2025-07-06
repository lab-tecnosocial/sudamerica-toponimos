import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import proyectoMarkdown from '../data/proyecto.md?raw';
import { useEffect } from 'react';


function Proyecto() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://public.flourish.studio/resources/embed.js';
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);
    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Box sx={{
                textAlign: 'left',
                fontFamily: "'Roboto', sans-serif",
                '& h1': {
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                    color: '#795548'
                },
                '& h2': {
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginTop: '1.5rem',
                    marginBottom: '1rem',
                    color: '#795548'
                },
                '& h3': {
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginTop: '1.25rem',
                    marginBottom: '0.75rem',
                    color: '#795548'
                },
                '& h4': {
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginTop: '1rem',
                    marginBottom: '0.5rem',
                    color: '#795548'
                },
                '& h5': {
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginTop: '0.75rem',
                    marginBottom: '0.5rem',
                    color: '#795548'
                },
                '& h6': {
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                    color: '#795548'
                },
                '& p': {
                    lineHeight: 1.7,
                    marginBottom: '1rem',
                    textAlign: 'justify',
                    color: '#424242'
                },
                '& ul, & ol': {
                    marginBottom: '1rem',
                    paddingLeft: '2rem'
                },
                '& li': {
                    marginBottom: '0.5rem',
                    lineHeight: 1.6,
                    color: '#424242'
                },
                '& blockquote': {
                    borderLeft: '4px solid #795548',
                    paddingLeft: '1rem',
                    margin: '1rem 0',
                    fontStyle: 'italic',
                    backgroundColor: '#f5f5f5',
                    padding: '1rem',
                    color: '#555'
                },
                '& sup': {
                    fontSize: '0.75rem',
                    color: '#795548'
                },
                '& a': {
                    color: '#795548',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: '#5d4037'
                    }
                },
                '& code': {
                    backgroundColor: '#f5f5f5',
                    padding: '0.2rem 0.4rem',
                    borderRadius: '3px',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    color: '#795548'
                },
                '& pre': {
                    backgroundColor: '#f5f5f5',
                    padding: '1rem',
                    borderRadius: '5px',
                    overflow: 'auto',
                    marginBottom: '1rem',
                    '& code': {
                        backgroundColor: 'transparent',
                        padding: 0
                    }
                },
                '& table': {
                    borderCollapse: 'collapse',
                    width: '100%',
                    marginBottom: '1rem'
                },
                '& th, & td': {
                    border: '1px solid #ddd',
                    padding: '0.75rem',
                    textAlign: 'left'
                },
                '& th': {
                    backgroundColor: '#795548',
                    color: 'white',
                    fontWeight: 'bold'
                },
                '& strong, & b': {
                    color: '#795548',
                    fontWeight: 'bold'
                }
            }}>
                <Typography variant="h1" gutterBottom sx={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#795548',
                    fontWeight: 'bold',
                    fontFamily: "'Roboto', sans-serif"
                }}>
                    El proyecto
                </Typography>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                >
                    {proyectoMarkdown}
                </ReactMarkdown>
            </Box>
        </Container>
    )
}

export default Proyecto