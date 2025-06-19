import Extension from './Extension';
import type { Cartographer } from '../Cartographer';

class KeyboardZoom extends Extension {
   CTRL = false;

   constructor(cartographer: Cartographer) {
      super(cartographer);

      this.CTRL = false;
   }

   afterRender() {
      this.container = this.map?.getTargetElement() ?? null;
      this.container?.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.container?.addEventListener('keyup', this.handleKeyUp.bind(this));
   }

   beforeUnmount() {
      this.container?.removeEventListener('keydown', this.handleKeyDown);
      this.container?.removeEventListener('keyup', this.handleKeyUp);
   }

   handleKeyUp(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey) {
         this.CTRL = false;
      }
   }

   handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey) {
         this.CTRL = true;
      }

      if (this.CTRL) {
         if (event.key === 'ArrowUp') {
            this.map?.getView()?.adjustZoom(1);
         }

         if (event.key === 'ArrowDown') {
            this.map?.getView()?.adjustZoom(-1);
         }
      }
   }
}

export default KeyboardZoom;
