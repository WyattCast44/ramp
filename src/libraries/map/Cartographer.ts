import "ol/ol.css";
import View from "ol/View";
import { getUid } from "ol/util";
import OpenLayersMap from "ol/Map";
import { useGeographic } from "ol/proj";
import { defaults as defaultInteractions } from "ol/interaction/defaults";
import Extensions from "./extensions/Extensions";
import Manager from "./layers/Manager";

interface CartographerOptions {
  id?: string;
}

class Cartographer {
  /**
   * The options for the Cartographer.
   */
  options: CartographerOptions;

  /**
   * The extensions of the Cartographer.
   */
  extensions: Extensions;

  /**
   * The id of the Cartographer.
   */
  id: string;

  /**
   * The view of the Cartographer.
   */
  view?: View | null;

  /**
   * The map of the Cartographer.
   */
  map?: OpenLayersMap | null;

  /**
   * The container of the Cartographer.
   */
  container?: HTMLElement | null;

  /**
   * The initialized state of the Cartographer.
   */
  initialized: boolean = false;

  /**
   * The mounted state of the Cartographer.
   */
  mounted: boolean = false;

  /**
   * The layers manager for the Cartographer.
   */
  layers: Manager;

  constructor(options: CartographerOptions = {}) {
    this.options = options;
    this.extensions = new Extensions();
    this.layers = new Manager();
    this.id = options.id || getUid(this);
  }

  /**
   * Initialize the openlayers map and all registred extensions.
   *
   * @returns void
   */
  public init(): void {
    if (this.initialized) return;

    this.initializeOpenLayersMap();

    this.initialized = true;
  }

  /**
   * Mount the cartographer instance to the given container.
   *
   * @param {HTMLElement} container
   * @returns void
   */
  public mount(container: HTMLElement) {
    if (!this.initialized) {
      this.init();
    }

    this.extensions.initExtensions();

    if (this.mounted) return;

    this.container = container;
    this.container.setAttribute("id", this.id);
    this.container.setAttribute("data-cartographer", "true");
    this.container.setAttribute("data-cartographer-id", this.id);

    if (!this.map) return;

    this.extensions.callExtensionMethodIfExists("beforeMount");

    this.map.once("loadstart", () => {
      this.extensions.callExtensionMethodIfExists("beforeRender");
    });

    this.map.setTarget(container);

    this.extensions.callExtensionMethodIfExists("afterMount");

    this.map.once("rendercomplete", () => {
      this.extensions.callExtensionMethodIfExists("afterRender");
    });
  }

  /**
   * Unmount the cartographer instance from the given container.
   *
   * @returns void
   */
  public unmount() {
    this.extensions.callExtensionMethodIfExists("beforeUnmount");
    this.map?.setTarget(undefined);
    this.extensions.callExtensionMethodIfExists("afterUnmount");
    this.mounted = false;
    this.initialized = false;
    this.container = undefined;
  }

  public getMap(): OpenLayersMap | null | undefined {
    return this.map;
  }

  public getView(): View | null | undefined {
    return this.view;
  }

  public getContainer(): HTMLElement | null | undefined {
    return this.container;
  }

  /**
   * Initialize the map instance.
   */
  private initializeOpenLayersMap(): void {
    if (this.map) return;

    useGeographic();

    this.view = new View({
      center: [0, 0],
      zoom: 3,
      multiWorld: false,
    });

    this.map = new OpenLayersMap({
      view: this.view,
      controls: [],
      interactions: defaultInteractions({
        doubleClickZoom: false,
        keyboard: false,
      }),
      layers: [],
    });
  }
}

export { type CartographerOptions, Cartographer };
