import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import './index.css'
import WebGLTileLayer from 'ol/layer/WebGLTile';
import XYZ from 'ol/source/XYZ.js';

function WebGLTile() {

    const mapTargetElement = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<Map | undefined>()

    const layer = new WebGLTileLayer({
        source: new XYZ({
          url: 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN',
        }),
      });
    const webglLayer = new WebGLTileLayer({
        source: new XYZ({
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        }),
      });
  
    useEffect(() => {
        const map = new Map({
              layers: [layer,webglLayer],
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

    return (<>
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
export default WebGLTile; 