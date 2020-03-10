import React, {useRef, useState} from "react";
import {DevicesProps} from '../react-app-env'

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
// import OlSourceOSM from 'ol/source/OSM';
import OlSourceXYZ from 'ol/source/XYZ';

const Map: React.FC<DevicesProps> = ({devices}) => {
    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(3);
    const mapRef = useRef(null);

    const olMap = new OlMap({
        layers: [
            new OlLayerTile({
                source: new OlSourceXYZ({
                    url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
                })
            })
        ],
        view: new OlView({
            center: center,
            zoom: zoom
        })
    });
    olMap.setTarget(mapRef.current || '');

    return (
        <div ref={mapRef}
             style={{width: "100%", height: "100%", position: 'absolute'}}>
        </div>
    )
};

export default Map;
