import proj4 from "proj4" ;
import Converter from "./Converter";

class LatitudeLongitudeToUtm extends Converter {
  // Define the source projection (WGS84)
  sourceProjection = "+proj=longlat +datum=WGS84 +no_defs";

  getUtmZone(): number {
    return Math.floor((this.longitude + 180) / 6) + 1;
  }

  getUtmProjectionString(): string {
    return `+proj=utm +zone=${this.getUtmZone()} +datum=WGS84 +units=m +no_defs`;
  }

  attemptConversion(): string {
    const utmCoordinates = proj4(
      this.sourceProjection,
      this.getUtmProjectionString(),
      [this.longitude, this.latitude]
    );

    // Extract the easting and northing from the UTM coordinates
    const easting = utmCoordinates[0];
    const northing = utmCoordinates[1];

    const utmGridString = `${this.getUtmZone()} ${this.getUtmLatitudeBand(
      this.latitude
    )} ${easting.toFixed(0)} ${northing.toFixed(0)}`;

    return utmGridString;
  }

  /**
   * @see https://www.maptools.com/tutorials/grid_zone_details
   */
  getUtmLatitudeBand(latitude: number): string {
    let band;
    if (latitude >= 72) {
      band = "X";
    } else if (latitude >= 64 && latitude < 72) {
      band = "W";
    } else if (latitude >= 56 && latitude < 64) {
      band = "V";
    } else if (latitude >= 48 && latitude < 56) {
      band = "U";
    } else if (latitude >= 40 && latitude < 48) {
      band = "T";
    } else if (latitude >= 32 && latitude < 40) {
      band = "S";
    } else if (latitude >= 24 && latitude < 32) {
      band = "R";
    } else if (latitude >= 16 && latitude < 24) {
      band = "Q";
    } else if (latitude >= 8 && latitude < 16) {
      band = "P";
    } else if (latitude >= 0 && latitude < 8) {
      band = "N";
    } else if (latitude >= -8 && latitude < 0) {
      band = "M";
    } else if (latitude >= -16 && latitude < -8) {
      band = "L";
    } else if (latitude >= -24 && latitude < -16) {
      band = "K";
    } else if (latitude >= -32 && latitude < -24) {
      band = "J";
    } else if (latitude >= -40 && latitude < -32) {
      band = "H";
    } else if (latitude >= -48 && latitude < -40) {
      band = "G";
    } else if (latitude >= -56 && latitude < -48) {
      band = "F";
    } else if (latitude >= -64 && latitude < -56) {
      band = "E";
    } else if (latitude >= -72 && latitude < -64) {
      band = "D";
    } else if (latitude < -72) {
      band = "C";
    } else {
      band = "U"; // Default band, is undefined - will need to document this somewhere
    }

    return band;
  }

  convert(asFormattedString: Boolean = true): string {
    let utm = "";

    try {
      utm = this.attemptConversion();
    } catch (error) {
      utm = "Invalid coordinates";
    }
    // if we want the formatted string, add spaces between the values
    if (!asFormattedString) {
      // remove spaces
      utm = utm.replace(/\s/g, "");
    }

    return utm;
  }
}

export default LatitudeLongitudeToUtm;
