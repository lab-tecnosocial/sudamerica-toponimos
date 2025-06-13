import { CircleMarker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

export default function MiMarker({ item, color }) {

    return (
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
                <p><b>Familia lingüística</b>: {item.familia}</p>
                <p><b>Lengua</b>: {item.lengua}</p>
                {
                    item.significado &&
                    <p><b>Significado</b>: {item.significado}</p>
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
    );
}