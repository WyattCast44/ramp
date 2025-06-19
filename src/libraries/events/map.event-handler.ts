import { MapEventType, createMapEventListener } from "./map.events";
import { useAppStore } from "../../stores";

interface SetHomePayload {
  center: { x: number; y: number };
  zoom: number;
}

export function setupMapEventHandlers() {
  // Handle fly to home
  createMapEventListener(MapEventType.FLY_TO_HOME, () => {
    const map = useAppStore.getState().map.instance;
    const home = useAppStore.getState().map.home;
    
    if (!map) return;
    
    map.getView().animate({
      center: [home.center.x, home.center.y],
      zoom: home.zoom,
      rotation: 0,
      duration: 1000
    });
  });

  // Handle set home
  createMapEventListener<SetHomePayload>(MapEventType.SET_HOME, (payload) => {
    if (!payload) return;
    useAppStore.getState().map.setHome(payload);
  });

  // Handle reset home
  createMapEventListener(MapEventType.RESET_HOME, () => {
    useAppStore.getState().map.resetHome();
  });
} 