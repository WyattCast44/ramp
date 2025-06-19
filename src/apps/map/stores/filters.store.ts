import { z } from "zod";
import { createValidatedSlice } from "../../../libraries/zustand";

const filtersSchema = z.object({
  applyFilters: z.boolean().default(true),
  brightness: z.number().min(0).max(200).default(100).catch(100),
  blur: z.number().min(0).max(100).default(0).catch(0),
  contrast: z.number().min(0).max(200).default(100).catch(100),
  grayscale: z.number().min(0).max(100).default(0).catch(0),
  hue: z.number().min(0).max(100).default(0).catch(0),
  invert: z.number().min(0).max(100).default(0).catch(0),
  saturation: z.number().min(0).max(200).default(100).catch(100),
  sepia: z.number().min(0).max(100).default(0).catch(0),
});

export type FiltersState = z.infer<typeof filtersSchema>;

export type FiltersSlice = {
  filters: FiltersState & {
    setApplyFilters: (applyFilters: boolean) => void;
    setBrightness: (brightness: number) => void;
    setBlur: (blur: number) => void;
    setContrast: (contrast: number) => void;
    setGrayscale: (grayscale: number) => void;
    setHue: (hue: number) => void;
    setInvert: (invert: number) => void;
    setSaturation: (saturation: number) => void;
    setSepia: (sepia: number) => void;
  };
};

export const createFiltersSlice = (
  set: (fn: (state: FiltersSlice) => Partial<FiltersSlice>) => void
): FiltersSlice => ({
  filters: createValidatedSlice(filtersSchema, (sliceSet: (fn: (state: FiltersState) => Partial<FiltersState>) => void) => ({
    setApplyFilters: (applyFilters: boolean) => {
      sliceSet((state) => ({ ...state, applyFilters }));
      set((state) => ({ filters: { ...state.filters, applyFilters } }));
    },
    setBrightness: (brightness: number) => {
      sliceSet(() => ({ brightness }));
      set((state) => ({ filters: { ...state.filters, brightness } }));
    },
    setBlur: (blur: number) => {
      sliceSet(() => ({ blur }));
      set((state) => ({ filters: { ...state.filters, blur } }));
    },
    setContrast: (contrast: number) => {    
      sliceSet(() => ({ contrast }));
      set((state) => ({ filters: { ...state.filters, contrast } }));
    },
    setGrayscale: (grayscale: number) => {
      sliceSet(() => ({ grayscale }));
      set((state) => ({ filters: { ...state.filters, grayscale } }));
    },
    setHue: (hue: number) => {
      sliceSet(() => ({ hue }));
      set((state) => ({ filters: { ...state.filters, hue } }));
    },
    setInvert: (invert: number) => {
      sliceSet(() => ({ invert }));
      set((state) => ({ filters: { ...state.filters, invert } }));
    },
    setSaturation: (saturation: number) => {
      sliceSet(() => ({ saturation }));
      set((state) => ({ filters: { ...state.filters, saturation } }));
    },
    setSepia: (sepia: number) => {
      sliceSet(() => ({ sepia }));
      set((state) => ({ filters: { ...state.filters, sepia } }));
    },
  })),
});
