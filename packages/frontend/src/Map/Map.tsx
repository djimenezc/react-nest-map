import React, {useEffect, useRef, useState} from "react";
import {DevicesProps} from '../react-app-env'
import OlMap from "./OlMap";

const olMap = new OlMap();
const defaultZoom = 3;
const defaultCenter = [0, 0];

const Map: React.FC<DevicesProps> = ({devices}) => {
    const mapRef = useRef(null);
    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(defaultZoom);

    const onClickHome = () => {
        // e.preventDefault();
        console.log('onClickHome');
        setCenter(defaultCenter);
        setZoom(defaultZoom);
    };

    useEffect(() => {
        olMap.map.setTarget(mapRef.current || '');
        olMap.map.getView().setCenter(center);
        olMap.map.getView().setZoom(zoom);
        olMap.addPoints(devices);
    });

    return (
        <div id='map' ref={mapRef}
             style={{
                 // width: "calc(100% - 4rem)",
                 width: '100%',
                 height: "100%",
                 position: 'fixed'
             }}>
        </div>
    )
};

export default Map;
