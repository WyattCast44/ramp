import { z } from "zod";
import { Map as OlMap } from "ol";
import { createValidatedSlice } from "../../../libraries/zustand";

const mapSchema = z.object({
  instance: z.instanceof(OlMap).nullable().default(null),
  center: z
    .object({
      x: z.number().min(-180).max(180).default(0),
      y: z.number().min(-90).max(90).default(0),
    })
    .default({ x: 0, y: 0 }),
  zoom: z.number().min(0).max(30).default(3.5),
  rotation: z.number().min(0).max(360).default(0),
  home: z
    .object({
      center: z
        .object({
          x: z.number().min(-180).max(180).default(0),
          y: z.number().min(-90).max(90).default(0),
        })
        .default({ x: 0, y: 0 }),
      zoom: z.number().min(0).max(30).default(3.5).catch(3.5),
    })
    .default({ center: { x: 0, y: 0 }, zoom: 3.5 }),
});

type MapState = z.infer<typeof mapSchema>;

export type MapSlice = {
  map: MapState & {
    setInstance: (instance: OlMap) => void;
    setCenter: (center: { x: number; y: number }) => void;
    setZoom: (zoom: number) => void;
    setRotation: (rotation: number) => void;
    setHome: (home: { center: { x: number; y: number }; zoom: number }) => void;
    resetHome: () => void;
  };
};

export const createMapSlice = (
  set: (fn: (state: MapSlice) => Partial<MapSlice>) => void
): MapSlice => ({
  map: createValidatedSlice(mapSchema, (sliceSet: (fn: (state: MapState) => Partial<MapState>) => void) => ({
    setInstance: (instance: OlMap) => {
      sliceSet((state) => ({ ...state, instance }));
    },
    setCenter: (center: { x: number; y: number }) => {
      sliceSet(() => ({ center }));
      set((state) => ({ map: { ...state.map, center } }));
    },
    setZoom: (zoom: number) => {
      sliceSet(() => ({ zoom }));
      set((state) => ({ map: { ...state.map, zoom } }));
    },
    setRotation: (rotation: number) => {
      sliceSet(() => ({ rotation }));
      set((state) => ({ map: { ...state.map, rotation } }));
    },
    setHome: (home: { center: { x: number; y: number }; zoom: number }) => {
      sliceSet(() => ({ home }));
      set((state) => ({ map: { ...state.map, home } }));
    },
    resetHome: () => {
      const defaultHome = {
        center: { x: 0, y: 0 },
        zoom: 3.5
      };
      sliceSet(() => ({ home: defaultHome }));
      set((state) => ({ map: { ...state.map, home: defaultHome } }));
    }
  }), { excludeFromPersist: ["instance"] }),
});
