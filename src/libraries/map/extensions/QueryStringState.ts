import Extension from "./Extension";
import Link from 'ol/interaction/Link.js';

class QueryStringState extends Extension {

  private link: Link | null = null;

  afterMount() {
    this.link = new Link({
      params: [
        'x',
        'y',
        'z',
        'r',
      ],
      replace: true,
    });

    this.map?.addInteraction(this.link);
  }

  beforeUnmount() {
    if (this.link) {
      this.map?.removeInteraction(this.link);
    }
  }
}

export default QueryStringState;
