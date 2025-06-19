import type { Cartographer } from "../Cartographer";
import OpenLayersMap from "ol/Map";

class Extension {
    /**
     * The name of the extension.
     */
    name: string;

    /**
     * The cartographer instance.
     */
    cartographer: Cartographer;

    /**
     * The map instance.
     */
    map: OpenLayersMap | null | undefined;

    /**
     * Whether or not this extension has been initialized.
     */
    initialized = false

    /**
     * The container element.
     */
    container: HTMLElement | null = null;

    constructor(cartographer: Cartographer) {
        this.name = this.constructor.name;
        this.cartographer = cartographer;
        this.map = cartographer.getMap();
        this.container = this.map?.getTargetElement() ?? null;
    }

    public init(): void {
        this.initialized = true;
    }

    public beforeMount(): void {
        //
    }

    public afterMount(): void {
        //
    }

    public beforeRender(): void {
        // 
    }

    public afterRender(): void {
        //
    }

    public beforeUnmount(): void {
        //
    }

    public afterUnmount(): void {
        //
    }
}

export default Extension;
