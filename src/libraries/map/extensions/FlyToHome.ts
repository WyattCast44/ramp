import Extension from './Extension';
import type { Cartographer } from '../Cartographer';
import { MapEventType, createMapEventListener, dispatchMapEvent } from "../../../libraries/events/map.events";

class FlyToHome extends Extension {
   private unsubscribe: (() => void)[] = [];

   private home: {
      center: [number, number];
      zoom: number;
      rotation: number;
   } = {
      center: [0, 0],
      zoom: 3.5,
      rotation: 0,
   }

   constructor(cartographer: Cartographer) {
      super(cartographer);
   }

   afterRender() {
      this.unsubscribe.push(
         createMapEventListener(MapEventType.FLY_TO_HOME, () => {
            this.flyToHome();
         })
      );

      this.unsubscribe.push(
         createMapEventListener(MapEventType.SET_HOME, () => {
            this.setHome();
         })
      );

      this.unsubscribe.push(
         createMapEventListener(MapEventType.RESET_HOME, () => {
            this.resetHome();
         })
      );

      this.map?.on("pointermove", (event) => {
         dispatchMapEvent({ type: MapEventType.POINTER_MOVE, payload: event });
      });
   }

   private setHome() {
      const center = this.map?.getView().getCenter();
      const zoom = this.map?.getView().getZoom();

      if (center && zoom) {
         this.home.center = [center[0], center[1]];
         this.home.zoom = zoom; 
         this.home.rotation = this.map?.getView().getRotation() ?? 0;
      }
   }

   private resetHome() {
      this.home = {
         center: [0, 0],
         zoom: 3.5,
         rotation: 0,
      }
   }

   private flyToHome() {
      this.map?.getView().animate(this.home, {
         duration: 1000
      });
   }

   beforeUnmount() {
      this.unsubscribe.forEach(unsub => unsub());
   }
}

export default FlyToHome;
