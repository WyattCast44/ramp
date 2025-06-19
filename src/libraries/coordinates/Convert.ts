import LatitudeLongitudeToDecimalDegrees from './LatitudeLongitudeToDecimalDegrees';
import LatitudeLongitudeToDMS from './LatitudeLongitudeToDMS';
import LatitudeLongitudeToMgrs from './LatitudeLongitudeToMgrs';
import LatitudeLongitudeToUtm from './LatitudeLongitudeToUtm';

export default class Convert {
   static latLngToDecimalDegrees(latitude: number, longitude: number, numberOfDecimals = 4): string {
      return new LatitudeLongitudeToDecimalDegrees([
         longitude,
         latitude,
      ]).convert(numberOfDecimals);
   }

   static latLngToMGRS(latitude: number, longitude: number): string {
      return new LatitudeLongitudeToMgrs([
         longitude,
         latitude,
      ]).convert();
   }

   static latLngToUtm(latitude: number, longitude: number): string {
      return new LatitudeLongitudeToUtm([
         longitude,
         latitude,
      ]).convert();
   }

   static latLngToDMS(latitude: number, longitude: number): string {
      return new LatitudeLongitudeToDMS([
         longitude,
         latitude,
      ]).convert();
   }
}