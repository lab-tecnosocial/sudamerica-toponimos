import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MiMarker from './MiMarker';
import data from '../data/datos.json';
import './Mapa.css';
import L from 'leaflet';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// Definimos los colores para cada familia lingüística (esquema actualizado)
const FAMILY_COLORS = {
    'Indoeuropea': '#ffeb3b', // Amarillo
    'Chibcha': '#009688', // Verde azulado
    'Quechua': '#ff7500', // Naranja
    'No determinada': '#b7b7b7', // Gris
    'Jaqi': '#ff00ff', // Magenta
    'Afroasiática': '#f06292', // Rosa
    'Caribe': '#76ff03', // Verde lima
    'Paleoeuropea': '#00ffd7', // Cian
    'Chocó': '#0021e6', // Azul
    'Tupí-guaraní': '#6b00ef', // Violeta
    'Yuracaré-Moxeña': '#83c400', // Verde oliva
    'Arawak': '#9c27b0', // Púrpura
    'Niger-Congo': '#487700', // Verde oscuro
    'Lengua aislada': '#850043', // Granate
    'Besiro': '#134f5c', // Azul petróleo
    'Japónica': '#c18200', // Dorado
    'Uru-Chipaya': '#34a853', // Verde
    'Español': '#ffeb3b', // Amarillo (igual que Indoeuropea)
    // Todas las familias híbridas (con coma) usan color blanco
    'Indoeuropea, Afroasiática': '#ffffff',
    'Indoeuropea, Chibcha': '#ffffff',
    'Español, Aymara': '#ffffff',
    'Chibcha, Indoeuropea': '#ffffff',
    'Indoeuropea, Chocó, Chibcha': '#ffffff',
    'Arawak, Indoeuropea': '#ffffff',
    'No determinada, Paleoeuropea': '#ffffff',
    'Indoeuropea, Paleoeuropea': '#ffffff',
    'Hibrido': '#ffffff', // Blanco (para híbridos genéricos)
    'default': '#7D7D7D', // Color por defecto
};

var southAmericaBounds = L.latLngBounds(
    L.latLng(-66.0, -92.0), // suroeste (10 menos lat, 10 menos lon)
    L.latLng(23.0, -24.0)   // noreste (10 más lat, 10 más lon)
);

