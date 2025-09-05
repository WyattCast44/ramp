import type TileSource from "ol/source/Tile";
import Layer from "./Layer";
import { Google } from "ol/source";

class GoogleStreetViewLayer extends Layer {
    
    public getLabel(): string {
        return 'Google Street View';
    }

    public getDescription(): string {
        return 'Google Street View.';
    }

    public getPreviewUrl(): string {
        return 'maps/hybrid.png';
    }

    public getSources(): TileSource[] {

        return [new Google({
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            scale: 'scaleFactor2x',
            highDpi: true,
            mapType: 'satellite',
            layerTypes: ['layerStreetview'],
            overlay: true,
        })];
    }
}

export default GoogleStreetViewLayer;