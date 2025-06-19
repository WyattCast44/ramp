import { createPersistedStore } from "../libraries/zustand";
import { createMapSlice, type MapSlice } from "../apps/map/stores/map.store";
import { createFiltersSlice, type FiltersSlice } from "../apps/map/stores/filters.store";
import { createAppSlice, type AppSlice } from "./app.store";

export const STORAGE_KEY = 'ramp::app::store';

export type AppStore = AppSlice & MapSlice & FiltersSlice;

export const useAppStore = createPersistedStore<AppStore>(STORAGE_KEY, (set) => ({
  ...createAppSlice(set),
  ...createMapSlice(set),
  ...createFiltersSlice(set),
}));