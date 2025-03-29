import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function FiltroPanel({ temas, familias, onFilter }) {
    const [open, setOpen] = useState(false);
    const [selectedTema, setSelectedTema] = useState('');
    const [selectedFamilia, setSelectedFamilia] = useState('');

    const toggleDrawer = () => setOpen(!open);

    const handleApplyFilter = () => {
        onFilter({ tema: selectedTema, familia: selectedFamilia });
        toggleDrawer();
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={toggleDrawer}
                style={{
                    position: 'absolute', // Cambiado a 'absolute' para posicionarlo relativo al contenedor padre
                    right: 20,
                    top: 20,
                    zIndex: 1000, // Asegura que el botón esté encima del mapa
                }}
            >
                Filtros
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                <div style={{ width: 300, padding: 20 }}>
                    <h3>Filtrar puntos</h3>
                    <FormControl fullWidth style={{ marginBottom: 20 }}>
                        <InputLabel>Tema</InputLabel>
                        <Select
                            value={selectedTema}
                            onChange={(e) => setSelectedTema(e.target.value)}
                        >
                            {temas.map((tema, index) => (
                                <MenuItem key={index} value={tema}>{tema}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{ marginBottom: 20 }}>
                        <InputLabel>Familia</InputLabel>
                        <Select
                            value={selectedFamilia}
                            onChange={(e) => setSelectedFamilia(e.target.value)}
                        >
                            {familias.map((familia, index) => (
                                <MenuItem key={index} value={familia}>{familia}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleApplyFilter} fullWidth>
                        Aplicar
                    </Button>
                </div>
            </Drawer>
        </>
    );
}