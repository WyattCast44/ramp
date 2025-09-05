import OpenLayersBasemap from "../../../libraries/map/basemaps/OpenLayersBasemap";
import { Cartographer } from "../../../libraries/map/Cartographer";
import FlyToHome from "../../../libraries/map/extensions/FlyToHome";
import KeyboardPanning from "../../../libraries/map/extensions/KeyboardPanning";
import KeyboardZooming from "../../../libraries/map/extensions/KeyboardZooming";
import MousePanning from "../../../libraries/map/extensions/MousePanning";
import QueryStringState from "../../../libraries/map/extensions/QueryStringState";
import type Basemap from "../../../libraries/map/basemaps/Basemap";
import type Layer from "../../../libraries/map/layers/Layer";
import SatelliteBasemap from "../../../libraries/map/basemaps/SatelliteBasemap";
import HybridSatelliteBasemap from "../../../libraries/map/basemaps/HybridSatellite";
import TopoBasemap from "../../../libraries/map/basemaps/TopoBasemap";
import DebugLayer from "../../../libraries/map/layers/DebugLayer";
import RoadmapBasemap from "../../../libraries/map/basemaps/RoadmapBasemap";
import GoogleTrafficViewLayer from "../../../libraries/map/layers/GoogleTrafficViewLayer";
import GoogleStreetViewLayer from "../../../libraries/map/layers/GoogleStreetViewLayer";
import BullseyeLayer from "../../../libraries/map/layers/BullseyeLayer";

const manager = new Cartographer();

manager.init();

manager.extensions.register([
  new QueryStringState(manager),
  new KeyboardPanning(manager),
  new KeyboardZooming(manager),
  new MousePanning(manager),
  new FlyToHome(manager),
]);

manager.layers.register([
  new DebugLayer(manager),
  new GoogleTrafficViewLayer(manager),
  new GoogleStreetViewLayer(manager),
  new BullseyeLayer(manager),
]);

let basemaps = [
  new OpenLayersBasemap(manager),
  new SatelliteBasemap(manager),
  new TopoBasemap(manager),
  new RoadmapBasemap(manager),
  new HybridSatelliteBasemap(manager), // google maps
];

// filter the basemaps that are not available
basemaps = basemaps.filter((basemap) => basemap.shouldBeAvailable());

// this is the default basemap for now
basemaps[0].activate();

// i will need to figure out a way to activate the basemaps that are stored in the app state from local storage
// this is a future me problem

export { type Basemap, basemaps, type Layer, manager };

export default manager;
