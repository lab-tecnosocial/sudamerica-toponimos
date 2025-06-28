import { CircleMarker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { Modal, Box, IconButton, Typography, Link } from '@mui/material';
import { Close as CloseIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';

export default function MiMarker({ item, color }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleWikipediaClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Estilo para el modal
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95%', sm: '90%', md: '80%', lg: '70%' },
        height: { xs: '90%', sm: '85%', md: '80%' },
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    };

    return (
        <>
            <CircleMarker
                center={[item.lat, item.lon]}
                radius={5}
                fillOpacity={0.8}
                color="white"
                weight={1}
                opacity={1}
                fillColor={color || "blue"} // Usar el color proporcionado o azul por defecto
            >
                <Popup>
                    <p><b>Nombre de municipio</b>: {item.municipio}</p>
                    <p><b>Tema</b>: {item.tema}</p>
                    <p><b>Familia lingüística</b>: {item.familia}</p>
                    <p><b>Lengua</b>: {item.lengua}</p>
                    {
                        item.significado &&
                        <p><b>Significado</b>: {item.significado}</p>
                    }
                    {
                        item.enlace_embeber && item.enlace_embeber.trim() !== '' &&
                        <div style={{ marginTop: '10px', borderTop: '1px solid #ddd', paddingTop: '8px' }}>
                            <Link
                                component="button"
                                onClick={handleWikipediaClick}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    textDecoration: 'none',
                                    color: '#90caf9', // Azul claro que contrasta bien con el fondo café
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: '#bbdefb' // Un tono aún más claro en hover
                                    }
                                }}
                            >
                                <OpenInNewIcon sx={{ fontSize: 16 }} />
                                Ver en Wikipedia
                            </Link>
                        </div>
                    }

                    {/* <Lightbox
                        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
                        open={open}
                        close={() => setOpen(false)}

                        slides={[
                            { src: item.imgColUrl, description: '' },
                            { src: item.imgBwUrl, description: '' },
                        ]}
                        plugins={[Captions]}
                        captions={{ descriptionTextAlign: 'center' }}
                    /> */}
                </Popup>
            </CircleMarker>

            {/* Modal para mostrar contenido de Wikipedia */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="wikipedia-modal-title"
                aria-describedby="wikipedia-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* Header del modal */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: '1px solid #ddd',
                        bgcolor: '#f5f5f5'
                    }}>
                        <Typography id="wikipedia-modal-title" variant="h6" component="h2">
                            {item.municipio} - Wikipedia
                        </Typography>
                        <IconButton
                            onClick={handleCloseModal}
                            size="small"
                            sx={{ color: 'text.secondary' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Contenido del iframe */}
                    <Box sx={{ flex: 1, overflow: 'hidden' }}>
                        <iframe
                            src={item.enlace_embeber}
                            width="100%"
                            height="100%"
                            style={{
                                border: 'none',
                                display: 'block'
                            }}
                            title={`Wikipedia - ${item.municipio}`}
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                    </Box>

                    {/* Footer con enlace para abrir en nueva pestaña */}
                    <Box sx={{
                        p: 1,
                        borderTop: '1px solid #ddd',
                        bgcolor: '#f5f5f5',
                        textAlign: 'center'
                    }}>
                        <Link
                            href={item.enlace_embeber}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: '0.75rem',
                                color: 'text.secondary'
                            }}
                        >
                            <OpenInNewIcon sx={{ fontSize: 14 }} />
                            Abrir en nueva pestaña
                        </Link>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}