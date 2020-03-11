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
import {defaults as defaultControls, OverviewMap} from 'ol/control';
import VectorSource from 'ol/source/Vector';
import {Icon, Style, Stroke} from 'ol/style';
import Feature from 'ol/Feature';
import {Vector as VectorLayer} from 'ol/layer';
import Point from 'ol/geom/Point';
import IconAnchorUnits from "ol/style/IconAnchorUnits";

export function buildMap() {
    const osm = new TileLayer({
        source: new OlSourceOSM()
    });
    const googleMaps = new OlLayerTile({
        source: new OlSourceXYZ({
            url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
        })
    });

    const iconFeature = new Feature({
        geometry: new Point([0, 0]),
        name: 'Null Island',
        population: 4000,
        rainfall: 500
    });

    const iconOpts = {
        anchor: [0.5, 46],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: 'data/icons8-shipping-container-30.png'
    };
    const iconStyle = new Style({
        image: new Icon(iconOpts)
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
        features: [iconFeature]
    });

// const vectorLayer = new VectorLayer({
//     source: vectorSource
// });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
            stroke: new Stroke({
                color: 'red',
                width: 4
            })
        })
    });

// @ts-ignore
    const overviewLayer = new TileLayer({
        source: osm
    });
// @ts-ignore
    const overviewMapControl = new OverviewMap({
        layers: [
            overviewLayer
        ]
    });

    return new OlMap({
        interactions: defaultInteractions().extend([
            new DragRotateAndZoom()
        ]),
        controls: defaultControls().extend([
            overviewMapControl
        ]),
        layers: [
            googleMaps,
            vectorLayer,
            osm
        ],
        view: new OlView({
            // center: center,
            // zoom: zoom
        })
    });
}
