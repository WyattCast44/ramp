import { z } from "zod";
import { createValidatedSlice } from "../libraries/zustand";
import type { CoordinateType } from "../libraries/coordinates";

const appSchema = z.object({
    timezone: z.string().default('America/Los_Angeles'),
    clocks: z.array(z.object({ label: z.string(), timezone: z.string() })).default([
        { label: "America/Los_Angeles", timezone: "America/Los_Angeles" },
    ]),
    coordinatesFormat: z.enum(['dd', 'dms', 'mgrs', 'latlng', 'utm'] as const).default('dd'),
});

type AppState = z.infer<typeof appSchema>;

export type AppSlice = {
    app: AppState & {
        setTimezone: (timezone: string) => void;
        setClocks: (clocks: { label: string; timezone: string }[]) => void;
        setCoordinatesFormat: (coordinatesFormat: CoordinateType) => void;
    };
};

export const createAppSlice = (
    set: (fn: (state: AppSlice) => Partial<AppSlice>) => void
): AppSlice => ({
    app: createValidatedSlice(appSchema, (sliceSet) => ({
        setTimezone: (timezone: string) => {
            sliceSet(() => ({ timezone }));
            set((state) => ({ app: { ...state.app, timezone } }));
        },
        setClocks: (clocks: { label: string; timezone: string }[]) => {
            sliceSet(() => ({ clocks }));
            set((state) => ({ app: { ...state.app, clocks } }));
        },
        setCoordinatesFormat: (coordinatesFormat: CoordinateType) => {
            sliceSet(() => ({ coordinatesFormat }));
            set((state) => ({ app: { ...state.app, coordinatesFormat } }));
        },
    })),
});

