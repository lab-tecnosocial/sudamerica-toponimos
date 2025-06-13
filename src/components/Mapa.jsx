import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MiMarker from './MiMarker';
import data from '../data/datos.json';
import './Mapa.css';

// Definimos los colores para cada familia lingüística (lista actualizada)
const FAMILY_COLORS = {
    'Indoeuropea': '#FF5733', // Naranja
    'Chibcha': '#FF33A8', // Rosa
    'Quechua': '#33FF57', // Verde
    'No determinada': '#808080', // Gris
    'Jaqi': '#3357FF', // Azul
    'Indoeuropea, Afroasiática': '#FFFFFF', // Híbrido (contiene coma)
    'Caribe': '#FF5E87', // Rosa claro
    'Paleoeuropea': '#8B33FF', // Violeta
    'Chocó': '#8FED54', // Verde claro
    'Tupí-guaraní': '#33FFF6', // Cian
    'Indoeuropea, Chibcha': '#FFFFFF', // Híbrido (contiene coma)
    'Español, Aymara': '#FFFFFF', // Híbrido (contiene coma)
    'Chibcha, Indoeuropea': '#FFFFFF', // Híbrido (contiene coma)
    'Yuracaré-Moxeña': '#D2691E', // Marrón claro (ya no es híbrido)
    'Indoeuropea, Chocó, Chibcha': '#FFFFFF', // Híbrido (contiene coma)
    'Arawak, Indoeuropea': '#FFFFFF', // Híbrido (contiene coma)
    'Arawak': '#F4FF33', // Amarillo
    'No determinada, Paleoeuropea': '#FFFFFF', // Híbrido (contiene coma)
    'Niger-Congo': '#AA336A', // Púrpura (ya no es híbrido)
    'Lengua aislada': '#964B00', // Marrón
    'Indoeuropea, Paleoeuropea': '#FFFFFF', // Híbrido (contiene coma)
    'Español': '#33B5FF', // Celeste
    'Besiro': '#FF8C33', // Naranja claro
    'Hibrido': '#FFFFFF', // Blanco (para híbridos)
    'default': '#7D7D7D', // Color por defecto
};

export default function Mapa() {
    const [filteredData, setFilteredData] = useState(data);
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

    return (
        <div style={{ position: 'relative' }} className="map-container">
            <MapContainer
                center={[-8.700, -72.082]}
                zoom={5}
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
                <div className="legend-counter">Mostrando: {filteredData.length} topónimos</div>
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
        </div>
    );
}