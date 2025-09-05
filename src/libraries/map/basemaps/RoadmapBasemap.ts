import { Google } from "ol/source";
import type { Cartographer } from "../Cartographer";
import Basemap from "./Basemap";
import type TileSource from "ol/source/Tile";

class RoadmapBasemap extends Basemap {
    constructor(cartographer: Cartographer) {
        super(cartographer);
    }

    public getLabel(): string {
        return 'Google Roads Basemap';
    }

    public getDescription(): string {
        return 'Google Roads Basemap.';
    }

    public getPreviewUrl(): string {
        return 'maps/roadmap.png';
    }

    public shouldBeAvailable(): boolean {
        return import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== undefined && import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== '';
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

export default RoadmapBasemap;