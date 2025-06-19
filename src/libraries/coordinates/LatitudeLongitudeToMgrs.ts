import { forward } from "mgrs";
import Converter from "./Converter";

class LatitudeLongitudeToMgrs extends Converter {
  convert(asFormattedString = true) {
    let mgrs = "";

    try {
      mgrs = String(forward([this.longitude, this.latitude]));

      mgrs =
        mgrs.slice(0, 3) +
        " " +
        mgrs.slice(3, 5) +
        " " +
        mgrs.slice(5, 10) +
        " " +
        mgrs.slice(10, 15);
    } catch (error) {
      return "Invalid coordinates";
    }

    if (!asFormattedString) {
      // strip spaces from MGRS string
      mgrs = mgrs.replace(/\s/g, "");
    }

    return mgrs;
  }
}

export default LatitudeLongitudeToMgrs;
