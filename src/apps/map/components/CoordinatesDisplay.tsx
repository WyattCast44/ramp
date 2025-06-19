import { DialogPanel, DialogTitle } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { formatsWithExamples } from "./../../../libraries/coordinates";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAppStore, type AppStore } from "../../../stores";
import { MapBrowserEvent } from "ol";
import Convert from "../../../libraries/coordinates/Convert";
import type { CoordinateType } from "../../../libraries/coordinates";
import {
  createMapEventListener,
  MapEventType,
} from "../../../libraries/events/map.events";
import { CoordinateTypeEnum } from "../../../libraries/coordinates";

/**
 * Get the formatted coordinates text for the given format
 *
 * @param lat - The latitude
 * @param lng - The longitude
 * @param selectedFormat - The format to use
 * @returns The coordinates text
 */
function getCoordinatesText(lat: number, lng: number, selectedFormat: string) {
  switch (selectedFormat) {
    case "dd":
      return Convert.latLngToDecimalDegrees(lat, lng, 3);
    case "latlng":
      return Convert.latLngToDecimalDegrees(lat, lng, 3);
    case "mgrs":
      return Convert.latLngToMGRS(lat, lng);
    case "utm":
      return Convert.latLngToUtm(lat, lng);
    case "dms":
      return Convert.latLngToDMS(lat, lng);
    default:
      return Convert.latLngToDecimalDegrees(lat, lng, 3);
  }
}

/**
 * Handle the mouse move event to get the coordinates text
 *
 * @param event - The mouse move event
 * @returns The coordinates text
 */
function handleMouseMove(
  event: MapBrowserEvent,
  selectedFormat: string
): string {
  let latitude = event.coordinate[1];
  let longitude = event.coordinate[0];

  // Adjust longitude to be between -180 and 180
  if (longitude < -180) {
    longitude = ((longitude + 180) % 360) + 180;
  } else if (longitude > 180) {
    longitude = ((longitude - 180) % 360) - 180;
  }

  return getCoordinatesText(latitude, longitude, selectedFormat);
}

export default function CoordinatesDisplay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-white">
      <CoordinatesDisplayAndButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <CoordinatesDisplayDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

function CoordinatesDisplayAndButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [coordinatesText, setCoordinatesText] = useState(
    "Place cursor on map."
  );
  const coordinatesFormat: CoordinateType = useAppStore(
    (state: AppStore) => state.app.coordinatesFormat
  );

  useEffect(() => {
    let unsubscribe = createMapEventListener(
      MapEventType.POINTER_MOVE,
      (event: MapBrowserEvent<PointerEvent>) => {
        setCoordinatesText(handleMouseMove(event, coordinatesFormat as string));
      }
    );

    return () => {
      unsubscribe();
    };
  }, [coordinatesFormat]);

  return (
    <div
      className="flex h-full items-center justify-between border-x border-gray-700 sm:w-[320px] -mx-px"
      title="Change the coordinate format of the map"
    >
      <p
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="truncate px-3 font-mono text-sm tabular-nums sm:text-base w-full text-nowrap h-full cursor-pointer"
      >
        {coordinatesText}
      </p>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hidden h-12 w-12 flex-shrink-0 items-center justify-center sm:flex cursor-pointer"
      >
        <ChevronUpIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function CoordinatesDisplayDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const coordinatesFormat: CoordinateType = useAppStore(
    (state: AppStore) => state.app.coordinatesFormat
  );

  const setCoordinatesFormat = useAppStore(
    (state: AppStore) => state.app.setCoordinatesFormat
  );

  useEffect(() => {

    let nextFormat: CoordinateTypeEnum;

    switch (coordinatesFormat) {
      case CoordinateTypeEnum.DD:
        nextFormat = CoordinateTypeEnum.DMS;
        break;
      case CoordinateTypeEnum.DMS:
        nextFormat = CoordinateTypeEnum.MGRS;
        break;
      case CoordinateTypeEnum.MGRS:
        nextFormat = CoordinateTypeEnum.LATLNG;
        break;
      case CoordinateTypeEnum.LATLNG:
        nextFormat = CoordinateTypeEnum.DD;
        break;
      case CoordinateTypeEnum.UTM:
        nextFormat = CoordinateTypeEnum.MGRS;
        break;
      default:
        nextFormat = CoordinateTypeEnum.DD;
        break;
    }

    let handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "f") {
        // maybe need to do a different key for this, so we can use control+ f to searching?
        event.preventDefault();
        setCoordinatesFormat(nextFormat as CoordinateType);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [coordinatesFormat])

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(!isOpen)}>
      <DialogPanel className="absolute bottom-12 right-12 -mx-px top-12 z-50 w-80 select-none overflow-hidden border-x border-gray-700 bg-black">
        <div className="border-b border-gray-700 bg-black text-gray-400">
          <DialogTitle className="flex h-12 items-center justify-between px-3 text-sm font-semibold uppercase tracking-tight">
            <p className="flex-nowrap text-nowrap pr-2">
              Change Coordinate Format
            </p>
          </DialogTitle>
        </div>

        <div className="mb-12 flex h-full flex-1 flex-col pb-12">
          <div className="flex-1 py-2">
            {formatsWithExamples.map((format) => (
              <button
                key={format.name}
                title={format.name}
                type="button"
                onClick={() =>
                  setCoordinatesFormat(format.code as CoordinateType)
                }
                className="flex w-full items-center justify-between px-4 py-1.5 text-left text-gray-300 hover:text-white"
              >
                <p className="truncate pr-2">
                  {format.name}{" "}
                  {coordinatesFormat === format.code && (
                    <span className="ml-1 text-green-500">✓</span>
                  )}
                </p>

                <span className="text-nowrap text-xs text-gray-500">
                  ({format.example})
                </span>
              </button>
            ))}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
