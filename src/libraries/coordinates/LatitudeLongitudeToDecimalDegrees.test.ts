import { describe, it, expect } from 'vitest';
import LatitudeLongitudeToDecimalDegrees from './LatitudeLongitudeToDecimalDegrees';

describe('LatitudeLongitudeToDecimalDegrees', () => {
    describe('constructor', () => {
        it('should create instance with valid coordinates', () => {
            const coordinates = new LatitudeLongitudeToDecimalDegrees([-122.4194, 37.7749]);
            expect(coordinates).toBeInstanceOf(LatitudeLongitudeToDecimalDegrees);
        });

        it('should throw error for invalid array length', () => {
            expect(() => new LatitudeLongitudeToDecimalDegrees([-122.4194] as any)).toThrow(
                'Coordinates must be an array of [longitude, latitude]'
            );
            expect(() => new LatitudeLongitudeToDecimalDegrees([-122.4194, 37.7749, 0] as any)).toThrow(
                'Coordinates must be an array of [longitude, latitude]'
            );
        });

        it('should throw error for non-number coordinates', () => {
            expect(() => new LatitudeLongitudeToDecimalDegrees(['-122.4194', 37.7749] as any)).toThrow(
                'Longitude and latitude must be numbers'
            );
            expect(() => new LatitudeLongitudeToDecimalDegrees([-122.4194, '37.7749'] as any)).toThrow(
                'Longitude and latitude must be numbers'
            );
        });

        it('should throw error for out of range longitude', () => {
            expect(() => new LatitudeLongitudeToDecimalDegrees([-181, 37.7749])).toThrow(
                'Longitude must be between -180 and 180 degrees'
            );
            expect(() => new LatitudeLongitudeToDecimalDegrees([181, 37.7749])).toThrow(
                'Longitude must be between -180 and 180 degrees'
            );
        });

        it('should throw error for out of range latitude', () => {
            expect(() => new LatitudeLongitudeToDecimalDegrees([-122.4194, -91])).toThrow(
                'Latitude must be between -90 and 90 degrees'
            );
            expect(() => new LatitudeLongitudeToDecimalDegrees([-122.4194, 91])).toThrow(
                'Latitude must be between -90 and 90 degrees'
            );
        });
    });

    describe('convert', () => {
        it('should format coordinates with default 4 decimal places', () => {
            const coordinates = new LatitudeLongitudeToDecimalDegrees([-122.4194, 37.7749]);
            expect(coordinates.convert()).toBe('37.7749° N, 122.4194° W');
        });

        it('should format coordinates with specified decimal places', () => {
            const coordinates = new LatitudeLongitudeToDecimalDegrees([-122.4194, 37.7749]);
            expect(coordinates.convert(2)).toBe('37.77° N, 122.42° W');
            expect(coordinates.convert(6)).toBe('37.774900° N, 122.419400° W');
        });

        it('should add leading zero for values less than 10', () => {
            const coordinates = new LatitudeLongitudeToDecimalDegrees([-9.1234, 5.6789]);
            expect(coordinates.convert()).toBe('05.6789° N, 09.1234° W');
        });

        it('should handle negative coordinates correctly', () => {
            const coordinates = new LatitudeLongitudeToDecimalDegrees([-122.4194, -37.7749]);
            expect(coordinates.convert()).toBe('37.7749° S, 122.4194° W');
        });

        it('should handle zero coordinates', () => {
            const coordinates = new LatitudeLongitudeToDecimalDegrees([0, 0]);
            expect(coordinates.convert()).toBe('00.0000° N, 00.0000° E');
        });

        it('should handle coordinates at the boundaries', () => {
            const coordinates = new LatitudeLongitudeToDecimalDegrees([180, 90]);
            expect(coordinates.convert()).toBe('90.0000° N, 180.0000° E');

            const coordinates2 = new LatitudeLongitudeToDecimalDegrees([-180, -90]);
            expect(coordinates2.convert()).toBe('90.0000° S, 180.0000° W');
        });
    });
});
