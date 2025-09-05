import { add } from 'ol/coordinate.js';
import Extension from './Extension';
import type { Cartographer } from '../Cartographer';

class KeyboardPanning extends Extension {
   RIGHT = false;
   LEFT = false;
   UP = false;
   DOWN = false;

   constructor(cartographer: Cartographer) {
      super(cartographer);

      this.RIGHT = false;
      this.LEFT = false;
      this.UP = false;
      this.DOWN = false;
   }

   __getCurrentCenter() {
      return this.map?.getView()?.getCenter();
   }

   afterRender() {
      let c = this.getContainer();
      c?.addEventListener('keydown', this.handleKeyDown.bind(this));
      c?.addEventListener('keyup', this.handleKeyUp.bind(this));
   }

   beforeUnmount() {
      let c = this.getContainer();
      c?.removeEventListener('keydown', this.handleKeyDown);
      c?.removeEventListener('keyup', this.handleKeyUp);
   }

   handleKeyUp(event: KeyboardEvent) {
      const arrowKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

      if (!arrowKeys.includes(event.key)) {
         return;
      }

      if (event.key === 'ArrowRight') {
         this.RIGHT = false;
      }

      if (event.key === 'ArrowLeft') {
         this.LEFT = false;
      }

      if (event.key === 'ArrowUp') {
         this.UP = false;
      }

      if (event.key === 'ArrowDown') {
         this.DOWN = false;
      }
   }

   handleKeyDown(event: KeyboardEvent) {
      // we want to pan the map fluidly, so we need to
      // determine if we are moving in one direction
      // or a combination of directions, for example,
      // if we are pressinng right and up, then we need to
      // move right and up at the same time

      const arrowKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

      // if the key is not an arrow key, then we don't need to do anything
      if (!arrowKeys.includes(event.key)) {
         return;
      }

      // if the shift key is pressed, then we don't need to do anything
      if (event.shiftKey) {
         return;
      }

      if (event.key === 'ArrowRight') {
         this.RIGHT = true;
      }

      if (event.key === 'ArrowLeft') {
         this.LEFT = true;
      }

      if (event.key === 'ArrowUp') {
         this.UP = true;
      }

      if (event.key === 'ArrowDown') {
         this.DOWN = true;
      }

      this.__move();
   }

   __move() {
      let center = this.map?.getView()?.getCenter() ?? [0, 0];
      let zoom = this.map?.getView()?.getZoom() ?? 0;
      let delta = this.getScaledDeltaFromZoom(zoom);

      if (this.RIGHT) {
         center = add(center, [delta, 0]);
      }

      if (this.LEFT) {
         center = add(center, [-delta, 0]);
      }

      if (this.UP) {
         center = add(center, [0, delta]);
      }

      if (this.DOWN) {
         center = add(center, [0, -delta]);
      }

      // now we want to animate the map to the new center
      this.map?.getView()?.animate({
         center: center,
         duration: 100,
      });
   }

   /**
    * Get a scaled lat/long delta based on the current zoom level
    */
   getScaledDeltaFromZoom(zoom: number): number {
      let baseDelta = 25;
      let scaledDelta = baseDelta * (1 / zoom);

      if (zoom === 0) {
         zoom = 1;
      }

      if (zoom > 7) {
         scaledDelta = scaledDelta * (1 / 10);
      }

      if (zoom > 10) {
         scaledDelta = scaledDelta * (1 / 10);
      }

      if (zoom > 15) {
         scaledDelta = scaledDelta * (1 / 10);
      }

      return scaledDelta;
   }
}

export default KeyboardPanning;
