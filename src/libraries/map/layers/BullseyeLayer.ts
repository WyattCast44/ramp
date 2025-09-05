import type TileSource from "ol/source/Tile";
import Layer from "./Layer";
import { TileDebug } from "ol/source";
import TileLayer from "ol/layer/Tile";

class BullseyeLayer extends Layer {
    
    public getLabel(): string {
        return 'Bullseye(s) Layer';
    }

    public getDescription(): string {
        return 'Bullseye(s) layer.';
    }

    public getPreviewUrl(): string {
        return 'maps/hybrid.png';
    }

    public getSources(): TileSource[] {
        return [
            new TileDebug({
                color: 'transparent',
            })
        ];
    }

    public getLayers(): TileLayer[] {
        let layers = super.getLayers();

        layers.forEach(layer => {
            layer.setOpacity(0);
        });

        return layers;
    }

    public afterActivate(): void {
        let selector = "ol-bullseye-container";

        let bullseyes = document.querySelectorAll(selector) as NodeListOf<Element>;

        bullseyes.forEach((bullseye: Element) => {
            bullseye.classList.add("block");
            bullseye.classList.remove("hidden");
        });

        console.log(bullseyes);
    }

    public afterDeactivate(): void {
        let selector = "ol-bullseye-container";

        let bullseyes = document.querySelectorAll(selector) as NodeListOf<Element>;

        bullseyes.forEach((bullseye: Element) => {
            bullseye.classList.add("hidden");
            bullseye.classList.remove("block");
        });

        console.log(bullseyes);
    }
}

export default BullseyeLayer;