export default function Mapa() {
    const [filteredData, setFilteredData] = useState(data);
    const [selectedTema, setSelectedTema] = useState('Todos');
    const [selectedFamilia, setSelectedFamilia] = useState("Todas");

    // Generar un mapa de colores para todos los puntos basado en su familia
    const colorMap = useMemo(() => {
        const map = new Map();
        data.forEach(item => {
            if (item.familia) {
                // Usar una clave compuesta para identificar cada punto de manera única
                const key = `${item.municipio}-${item.lat}-${item.lon}`;
                map.set(key, getFamilyColor(item.familia));
            }
        });
        return map;
    }, []);

    // Función para determinar el color según la familia lingüística
    function getFamilyColor(familia) {
        // Si la familia tiene un color específico asignado
        if (familia && FAMILY_COLORS[familia]) {
            return FAMILY_COLORS[familia];
        }

        // Si contiene coma (pero no guion) y no tiene color específico, es híbrido genérico
        if (familia && familia.includes(',')) {
            return FAMILY_COLORS['Hibrido'];
        }

        // Si no, usamos el color correspondiente o el default
        return FAMILY_COLORS[familia] || FAMILY_COLORS['default'];
    };

    // Obtener todas las familias únicas para la leyenda con categoría "Híbrido" para las combinadas
    const uniqueFamilies = useMemo(() => {
        const families = new Set();
        const hybridFamilies = new Set(); // Conjunto para registrar familias híbridas originales

        // Procesar los datos para extraer familias únicas
        data.forEach(item => {
            if (item.familia) {
                if (item.familia.includes(',')) { // Solo considerar híbridos los que contienen comas
                    families.add('Hibrido');
                    // Almacenamos el nombre original también para referencia
                    hybridFamilies.add(item.familia);
                } else {
                    families.add(item.familia);
                }
            }
        });

        // Convertir a array y ordenar
        const sortedFamilies = Array.from(families).sort();

        // Asegurarnos que "Hibrido" aparezca al final si está presente
        if (sortedFamilies.includes('Hibrido')) {
            const index = sortedFamilies.indexOf('Hibrido');
            sortedFamilies.splice(index, 1);
            sortedFamilies.push('Hibrido');
        }

        return sortedFamilies;
    }, []);

    // Obtener todos los temas únicos para el filtro
    const uniqueTemas = useMemo(() => {
        const temas = new Set();

        // Procesar los datos para extraer temas únicos
        data.forEach(item => {
            if (item.tema && item.tema.trim() !== '') {
                temas.add(item.tema);
            }
        });

        // Convertir a array y ordenar
        const temasArray = Array.from(temas).sort();

        // Agregar "Todos" al principio del array
        return ["Todos", ...temasArray];
    }, []);

    // Función para filtrar por tema y familia
    const handleFilter = (filters) => {
        const { tema, familia } = filters;
        const filtered = data.filter(item => {
            const temaMatch = tema === "Todos" || item.tema === tema;
            const familiaMatch = familia === "Todas" || item.familia === familia;
            return temaMatch && familiaMatch;
        });
        setFilteredData(filtered);
    };

    // Función para filtrar por una familia específica desde la leyenda
    const handleFamilyClick = (family) => {
        let filtered;

        if (family === 'Hibrido') {
            // Si es híbrido, filtramos solo los elementos que contengan coma
            filtered = data.filter(item =>
                item.familia && item.familia.includes(',')
            );
        } else {
            // Para otras familias, filtramos exactamente por ese nombre de familia
            filtered = data.filter(item => item.familia === family);
        }

        setFilteredData(filtered);
    };

    // Función para manejar el cambio de tema
    const handleTemaChange = (event) => {
        const tema = event.target.value;
        setSelectedTema(tema);

        // Filtrar los datos según el tema seleccionado
        const filtered = tema === "Todos" ? data : data.filter(item => item.tema === tema);
        setFilteredData(filtered);
    };

    // Función para contar topónimos únicos
    const countUniqueToponyms = (data) => {
        const uniqueKeys = new Set();
        data.forEach(item => {
            const key = `${item.municipio}-${item.lat}-${item.lon}`;
            uniqueKeys.add(key);
        });
        return uniqueKeys.size;
    };

    return (
        <div style={{ position: 'relative' }} className="map-container">
            {/* Filtro de Tema */}
            <div className="tema-filter">
                <FormControl variant="outlined" size="small">
                    <InputLabel sx={{
                        fontSize: '12px',
                        fontFamily: "'Roboto', sans-serif",
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        padding: '0 5px'
                    }}>Tema</InputLabel>
                    <Select
                        value={selectedTema}
                        onChange={handleTemaChange}
                        label="Tema"
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    maxHeight: 300,
                                }
                            }
                        }}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            minWidth: '180px',
                            fontSize: '12px',
                            fontFamily: "'Roboto', sans-serif",
                            '& .MuiSelect-select': {
                                fontSize: '12px',
                                padding: '8px 14px'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        }}
                    >
                        {uniqueTemas.map((tema) => (
                            <MenuItem
                                key={tema}
                                value={tema}
                                sx={{
                                    fontSize: '12px',
                                    fontFamily: "'Roboto', sans-serif",
                                    backgroundColor: 'transparent',
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.25)'
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                    }
                                }}
                            >
                                {tema}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <MapContainer
                center={[-8.700, -72.082]}
                zoom={5}
                minZoom={3}
                maxZoom={18}
                maxBounds={southAmericaBounds}
                maxBoundsViscosity={1.0}
                style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                {filteredData.map((item, index) => {
                    const pointKey = `${item.municipio}-${item.lat}-${item.lon}`;
                    const pointColor = colorMap.get(pointKey) || getFamilyColor(item.familia);
                    return (
                        <MiMarker
                            key={pointKey}
                            item={item}
                            color={pointColor}
                        />
                    );
                })}
            </MapContainer>


            {/* Leyenda de Familias Lingüísticas */}
            <div className="map-legend">
                <h4>Familias Lingüísticas</h4>
                <div className="legend-counter">Mostrando: {countUniqueToponyms(filteredData)} topónimos</div>
                <div className="legend-item" onClick={() => setFilteredData(data)}>
                    <span className="legend-color" style={{ background: 'linear-gradient(45deg, #FF5733, #33FF57, #3357FF, #FF33A8)' }}></span>
                    <span className="legend-label">Todos</span>
                </div>
                {uniqueFamilies.map((family, index) => (
                    <div key={index} className="legend-item" onClick={() => handleFamilyClick(family)}>
                        <span
                            className="legend-color"
                            style={{ backgroundColor: FAMILY_COLORS[family] || FAMILY_COLORS['default'] }}
                        ></span>
                        <span className="legend-label">
                            {family === 'Hibrido' ? 'Híbrido' : family}
                        </span>
                    </div>
                ))}
            </div>
        </div >
    );
}