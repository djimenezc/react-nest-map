import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
// import TileLayer from 'ol/layer/Tile';
// import OlSourceOSM from 'ol/source/OSM';
import OlSourceXYZ from 'ol/source/XYZ';
import 'ol/ol.css';
import {
    defaults as defaultInteractions,
    DragRotateAndZoom
} from 'ol/interaction';
import {defaults as defaultControls} from 'ol/control';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import Feature, {FeatureLike} from 'ol/Feature';
import {Vector as VectorLayer} from 'ol/layer';
import Point from 'ol/geom/Point';
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import {Device} from "../react-app-env";
import {Circle as CircleStyle, Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {createEmpty, extend, getHeight, getWidth} from 'ol/extent';
import Overlay from 'ol/Overlay';
import OverlayPositioning from "ol/OverlayPositioning";
import {Pixel} from "ol/pixel";

export default class OlMapManager {
    public map: OlMap;
    private iconOpts = {
        anchor: [0.3, 30],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: 'markers/icons8-shipping-container-30.png'
    };
    // private styleCache = {};
    private currentResolution: number = 0;
    private maxFeatureCount: number = 0;
    private clusters?: VectorLayer;

    private textFill = new Fill({
        color: '#fff'
    });
    private textStroke = new Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 3
    });
    private popup?: Overlay;

    constructor() {
        this.map = this.buildMap();
    }

    buildMap() {
        console.log('building Map');

        // const osm = new TileLayer({
        //     source: new OlSourceOSM()
        // });
        const googleMaps = new OlLayerTile({
            source: new OlSourceXYZ({
                url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
            })
        });

        return new OlMap({
            interactions: defaultInteractions().extend([
                new DragRotateAndZoom()
            ]),
            controls: defaultControls().extend([
                // overviewMapControl
            ]),
            layers: [
                googleMaps,
                // vectorLayer,
                // osm
            ],
            view: new OlView({
                // center: center,
                // zoom: zoom
            })
        });
    }

    private static buildIconFeature(device?: Device) {

        // @ts-ignore
        const [lat, lon] = device?.Geometry.Coordinates;

        // const point = fromLonLat([lon, lat]);
        const point = new Point([lon, lat]).transform('EPSG:4326', 'EPSG:3857');

        return new Feature({
            geometry: point,
            id: device?.ID,
            name: device?.Name,
            share: device?.Share,
            temperature: device?.Temperature,
            active: device?.Active,
            battery: device?.Battery,
            date: device?.Date,
        });
    }

    addPoints(devices: Device[], popupRef: any) {
        console.log('Adding points', devices.length);

        const iconFeatures = devices.map((device: Device) => {
            return OlMapManager.buildIconFeature(device);
        });

        const vectorSource = new VectorSource({
            features: iconFeatures,
        });

        const clusterSource = new Cluster({
            distance: 40,
            source: vectorSource,
        });

        this.clusters = new VectorLayer({
            source: clusterSource,
            style: this.styleFunction.bind(this)
        });

        // this.map.addLayer(vectorLayer);
        this.map.addLayer(this.clusters);
        this.addMarkersPopup(popupRef);
    }

    private static isCluster(feature: FeatureLike) {
        if (!feature || !feature.get('features')) {
            return false;
        }
        return feature.get('features').length > 1;
    }

    private static isSingleFeature(feature: FeatureLike) {
        return !OlMapManager.isCluster(feature);
    }

    private getFeatureFromPixel(pixel: Pixel) {
        return this.map.forEachFeatureAtPixel(pixel,
            function (feature) {
                return feature;
            });
    }

    destroyMap() {
        // @ts-ignore
        this.map.removeOverlay(this.popup);
        // @ts-ignore
        this.popup = null;
        // @ts-ignore
        this.map.setTarget(null);
    }

    addMarkersPopup(popupRef: any) {

        this.popup = new Overlay({
            element: popupRef,
            positioning: OverlayPositioning.BOTTOM_CENTER,
            stopEvent: false,
            offset: [0, -20]
        });

        this.map.addOverlay(this.popup);

        // display popup on click
        this.map.on('click', (evt) => {

            const feature = this.getFeatureFromPixel(evt.pixel);

            if (feature && OlMapManager.isSingleFeature(feature)) {
                if (this.popup) {
                    const element = this.popup?.getElement();
                    const clickedFeature =
                        feature.getProperties().features[0];
                    const {
                        active, battery, date,
                        id, name, temperature
                    } = clickedFeature.getProperties();
                    element.innerHTML = `
                        <div>Id: ${id}</div>
                        <div>Name: ${name}</div>
                        <div>Date: ${date}</div>
                        <div>Temperature: ${temperature}</div>
                        <div>Active: ${active}</div>
                        <div>Battery: ${battery}</div>
                    `;
                    this.popup?.setPosition(evt.coordinate);
                    this.map.addOverlay(this.popup);
                }
            } else {
                // @ts-ignore
                this.map.removeOverlay(this.popup);
            }
        });

        // change mouse cursor when over marker
        this.map.on('pointermove', (evt) => {
            const feature = this.getFeatureFromPixel(evt.pixel);
            const hit = feature && OlMapManager.isSingleFeature(feature);
            // @ts-ignore
            this.map.getTarget().style.cursor = hit ? 'pointer' : '';
        });
    }

    calculateClusterInfo(resolution: number) {
        this.maxFeatureCount = 0;
        // @ts-ignore
        const features = this.clusters.getSource().getFeatures();
        let feature;
        let radius;

        for (let i = features.length - 1; i >= 0; --i) {
            feature = features[i];
            const originalFeatures = feature.get('features');
            const extent = createEmpty();

            let j = 0, jj = 0;
            for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
                extend(extent, originalFeatures[j].getGeometry().getExtent());
            }
            this.maxFeatureCount = Math.max(this.maxFeatureCount, jj);
            radius = 0.25 * (getWidth(extent) + getHeight(extent)) /
                resolution;
            feature.set('radius', radius);
        }
    };

    private styleFunction(feature: any, resolution: number) {

        if (resolution != this.currentResolution) {
            this.calculateClusterInfo(resolution);
            this.currentResolution = resolution;
        }

        let style;
        let size = feature.get('features').length;

        if (size > 1) {
            style = new Style({
                image: new CircleStyle({
                    radius: feature.get('radius'),
                    fill: new Fill({
                        color: [255, 153, 0, Math.min(0.8, 0.4 + (size / this.maxFeatureCount))]
                    })
                }),
                text: new Text({
                    text: size.toString(),
                    fill: this.textFill,
                    stroke: this.textStroke
                })
            });
        } else {
            style = new Style({
                image: new Icon(this.iconOpts)
            });
        }
        return style;
    }
}
