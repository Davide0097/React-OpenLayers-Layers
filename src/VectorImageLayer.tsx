import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import './index.css'

import GeoJSON from 'ol/format/GeoJSON.js';
import VectorImageLayer from 'ol/layer/VectorImage.js';
import VectorSource from 'ol/source/Vector.js';
import { Fill, Style } from 'ol/style.js';


function VectorImageLayerMap() {

    const mapTargetElement = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<Map | undefined>()

    useEffect(() => {
        const map = new Map({
            layers: [vectorLayer],
            controls: [],
            view: new View({
                center: [0, 0],
                zoom: 0,
                minZoom: 0,
                maxZoom: 28,
            }),
        });

        map.setTarget(mapTargetElement.current || "")
        setMap(map)
        return () => map.setTarget("")
    }, [])


    const style = new Style({
        fill: new Fill({
            color: '#eeeeee',
        }),
    });

    const vectorLayer = new VectorImageLayer({
        background: '#1a2b38',
        source: new VectorSource({
            url: 'https://openlayers.org/data/vector/ecoregions.json',
            format: new GeoJSON(),
        }),
        style: function (feature) {
            const color = feature.get('COLOR') || '#eeeeee';
            style.getFill().setColor(color);
            return style;
        },
    });


    const [info, setInfo] = useState<string | undefined>("")

    const displayFeatureInfo = function (pixel: any[]) {
        const feature = map?.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
        });
        if (feature) {
            setInfo(feature.get('ECO_NAME') || '&nbsp;');
        } else {
            setInfo("info");
        }
    };

    map?.on('pointermove', function (evt) {
        if (evt.dragging) {
            return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });

    return (<>
        <div >{info}</div>
        <div
            ref={mapTargetElement}
            className="map" id="map"
            style={{
                width: "100%",
                height: "170px",
                position: "relative",
            }} >

        </div>
    </>)
}
export default VectorImageLayerMap; 