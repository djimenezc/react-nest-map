import React, {useEffect, useRef, useState} from "react";
import {DevicesProps} from '../react-app-env'
import OlMap from "./OlMap";
import './map.css';

const defaultZoom = 3;
const defaultCenter = [0, 0];
let olMap: OlMap;

const Map: React.FC<DevicesProps> = ({devices}) => {
    const mapRef = useRef(null);
    const popupRef = useRef(null);
    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(defaultZoom);

    useEffect(() => {
        olMap = new OlMap();

        return () => {
            debugger
            console.log('cleaning map');
            olMap.destroyMap();
            setTimeout(function(){
                debugger
                const $mapContainer = document.getElementById("mapContainer");
                if($mapContainer){
                    document.getElementById("popup")?.removeChild($mapContainer);
                }
            }, 100);
        };
    },[]);

    useEffect(() => {
        olMap.map.setTarget(mapRef.current || '');
        olMap.map.getView().setCenter(center);
        olMap.map.getView().setZoom(zoom);
        olMap.addPoints(devices, popupRef.current);
    });

    return (
        <div id='mapContainer'>
            <div id='popup' className="blue-circle" ref={popupRef}>
                hola
            </div>
            <div id='map' ref={mapRef}
                 style={{
                     // width: "calc(100% - 4rem)",
                     width: '100%',
                     height: "100%",
                     position: 'fixed'
                 }}>
            </div>
        </div>
    )
};

export default Map;
