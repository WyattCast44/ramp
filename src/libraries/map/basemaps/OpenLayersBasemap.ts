import TileSource from "ol/source/Tile";
import type { Cartographer } from "../Cartographer";
import Basemap from "./Basemap";
import { OSM } from "ol/source";

class OpenLayersBasemap extends Basemap {
    constructor(cartographer: Cartographer) {
        super(cartographer);
    }

    public getLabel(): string {
        return 'OpenStreetMap (OSM)';
    }

    public getDescription(): string {
        return 'An OpenStreetMap basemap, useful for general purpose mapping.';
    }

    public getPreviewUrl(): string {
        return 'maps/osm.png';
    }

    public getSource(): TileSource {
        return new OSM();
    }
}

export default OpenLayersBasemap;