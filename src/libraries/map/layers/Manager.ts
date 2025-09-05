import type TileLayer from "ol/layer/Tile";
import type Layer from "./Layer";

class Manager 
{
    private layers = new Map();

    public register(layers: Layer[]): void {
        layers.forEach(layer => {
            this.layers.set(layer.getId(), layer);
        });
    }

    public getLayers(): Layer[] {
        return Array.from(this.layers.values());
    }

    public getLayersInRenderingOrder(): Layer[] {
        let layers = Array.from(this.layers.values());

        layers.forEach(layer => {
            layer.getLayers().forEach((layer: TileLayer) => {
                console.log(layer.getZIndex(), layer.getOpacity());
            });
        });

        return Array.from(this.layers.values()).sort(function(a, b) {
            return a.getLayers()[0].getZIndex() - b.getLayers()[0].getZIndex() || 0;
        });
    }

    public moveLayerUp(layer: Layer): void {
        const index = this.layers.get(layer.getId());
        if (index) {
            this.layers.set(layer.getId(), index - 1);
        }
    }

    public moveLayerDown(layer: Layer): void {
        const index = this.layers.get(layer.getId());
        if (index) {
            this.layers.set(layer.getId(), index + 1);
        }
    }
}

export default Manager;