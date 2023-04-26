import TyleLayerMap from "./TyleLayer";
import ImageLayerMap from "./ImageLayer";
import VectorLayerMap from "./VectorLayer";
import VectorImageLayerMap from "./VectorImageLayer";
import VectorTileLayerMap from "./VectorTileLayer";
import WebGLTile from "./WebGLTile";

function App() {

  return (
    <div className="app">

      <div>
        <h1>1) Tyle layer</h1>
        <TyleLayerMap />
      </div>

      <div>
        <h1>2) Image layer</h1>
        <ImageLayerMap />
      </div>

      <div>
        <h1>3) Vector Layer</h1>
        <VectorLayerMap />
      </div>

      <div >
        <h1>4) Vector Image Layer</h1>
        <VectorImageLayerMap />
      </div>

      <div >
        <h1>5) Vector tyle Layer</h1>
        <VectorTileLayerMap />
      </div>

      <div >
        <h1>6) WebGL tyle Layer</h1>
        <WebGLTile />
      </div>

    </div>
  )
}
export default App;  