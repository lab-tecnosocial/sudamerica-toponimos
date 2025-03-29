import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MiMarker from './MiMarker';
import FiltroPanel from './FiltroPanel';
import data from '../data/datos.json'; // Asegúrate de que esta ruta sea correcta

const temas = [
    "Todos",
    "Otro topónimo",
    "Otro topónimo, Paisaje / Características naturales",
    "Otro topónimo, Usos / actividades humanas",
    "Apodos / Nombres humanos",
    "Paisaje / Características naturales",
    "Época / Hecho histórico",
    "Espiritualidad / Religión",
    "Comunidades",
    "Flora",
    "Fauna",
    "Usos / actividades humanas",
    "Politica",
    "Desconocido"
];

const familias = [
    "Todas",
    "Indoeuropea - Romance Occidental",
    "Chibcha",
    "Indoeuropea/Romance",
    "Quechua",
    "Jaqi/Aru",
    "Caribe",
    "Chocó",
    "No determinada",
    "Afroasiática",
    "Indoeuropea - Romance Occidental, Afroasiática",
    "Tupí-guaraní",
    "Peleoeuropea",
    "Arawak",
    "Otra"
];

export default function Mapa() {
    const [filteredData, setFilteredData] = useState(data);

    const handleFilter = (filters) => {
        const { tema, familia } = filters;
        const filtered = data.filter(item => {
            const temaMatch = tema === "Todos" || item.tema === tema;
            const familiaMatch = familia === "Todas" || item.familia === familia;
            return temaMatch && familiaMatch;
        });
        setFilteredData(filtered);
    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <FiltroPanel temas={temas} familias={familias} onFilter={handleFilter} />
            <MapContainer
                center={[-15.7942, -60.8822]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                {filteredData.map((item, index) => (
                    <MiMarker key={index} item={item} />
                ))}
            </MapContainer>
        </div>
    );
}