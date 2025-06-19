import { XYZ } from "ol/source";
import type { Cartographer } from "../Cartographer";
import Basemap from "./Basemap";
import type TileSource from "ol/source/Tile";

class TopoBasemap extends Basemap {
    constructor(cartographer: Cartographer) {
        super(cartographer);
    }

    public getLabel(): string {
        return 'Topographic Basemap';
    }

    public getDescription(): string {
        return 'Topographic Basemap.';
    }

    public getPreviewUrl(): string {
        return 'maps/topo.png';
    }

    public getSource(): TileSource {
        return new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            crossOrigin: 'anonymous',
        })         
    }
}

export default TopoBasemap;