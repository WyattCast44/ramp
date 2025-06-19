import type TileSource from "ol/source/Tile";
import { Cartographer } from "./../Cartographer";
import { getUid, Map as OpenLayersMap } from "ol";
import TileLayer from "ol/layer/Tile";
import type { Extent } from "ol/extent";
import WebGLTile from "ol/layer/WebGLTile";

abstract class Basemap {
    private id: string = getUid(this);

    private cartographer: Cartographer;
    private map: OpenLayersMap;
    public layer: TileLayer | WebGLTile | null = null;

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

    abstract getSource(): TileSource;

    public getLayer(): TileLayer|WebGLTile {
        if (this.layer) {
            return this.layer;
        }

        this.layer = new TileLayer({
            source: this.getSource(),
            className: this.getElementSelector(),
            preload: Infinity,
            extent: this.getExtent(),
        });

        this.layer.set('name', 'Basemap');
        this.layer.set('id', this.getId());
        this.layer.set('type', 'basemap');
        this.layer.set('description', this.getDescription());

        return this.layer;
    }

    public abstract getPreviewUrl(): string;

    public getId(): string {
        return this.id;
    }

    public getElementSelector(): string {
        return '.ol-basemap-layer-' + this.getId();
    }

    public getElement(): HTMLElement | null {
        return document.querySelector(this.getElementSelector());
    }    

    public activate(): void {
        if (this.isActivated) {
            return;
        }

        this.isActivated = true;

        this.map.addLayer(this.getLayer());

        this.afterActivate();
    }

    public deactivate(): void {
        if (!this.isActivated) {
            return;
        }

        this.isActivated = false;

        this.map.removeLayer(this.getLayer());
    }

    public afterActivate(): void {
        // do nothing by default
    }
}

export default Basemap;