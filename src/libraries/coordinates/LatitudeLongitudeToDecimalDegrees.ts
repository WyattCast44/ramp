import Converter from "./Converter";

/**
 * Converts decimal degree coordinates to a formatted string representation
 * with cardinal directions (N/S, E/W).
 */
export default class LatitudeLongitudeToDecimalDegrees extends Converter {
  /**
   * Converts the coordinates to a formatted string with cardinal directions
   * @param numberOfDecimals - Number of decimal places to display (default: 4)
   * @returns Formatted string in the format "DD° N/S, DD° E/W"
   */
  convert(numberOfDecimals: number = 4): string {
    const formatCoordinate = (value: number): string => {
      const absValue = Math.abs(value);
      const formatted = absValue.toFixed(numberOfDecimals);
      return absValue < 10 ? `0${formatted}` : formatted;
    };

    const cardinalDirections = {
      latitude: this.latitude >= 0 ? "N" : "S",
      longitude: this.longitude >= 0 ? "E" : "W",
    };

    const lat = formatCoordinate(this.latitude);
    const long = formatCoordinate(this.longitude);

    return `${lat}° ${cardinalDirections.latitude}, ${long}° ${cardinalDirections.longitude}`;
  }
}
