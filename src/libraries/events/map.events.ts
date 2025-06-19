export enum MapEventType {
  FLY_TO_HOME = "map:fly-to-home",
  SET_HOME = "map:set-home",
  RESET_HOME = "map:reset-home",
  POINTER_MOVE = "map:pointer-move",
}

export interface MapEvent<T = any> {
  type: MapEventType;
  payload?: T;
}

// Event dispatcher
export const dispatchMapEvent = <T>(event: MapEvent<T>) => {
  window.dispatchEvent(new CustomEvent(event.type, { detail: event.payload }));
};

// Event listener creator
export const createMapEventListener = <T>(
  type: MapEventType,
  handler: (payload: T) => void
) => {
  const listener = (event: CustomEvent<T>) => handler(event.detail);
  window.addEventListener(type, listener as EventListener);
  return () => window.removeEventListener(type, listener as EventListener);
}; 