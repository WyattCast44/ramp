import TileDebug from "ol/source/TileDebug";
import type TileSource from "ol/source/Tile";
import Layer from "./Layer";

class DebugLayer extends Layer {
    
    public getLabel(): string {
        return 'Debugging Layer';
    }

    public getDescription(): string {
        return 'A grid of labeled squares, useful for debugging.';
    }

    public getPreviewUrl(): string {
        return 'maps/debug.png';
    }

    public getSources(): TileSource[] {
        return [new TileDebug()];
    }

    public afterActivate(): void {
        this.getLayers().forEach(layer => {
            layer.setZIndex(1000);
        });
    }
}

export default DebugLayer;