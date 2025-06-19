import type { Cartographer } from "../Cartographer";
import Basemap from "./Basemap";
import type TileSource from "ol/source/Tile";
import XYZ from "ol/source/XYZ";

class SatelliteBasemap extends Basemap {
    constructor(cartographer: Cartographer) {
        super(cartographer);
    }

    public getLabel(): string {
        return 'Satellite Imagery';
    }

    public getDescription(): string {
        return 'Satellite imagery from the USGS.';
    }

    public getPreviewUrl(): string {
        return 'maps/satellite.png';
    }

    public getSource(): TileSource {
        return new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            crossOrigin: 'anonymous',
         });
    }
}

export default SatelliteBasemap;