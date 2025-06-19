/**
 * Supported coordinate system types
 */
export type CoordinateType = 'latlng' | 'mgrs' | 'utm' | 'dd' | 'dms';

export enum CoordinateTypeEnum {
    LATLNG = 'latlng',
    MGRS = 'mgrs',
    UTM = 'utm',
    DD = 'dd',
    DMS = 'dms'
}

/**
 * Regular expressions for different coordinate formats
 */
const COORDINATE_PATTERNS = {
    LATLNG: /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
    MGRS: /^[0-9]{1,2}[C-HJ-NP-X][A-Z]{2}[0-9]{10}$/,
    UTM: /^[0-9]{1,2}[C-HJ-NP-X]\d{6}\d{7}$/,
    DD: /^[0-9]{1,2}\.[0-9]{1,2}$/,
    DMS: /^[0-9]{1,2}\s[0-9]{1,2}\s[0-9]{1,2}$/
} as const;

/**
 * Guesses the type of coordinate system based on the content of the string.
 * Supports:
 * - Latitude/Longitude (e.g. "45.123,-122.456")
 * - MGRS (Military Grid Reference System)
 * - UTM (Universal Transverse Mercator)
 * - Decimal Degrees (e.g. "45.123° N, 122.456° E")
 *
 * @see https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system#Definitions
 * @see https://en.wikipedia.org/wiki/Military_Grid_Reference_System
 *
 * @param coordinate - The coordinate string to analyze
 * @returns The detected coordinate type
 */
export function guessCoordinateType(coordinate: string): CoordinateType {
    if (!coordinate || typeof coordinate !== 'string') {
        return 'dd'; // Default to decimal degrees
    }

    const trimmedCoordinate = coordinate.trim().replace(/\s+/g, '');

    if (COORDINATE_PATTERNS.LATLNG.test(trimmedCoordinate)) {
        return 'latlng';
    }

    if (COORDINATE_PATTERNS.MGRS.test(trimmedCoordinate)) {
        return 'mgrs';
    }

    if (COORDINATE_PATTERNS.UTM.test(trimmedCoordinate)) {
        return 'utm';
    }

    if (COORDINATE_PATTERNS.DD.test(trimmedCoordinate)) {
        return 'dd';
    }

    if (COORDINATE_PATTERNS.DMS.test(trimmedCoordinate)) {
        return 'dms';
    }

    return 'dd'; // Default to decimal degrees
}

/**
 * Formats with examples
 */
export const formatsWithExamples = [
    {
       name: 'Lat/Long',
       example: '38.724° N 95.032° E',
       code: 'latlng',
    },
    {
       name: 'MGRS',
       example: '15S UC 64498 89743',
       code: 'mgrs',
    },
    {
       name: 'Decimal Degrees',
       example: '38.724° N 95.032° E',
       code: 'dd',
    },
    {
       name: 'UTM',
       example: '14 S 732810 4238821',
       code: 'utm',
    },
    {
       name: 'DMS',
       example: '38° 43′ 26.4″ N 95° 1′ 55.2″ E',
       code: 'dms',
    },
 ];
 