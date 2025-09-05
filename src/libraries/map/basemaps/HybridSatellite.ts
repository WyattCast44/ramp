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
        return 'maps/hybrid.png';
    }

    public shouldBeAvailable(): boolean {
        return import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== undefined && import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== '';
    }

    public getSource(): TileSource {
        return new Google({
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            scale: 'scaleFactor2x',
            highDpi: true,
            mapType: 'satellite',
            layerTypes: ['layerRoadmap']
        })
    }
}

export default HybridSatelliteBasemap;