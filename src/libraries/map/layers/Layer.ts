import type { Cartographer } from "../Cartographer";
import OpenLayersMap from "ol/Map";
import { getUid } from "ol/util";
import TileLayer from "ol/layer/Tile";
import type { Extent } from "ol/extent";
import type TileSource from "ol/source/Tile";

abstract class Layer {
    private id: string = getUid(this);

    private cartographer: Cartographer;
    private map: OpenLayersMap;
    public layers: TileLayer[] | null = null;

    public shown: boolean = true;
    public isActivated: boolean = false;

    constructor(cartographer: Cartographer) {
        this.cartographer = cartographer;
        this.map = this.cartographer.getMap() as OpenLayersMap;
    }

    abstract getLabel(): string;

    abstract getDescription(): string;

    public getMap(): OpenLayersMap {
        return this.map;
    }

    public getExtent(): Extent {
        return [-180, -90, 180, 90];
    }

    public getId(): string {
        return this.id;
    }

    public isActive(): boolean {
        return this.isActivated;
    }

    public abstract getPreviewUrl(): string;

    public getElementSelector(): string {
        return '.ol-layer-' + this.getId();
    }

    public getElement(): HTMLElement | null {
        return document.querySelector(this.getElementSelector());
    }    

    abstract getSources(): TileSource[];

    public getLayers(): TileLayer[] {
        if (this.layers) {
            return this.layers;
        }

        this.layers = [];

        this.getSources().forEach(source => {
            this.layers!.push(new TileLayer({
                source: source,
                className: this.getElementSelector(),
                preload: Infinity,
                extent: this.getExtent(),
            }));
        });

        return this.layers;
    }

    public activate(): void {
        if (this.isActivated) {
            return;
        }

        this.isActivated = true;

        this.getLayers().forEach(layer => {
            this.map.addLayer(layer);
        });

        this.afterActivate();
    }

    public deactivate(): void {
        if (!this.isActive()) {
            return;
        }

        this.isActivated = false;

        this.getLayers().forEach(layer => {
            this.map.removeLayer(layer);
        });

        this.afterDeactivate();
    }

    public afterActivate(): void {
        // do nothing by default
    }

    public afterDeactivate(): void {
        // do nothing by default
    }

    public setOpacity(opacity: number): void {
        if (this.layers) {
            this.layers.forEach(layer => {
                layer.setOpacity(opacity);
            });
        }
    }

    public getOpacity(): number {
        if (this.layers && this.layers.length > 0) {
            return this.layers[0].getOpacity();
        }
        return 1;
    }

    public setZIndex(zIndex: number): void {
        if (this.layers) {
            this.layers.forEach(layer => {
                layer.setZIndex(zIndex);
            });
        }
    }

    public getZIndex(): number {
        if (this.layers && this.layers.length > 0) {
            return this.layers[0].getZIndex() || 0;
        }
        return 0;
    }
}

export default Layer;