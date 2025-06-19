abstract class Converter {

    protected readonly longitude: number;
    protected readonly latitude: number;

    /**
     * Creates a new instance of a coordinate converter
     * 
     * @param coordinates - Array of [longitude, latitude] in decimal degrees
     * @throws {Error} If coordinates are invalid or out of range
     */
    constructor(coordinates: [number, number]) {
        if (!Array.isArray(coordinates) || coordinates.length !== 2) {
            throw new Error('Coordinates must be an array of [longitude, latitude]');
        }

        const [longitude, latitude] = coordinates;

        if (typeof longitude !== 'number' || typeof latitude !== 'number') {
            throw new Error('Longitude and latitude must be numbers');
        }

        if (longitude < -180 || longitude > 180) {
            throw new Error('Longitude must be between -180 and 180 degrees');
        }

        if (latitude < -90 || latitude > 90) {
            throw new Error('Latitude must be between -90 and 90 degrees');
        }

        this.longitude = longitude;
        this.latitude = latitude;
    }
}

export default Converter;