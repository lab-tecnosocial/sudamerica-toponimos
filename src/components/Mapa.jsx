import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MiMarker from './MiMarker';
import FiltroPanel from './FiltroPanel';
import data from '../data/datos.json'; // Asegúrate de que esta ruta sea correcta
import L from 'leaflet';

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

function Legend() {
    const map = useMap();

    React.useEffect(() => {
        const legend = L.control({ position: 'bottomleft' });

        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend');
            const temasColors = {
                "Otro topónimo": "blue",
                "Otro topónimo, Paisaje / Características naturales": "blue",
                "Otro topónimo, Usos / actividades humanas": "blue",
                "Apodos / Nombres humanos": "green",
                "Paisaje / Características naturales": "orange",
                "Época / Hecho histórico": "red",
                "Espiritualidad / Religión": "purple",
                "Comunidades": "yellow",
                "Flora": "lime",
                "Fauna": "brown",
                "Usos / actividades humanas": "cyan",
                "Politica": "pink",
                "Desconocido": "gray"
            };

            // Estilo del contenedor de la leyenda
            div.style.backgroundColor = 'white';
            div.style.padding = '10px';
            div.style.borderRadius = '5px';
            div.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
            div.style.fontSize = '0.9rem';

            div.innerHTML = '<h4>Temas</h4>';
            Object.entries(temasColors).forEach(([key, color]) => {
                div.innerHTML += `
                    <i style="background:${color}; width: 12px; height: 12px; display: inline-block; margin-right: 8px;"></i>
                    ${key}<br>
                `;
            });

            return div;
        };

        legend.addTo(map);

        return () => {
            legend.remove();
        };
    }, [map]);

    return null;
}

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
        <div style={{ position: 'relative' }} className="map-container">
            <FiltroPanel temas={temas} familias={familias} onFilter={handleFilter} />
            <MapContainer
                center={[-10.7942, -62.8822]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                {filteredData.map((item, index) => (
                    <MiMarker key={index} item={item} />
                ))}
                <Legend />
            </MapContainer>
        </div>
    );
}