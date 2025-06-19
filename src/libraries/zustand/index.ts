import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Create a validated Zustand slice.
 *
 * @param schema          Zod schema that supplies defaults + validation
 * @param sliceCreator    Callback that returns the slice's actions
 * @param options.excludeFromPersist
 *                        Keys that must be removed before the slice is
 *                        written to localStorage (e.g. Ope­nLayers Map instances)
 */
export function createValidatedSlice<
  TState extends z.ZodObject<any>,
  TParsed = z.infer<TState>,
  TActions extends Record<string, any> = Record<string, any>
>(
  schema: TState,
  sliceCreator: (
    set: (fn: (state: TParsed) => Partial<TParsed>) => void
  ) => TActions,
  options?: { excludeFromPersist?: (keyof TParsed)[] }
): (TParsed & TActions) & {
  /** Internal helper the root store's partialize() will call */
  __partialize?: () => Partial<TParsed & TActions>;
} {
  const initial = schema.parse({}) as TParsed;

  const slice: any = {
    ...initial,
    ...sliceCreator((updater) => {
      const next = updater(initial);
      schema.partial().parse(next);
    }),
  };

  /* -------- attach "stripper" if requested -------- */
  if (options?.excludeFromPersist?.length) {
    Object.defineProperty(slice, "__partialize", {
      enumerable: false, // keep it hidden from React devtools etc.
      value: () => {
        const clone: any = { ...slice };
        for (const key of options.excludeFromPersist!) delete clone[key];
        return clone;
      },
    });
  }

  return slice;
}

type StoreCreator<T extends Record<string, any>> = (
  set: (fn: (state: T) => Partial<T>) => void
) => T;

/**
 * Create a persisted Zustand store with built-in support for slices
 * that define a `__partialize` method.
 *
 * @param key           The key to use for the store in localStorage
 * @param creator       The creator function for the store
 */
export function createPersistedStore<T extends Record<string, any>>(
  key: string,
  creator: StoreCreator<T>
) {
  return create<T>()(
    persist(creator, {
      name: key,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const out: any = {};
        for (const [k, v] of Object.entries(state)) {
          if (
            v &&
            typeof v === "object" &&
            "__partialize" in v &&
            typeof (v as any).__partialize === "function"
          ) {
            out[k] = (v as any).__partialize();
          } else {
            out[k] = v;
          }
        }
        return out;
      },
      merge: (persistedState, currentState) => {
        const merged: any = { ...currentState };

        for (const [k, v] of Object.entries(persistedState as any)) {
          if (
            k in currentState &&
            typeof currentState[k] === "object" &&
            currentState[k] !== null &&
            typeof v === "object" &&
            v !== null
          ) {
            // shallow-merge the slice so we don't lose its actions
            merged[k] = { ...currentState[k], ...v } as any;
          } else {
            merged[k] = v;
          }
        }

        return merged;
      },
    })
  );
}
