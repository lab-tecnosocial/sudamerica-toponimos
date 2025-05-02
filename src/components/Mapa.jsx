import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MiMarker from './MiMarker';
import FiltroPanel from './FiltroPanel';
import data from '../data/datos.json'; // Asegúrate de que esta ruta sea correcta
import L from 'leaflet';

const temas = [
    "Otro topónimo",
    "Apodos / Nombres humanos",
    "Paisaje / Características naturales",
    "Época / Hecho histórico",
    "Espiritualidad / Religión",
    "Comunidades",
    "Flora",
    "Usos / actividades humanas",
    "Otro topónimo, Paisaje / Características naturales",
    "Fauna",
    "Otro topónimo, Usos / actividades humanas",
    "Politica",
    "Espiritualidad / Religión, Otro topónimo",
    "Usos / actividades humanas, Apodos / Nombres humanos",
    "Paisaje / Características naturales, Otro topónimo",
    "Otro topónimo, Espiritualidad / Religión",
    "Otro topónimo, Apodos / Nombres humanos",
    "Espiritualidad / Religión, Apodos / Nombres humanos",
    "Apodos / Nombres humanos, Otro topónimo",
    "Apodos / Nombres humanos, Espiritualidad / Religión",
    "Paisaje / Características naturales, Espiritualidad / Religión",
    "Otro topónimo, Paisaje / Características naturales, Usos / actividades humanas",
    "Espiritualidad / Religión, Usos / actividades humanas",
    "Época / Hecho histórico, Usos / actividades humanas",
    "Otro topónimo, Época / Hecho histórico",
    "Otro topónimo, Comunidades",
    "Lengua",
    "Espiritualidad / Religión, Comunidades",
    "Desconocido",
    "Usos / actividades humanas, Paisaje / Características naturales",
    "Usos / actividades humanas, Otro topónimo",
    "Paisaje / Características naturales, Usos / actividades humanas",
    "Paisaje / Características naturales, Flora",
    "Paisaje / Características naturales, Época / Hecho histórico, Espiritualidad / Religión",
    "Paisaje / Características naturales, Época / Hecho histórico",
    "Paisaje / Características naturales, Apodos / Nombres humanos",
    "Otro topónimo, Flora",
    "Otro topónimo, Fauna",
    "Otro topónimo, Apodos / Nombres humanos, Usos / actividades humanas",
    "Otro topónimo, Apodos / Nombres humanos, Fauna",
    "Literatura",
    "Flora, Usos / actividades humanas",
    "Flora, Paisaje / Características naturales",
    "Flora, Otro topónimo",
    "Fauna, Usos / actividades humanas",
    "Fauna, Apodos / Nombres humanos",
    "Espiritualidad / Religión, Paisaje / Características naturales, Otro topónimo",
    "Espiritualidad / Religión, Paisaje / Características naturales",
    "Espiritualidad / Religión, Fauna",
    "Espiritualidad / Religión, Actividades humanas",
    "Época / Hecho histórico, Otro topónimo",
    "Época / Hecho histórico, Flora, Paisaje / Características naturales",
    "Descriptivo",
    "Comunidades, Otro topónimo",
    "Comunidades, Actividades humanas",
    "Comunidades / Asentamientos",
    "Apodos / Nombres humanos, Usos / actividades humanas",
    "Apodos / Nombres humanos, Flora",
    "Apodos / Nombres humanos, Espiritualidad / Religión, Época / Hecho histórico, Usos / actividades humanas",
    "Apodos / Nombres humanos, Comunidades",
    "Actividades humanas"
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
    "Otra",
    "Indoeuropea",
    "Jaqi",
    "Indoeuropea - Romance Occidental, Chibcha",
    "Chibcha, Indoeuropea - Romance Occidental",
    "Quechua, Indoeuropea - Romance Occidental",
    "Paleoeuropeo",
    "Niger-Congo",
    "Indoeuropea - Romance Occidental, Peleoeuropea",
    "Indoeuropea - Romance Occidental, Chocó, Chibcha",
    "Arawak, Indoeuropea - Romance Occidental",
    "Uro",
    "Peleoeuropea, Indoeuropea - Romance Occidental",
    "Pano-Tacana",
    "No determinada, Peleoeuropea",
    "Japónicas",
    "Indoeuropea - Romance Occidental, No determinada",
    "Indoeuropea - Romance Occidental, Chocó",
    "Indoeuropea - Romance Occidental, Caribe",
    "Español",
    "Chocó, Niger-Congo",
    "Chibcha, Quechua",
    "Chibcha, Caribe",
    "Besiro",
    "Arawak, Caribe",
    "Arahuaca",
    "Afroasiática, Quechua",
    "Afroasiática, Indoeuropea - Romance Occidental"
];

