import { useRef, useEffect } from "react";
import manager from "./scripts/map";
import MapContainer from "./components/MapContainer";
import FooterToolbar from "./components/FooterToolbar";
import LeftToolbar from "./components/LeftToolbar";
import RightToolbar from "./components/RightToolbar";
import { useAppStore, type AppStore } from "../../stores";
import { setupMapEventHandlers } from "../../libraries/events/map.event-handler";

function createMapContainerElement() {
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.tabIndex = 0;
    container.id = 'map-container';
    return container;
}

export default function Map() {
    /**
    * I need to store the reference to the map container element
    * so that I can clear child elements when the component unmounts
    */
   const ref = useRef<HTMLDivElement>(null);

   /**
    * Create a new map container element
    */
   const container = createMapContainerElement();

   const setMapInstance = useAppStore((state: AppStore) => state.map.setInstance);

   useEffect(() => {
      // Initialize map event handlers
      setupMapEventHandlers();

      if (ref.current === null) return;

      /**
       * Clear the container to avoid rendering the map multiple times
       */
      while (ref.current.firstChild) {
         ref.current.removeChild(ref.current.firstChild);
      }

      /**
       * Append the container to the ref
       */
      ref.current.appendChild(container);

      /**
       * Mount the map to the container
       */
      manager.mount(container);

      // Set the map instance once it's available
      const map = manager.map;

      if (map) {
         setMapInstance(map);
      }

      return () => {
         manager.unmount();
      };
   }, [setMapInstance]);

    return (
        <div className="w-full h-full flex flex-col">
            
            <div className="flex-1 flex flex-row">
                <LeftToolbar />
                <main className="flex-1">
                    <MapContainer ref={ref} />
                </main>
                <RightToolbar />
            </div>

            <FooterToolbar container={container} />
        </div>
    )
}

