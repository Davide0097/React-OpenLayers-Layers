import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import './index.css'
import ImageLayer from 'ol/layer/Image.js';
import { Projection } from 'ol/proj';
import Static from 'ol/source/ImageStatic.js';
import { getCenter } from 'ol/extent';

function ImageLayerMap() {

    const extent = [0, 0, 1024, 968];
    const projection = new Projection({
        code: 'xkcd-image',

        extent: extent,
    });

    const mapTargetElement = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<Map>()

    useEffect(() => {
        const map = new Map({
            layers: [
                new ImageLayer({
                    source: new Static({
                        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
                        url: 'https://imgs.xkcd.com/comics/online_communities.png',
                        imageExtent: extent,
                    }),
                }),
            ],
            controls: [],
            view: new View({
                projection: projection,
                center: getCenter(extent),
                zoom: 2,
            }),
        });

        map.setTarget(mapTargetElement.current || "")
        setMap(map)

        return () => map.setTarget("")
    }, [])

    return (
        <div
            ref={mapTargetElement}
            className="map" id="map"
            style={{
                width: "100%",
                height: "170px",
                position: "relative",
            }} >
        </div>
    )
}
export default ImageLayerMap; 