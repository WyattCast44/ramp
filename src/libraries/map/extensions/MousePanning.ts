import Extension from "./Extension";

class MousePanning extends Extension {
  afterRender() {
    this.container?.addEventListener("mousedown", this.handleMouseDown.bind(this));
  }

  beforeUnmount() {
    this.container?.removeEventListener("mousedown", this.handleMouseDown);
  }

  handleMouseDown(event: MouseEvent) {
    if (event.button === 1) {
      event.preventDefault();

      const { clientX, clientY } = event;
      const { left, top } = this.map?.getViewport().getBoundingClientRect() || {
        x: 0,
        y: 0,
      };
      const x = clientX - (left || 0);
      const y = clientY - (top || 0);

      const [longitude, latitude] = this.map?.getCoordinateFromPixel([
        x,
        y,
      ]) || [0, 0];

      this.map?.getView().setCenter([longitude, latitude]);
    }
  }
}

export default MousePanning;
