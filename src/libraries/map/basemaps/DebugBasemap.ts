import TileDebug from "ol/source/TileDebug";
import type { Cartographer } from "../Cartographer";
import Basemap from "./Basemap";
import type TileSource from "ol/source/Tile";

class DebugBasemap extends Basemap {
    constructor(cartographer: Cartographer) {
        super(cartographer);
    }

    public getLabel(): string {
        return 'Debugging Basemap';
    }

    public getDescription(): string {
        return 'A grid of labeled tiles, useful for debugging.';
    }

    public getPreviewUrl(): string {
        return 'maps/debug.png';
    }

    public getSource(): TileSource {
        return new TileDebug();
    }

    public afterActivate(): void {
        // we want to move this layer to the top of the stack b/c it's a debug layer
        this.getLayer().setZIndex(1000);
    }
}

export default DebugBasemap;