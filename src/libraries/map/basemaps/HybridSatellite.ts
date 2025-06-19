import { Google } from "ol/source";
import type { Cartographer } from "../Cartographer";
import Basemap from "./Basemap";
import type TileSource from "ol/source/Tile";

class HybridSatelliteBasemap extends Basemap {
    constructor(cartographer: Cartographer) {
        super(cartographer);
    }

    public getLabel(): string {
        return 'Hybrid Satellite Imagery';
    }

    public getDescription(): string {
        return 'Hybrid satellite imagery.';
    }

    public getPreviewUrl(): string {
        return 'maps/satellite.png';
    }

    public getSource(): TileSource {
        return new Google({
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            scale: 'scaleFactor2x',
            highDpi: true,
            mapType: 'roadmap',
        })
    }
}

export default HybridSatelliteBasemap;