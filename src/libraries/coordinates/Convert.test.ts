// write tests for the Convert class

import { describe, it, expect, vi } from 'vitest';
import Convert from './Convert';
import LatitudeLongitudeToDecimalDegrees from './LatitudeLongitudeToDecimalDegrees';

describe('Convert', () => {
    describe('latLngToDecimalDegrees', () => {
        it('should delegate to LatitudeLongitudeToDecimalDegrees', () => {
            // Create a mock for the convert method
            const mockConvert = vi.fn().mockReturnValue('37.7749° N, 122.4194° W');
            
            // Mock the entire class
            vi.spyOn(LatitudeLongitudeToDecimalDegrees.prototype, 'convert')
                .mockImplementation(mockConvert);
            
            // Call the method
            const result = Convert.latLngToDecimalDegrees(37.7749, -122.4194, 2);
            
            // Verify the convert method was called with the correct number of decimals
            expect(mockConvert).toHaveBeenCalledWith(2);
            expect(result).toBe('37.7749° N, 122.4194° W');
        });

        it('should pass coordinates in the correct order', () => {
            // Create a new instance to verify the order
            const instance = new LatitudeLongitudeToDecimalDegrees([-122.4194, 37.7749]);
            
            // Call the method
            const result = Convert.latLngToDecimalDegrees(37.7749, -122.4194);
            
            // The result should match what we'd get from the instance directly
            expect(result).toBe(instance.convert());
        });
    });
});
