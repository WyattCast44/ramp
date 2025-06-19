import DebugBasemap from "../../../libraries/map/basemaps/DebugBasemap";
import OpenLayersBasemap from "../../../libraries/map/basemaps/OpenLayersBasemap";
import { Cartographer } from "../../../libraries/map/Cartographer";
import FlyToHome from "../../../libraries/map/extensions/FlyToHome";
import KeyboardPanning from "../../../libraries/map/extensions/KeyboardPanning";
import KeyboardZooming from "../../../libraries/map/extensions/KeyboardZooming";
import MousePanning from "../../../libraries/map/extensions/MousePanning";
import QueryStringState from "../../../libraries/map/extensions/QueryStringState";
import type Basemap from "../../../libraries/map/basemaps/Basemap";
import SatelliteBasemap from "../../../libraries/map/basemaps/SatelliteBasemap";
import HybridSatelliteBasemap from "../../../libraries/map/basemaps/HybridSatellite";
import TopoBasemap from "../../../libraries/map/basemaps/TopoBasemap";  
const manager = new Cartographer();

manager.init();

manager.extensions.register([
    new QueryStringState(manager),
    new KeyboardPanning(manager),
    new KeyboardZooming(manager),
    new MousePanning(manager),
    new FlyToHome(manager),
]);

const basemaps = [
    new OpenLayersBasemap(manager),
    new SatelliteBasemap(manager),
    new TopoBasemap(manager),
    new HybridSatelliteBasemap(manager), // google maps
    new DebugBasemap(manager),
]

// this is the default basemap for now
basemaps[0].activate();

// i will need to figure out a way to activate the basemaps that are stored in the app state from local storage
// this is a future me problem

export { type Basemap, basemaps };

export default manager;
