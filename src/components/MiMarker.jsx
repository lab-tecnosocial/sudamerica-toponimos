import { CircleMarker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

export default function MiMarker({ item }) {
    // Function to determine the color based on item.tema
    const getColorByTema = (tema) => {
        switch (tema) {
            case "Otro topónimo":
            case "Otro topónimo, Paisaje / Características naturales":
            case "Otro topónimo, Usos / actividades humanas":
                return "blue";
            case "Apodos / Nombres humanos":
                return "green";
            case "Paisaje / Características naturales":
                return "orange";
            case "Época / Hecho histórico":
                return "red";
            case "Espiritualidad / Religión":
                return "purple";
            case "Comunidades":
                return "yellow";
            case "Flora":
                return "lime";
            case "Fauna":
                return "brown";
            case "Usos / actividades humanas":
                return "cyan";
            case "Politica":
                return "pink";
            default:
                return "gray"; // Default color for "Desconocido"
        }
    };

    return (
        <CircleMarker
            center={[item.lat, item.lon]}
            radius={5}
            fillOpacity={0.8}
            color="white"
            fillColor={getColorByTema(item.tema)}
            weight={1}
            opacity={1}
        >
            <Popup>
                <p><b>Nombre de municipio</b>: {item.municipio}</p>
                <p><b>Familia lingüística</b>: {item.familia}</p>
                <p><b>Lengua</b>: {item.lengua}</p>
                <p><b>Significado</b>: {item.significado}</p>

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
    );
}