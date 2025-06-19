import Converter from "./Converter";


export default class LatitudeLongitudeToDMS extends Converter {
  /**
   * @returns Formatted string in the format "34° 49′ 14.0447″ N, 119° 32′ 02.3877″ W"
   */
  convert(): string {
    let latitude = this.toDegreesMinutesAndSeconds(this.latitude);
    let longitude = this.toDegreesMinutesAndSeconds(this.longitude);

    let latitudeCardinal = this.latitude >= 0 ? "N" : "S";
    let longitudeCardinal = this.longitude >= 0 ? "E" : "W";

    return latitude + " " + latitudeCardinal + " " + longitude + " " + longitudeCardinal;
  }

  toDegreesMinutesAndSeconds(coordinate: number): string {
    let absolute = Math.abs(coordinate);
    let degrees = Math.floor(absolute);
    let minutesNotTruncated = (absolute - degrees) * 60;
    let minutes = Math.floor(minutesNotTruncated);
    let seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    // make sure that all digits are at least 2 digits
    const degreesStr = degrees.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return degreesStr + "° " + minutesStr + "′ " + secondsStr + "″";
  }
}