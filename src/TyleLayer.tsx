import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import './index.css'
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ';

function TyleLayerMap() {

    const mapTargetElement = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<Map | undefined>()

    useEffect(() => {
        const map = new Map({
            layers: [new TileLayer({
                source: new XYZ({
                    url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
                })
            })],
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

    return (
        <>
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
export default TyleLayerMap; 