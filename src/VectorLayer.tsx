import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import './index.css';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Icon, Style } from 'ol/style.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj.js';

function VectorLayerMap() {

  const mapTargetElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | undefined>()

  const vectorSource = new VectorSource({
    features: [
      new Feature({
        geometry: new Point(fromLonLat([-73.935242, 40.73061])),
      }),
    ],
  });

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      }),
    });

    const map = new Map({
      controls: [],
      layers: [vectorLayer],
      view: new View({
        center: fromLonLat([-73.935242, 40.73061]),
        zoom: 12,
      }),
    });

    map.setTarget(mapTargetElement.current || "")
    setMap(map)

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mapTargetElement}
      className="map"
      style={{ width: '100%', height: '170px' }}
    ></div>
  );
}

export default VectorLayerMap;