import React, {useEffect, useRef, useState} from "react";
import {DevicesProps} from '../react-app-env'
import {buildMap} from "./buildMap";

const map = buildMap();

const Map: React.FC<DevicesProps> = ({devices}) => {
    const mapRef = useRef(null);
    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(3);

    useEffect(() => {
        map.setTarget(mapRef.current || '');
        map.getView().setCenter(center);
        map.getView().setZoom(zoom);
    });

    return (
        <div style={{
            padding: "0 2rem"
        }}>
            holaa
            <div id='map' ref={mapRef}
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
