import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { z } from 'zod';

export function createValidatedStore<T extends z.ZodType>(
  schema: T,
  initialState: z.infer<T>,
  slices: Record<string, (set: any, get: any) => any>
) {
  return create(
    persist(
      (set, get) => {
        const store = {
          ...initialState,
          ...Object.entries(slices).reduce(
            (acc, [key, slice]) => ({
              ...acc,
              [key]: slice(set, get),
            }),
            {}
          ),
        };

        // Validate state on updates
        const validateState = (newState: any) => {
          const result = schema.safeParse(newState);
          if (!result.success) {
            console.error('State validation failed:', result.error);
            return false;
          }
          return true;
        };

        // Wrap set with validation
        const validatedSet = (fn: any) => {
          set((state: any) => {
            const newState = fn(state);
            if (validateState(newState)) {
              return newState;
            }
            return state;
          });
        };

        return {
          ...store,
          set: validatedSet,
        };
      },
      {
        name: 'ramp::app::store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state: Record<string, any>) => {
          // Define what gets persisted
          const { _internal, ...persistedState } = state;
          return persistedState;
        },
      }
    )
  );
} 