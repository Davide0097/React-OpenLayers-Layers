import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import './index.css';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';

function VectorTileLayerMap() {

  const mapTargetElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | undefined>()

  const vectorTileUrl = 'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
    'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'

  const vectorTileSource = new VectorTileSource({
    format: new MVT(),
    url: vectorTileUrl,
  });

  useEffect(() => {
    const vectorTileLayer = new VectorTileLayer({
      source: vectorTileSource
    });
    const map = new Map({
      layers: [vectorTileLayer],
      controls: [],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    map.setTarget(mapTargetElement.current || "")
    setMap(map)
    return () => map.setTarget("")

  }, []);

  return (
    <div
      ref={mapTargetElement}
      className="map"
      style={{ width: '100%', height: '170px' }}
    ></div>
  );
}

export default VectorTileLayerMap;
