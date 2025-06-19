import { describe, it, expect } from 'vitest';
import { guessCoordinateType } from './index';

describe('guessCoordinateType', () => {
   it('should return "unknown" for an empty string', () => {
      expect(guessCoordinateType('')).toBe('unknown');
   });

   it('should return "unknown" for null input', () => {
      expect(guessCoordinateType(null as unknown as string)).toBe('unknown');
   });

   it('should return "unknown" for non-string input', () => {
      expect(guessCoordinateType(123 as unknown as string)).toBe('unknown');
   });

   it('should return "latlng" for a string containing a comma', () => {
      expect(guessCoordinateType('123.456,-78.90')).toBe('latlng');
   });

   it('should return "unknown" for a string of arbitrary length without comma', () => {
      expect(guessCoordinateType('abcdefghij')).toBe('unknown');
   });

   it('should ignore leading and trailing spaces', () => {
      expect(guessCoordinateType('  4Q FJ 12345 67890  ')).toBe('mgrs');
   });

   it('should ignore spaces within the string', () => {
      expect(guessCoordinateType('4Q FJ 12345 67890')).toBe('mgrs');
      expect(guessCoordinateType('17N 630084 4833438')).toBe('utm');
   });

   it('should return mgrs for these known mgrs strings', () => {
      const known = ['4Q FJ 12345 67890'];

      const notMGRS = ['17N 630084 4833438'];

      known.forEach((str) => {
         expect(guessCoordinateType(str)).toBe('mgrs');
      });

      notMGRS.forEach((str) => {
         expect(guessCoordinateType(str)).not.toBe('mgrs');
      });
   });
});