function Legend() {
    const map = useMap();

    React.useEffect(() => {
        const legend = L.control({ position: 'bottomleft' });

        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend');
            const familiasColors = {
                "Indoeuropea - Romance Occidental": "blue",
                "Chibcha": "green",
                "Indoeuropea/Romance": "orange",
                "Quechua": "red",
                "Jaqi/Aru": "purple",
                "Caribe": "yellow",
                "Chocó": "lime",
                "No determinada": "brown",
                "Afroasiática": "cyan",
                "Indoeuropea - Romance Occidental, Afroasiática": "pink",
                "Tupí-guaraní": "gray",
                "Peleoeuropea": "teal",
                "Arawak": "gold",
                "Otra": "magenta",
                "Indoeuropea": "coral",
                "Jaqi": "olive",
                "Indoeuropea - Romance Occidental, Chibcha": "navy",
                "Chibcha, Indoeuropea - Romance Occidental": "violet",
                "Quechua, Indoeuropea - Romance Occidental": "crimson",
                "Paleoeuropeo": "khaki",
                "Niger-Congo": "darkgreen",
                "Indoeuropea - Romance Occidental, Peleoeuropea": "salmon",
                "Indoeuropea - Romance Occidental, Chocó, Chibcha": "indigo",
                "Arawak, Indoeuropea - Romance Occidental": "goldenrod",
                "Uro": "darkred",
                "Peleoeuropea, Indoeuropea - Romance Occidental": "lightblue",
                "Pano-Tacana": "darkorange",
                "No determinada, Peleoeuropea": "lightgreen",
                "Japónicas": "orchid",
                "Indoeuropea - Romance Occidental, No determinada": "slateblue",
                "Indoeuropea - Romance Occidental, Chocó": "peru",
                "Indoeuropea - Romance Occidental, Caribe": "plum",
                "Español": "turquoise",
                "Chocó, Niger-Congo": "darkslategray",
                "Chibcha, Quechua": "peachpuff",
                "Chibcha, Caribe": "sienna",
                "Besiro": "lightcoral",
                "Arawak, Caribe": "mediumseagreen",
                "Arahuaca": "mediumvioletred",
                "Afroasiática, Quechua": "steelblue",
                "Afroasiática, Indoeuropea - Romance Occidental": "mediumorchid"
            };

            // Estilo del contenedor de la leyenda
            div.style.backgroundColor = 'white';
            div.style.padding = '10px';
            div.style.borderRadius = '5px';
            div.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
            div.style.fontSize = '0.9rem';
            div.style.maxHeight = '400px'; // Limitar la altura
            div.style.overflowY = 'auto'; // Habilitar scroll vertical
            div.style.zIndex = '1000'; // Asegurarse de que esté por encima de otros elementos

            div.innerHTML = '<h4>Familias</h4>';
            Object.entries(familiasColors).forEach(([key, color]) => {
                div.innerHTML += `
                    <i style="background:${color}; width: 12px; height: 12px; display: inline-block; margin-right: 8px;"></i>
                    ${key}<br>
                `;
            });

            // Evitar que el scroll y los clics en la leyenda afecten al mapa
            L.DomEvent.disableScrollPropagation(div);
            L.DomEvent.disableClickPropagation(div);

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