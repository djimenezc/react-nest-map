import React, {useRef, useState} from "react";
import {DevicesProps} from '../react-app-env'

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import TileLayer from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';
import OlSourceXYZ from 'ol/source/XYZ';
import 'ol/ol.css';
import {
    defaults as defaultInteractions,
    DragRotateAndZoom
} from 'ol/interaction';
import {defaults as defaultControls} from 'ol/control';

const Map: React.FC<DevicesProps> = ({devices}) => {
    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(3);
    const mapRef = useRef(null);
    const osm = new TileLayer({
        source: new OlSourceOSM()
    });
    const googleMaps = new OlLayerTile({
        source: new OlSourceXYZ({
            url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
        })
    });

    const map = new OlMap({
        interactions: defaultInteractions().extend([
            new DragRotateAndZoom()
        ]),
        controls: defaultControls(),
        layers: [
            googleMaps,
            // osm
        ],
        view: new OlView({
            center: center,
            zoom: zoom
        })
    });
    map.setTarget(mapRef.current || '');

    return (
        <div style={{
            padding: "0 2rem"
        }}>
            <div ref={mapRef}
                 style={{
                     width: "calc(100% - 4rem)",
                     height: "90%",
                     position: 'fixed'
                 }}>
            </div>
        </div>

    )
};

export default Map;
