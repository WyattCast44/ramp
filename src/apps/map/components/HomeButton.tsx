import { HomeIcon } from "@heroicons/react/24/outline";
import {
  MapEventType,
  dispatchMapEvent,
} from "../../../libraries/events/map.events";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function HomeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "h") {
        e.preventDefault();
        dispatchMapEvent({ type: MapEventType.FLY_TO_HOME });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSetHome = () => {
    dispatchMapEvent({ type: MapEventType.SET_HOME });

    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        title="Set home view"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatchMapEvent({ type: MapEventType.FLY_TO_HOME });
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="size-12 flex items-center justify-center border-l border-gray-700 text-gray-400 hover:text-white cursor-pointer"
      >
        <HomeIcon className="size-5" />
        <span className="sr-only">Reset map to home view</span>
      </button>

      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-[1000]">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed top-16 left-1/2 -translate-x-1/2 w-80 rounded-lg border border-gray-700 bg-black p-4 shadow-lg">
          <DialogPanel className="focus:outline-none">
            <DialogTitle className="pt-1 pb-4 text-center text-sm font-semibold text-white">
              Set home view
            </DialogTitle>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSetHome}
                className="w-full bg-black hover:bg-gray-900 border border-gray-700 text-white py-2 px-4 text-sm font-medium"
              >
                Set home to current view
              </button>

              <button
                type="button"
                onClick={() => {
                  dispatchMapEvent({ type: MapEventType.RESET_HOME });
                  setIsOpen(false);
                }}
                className="w-full bg-black hover:bg-gray-900 border border-gray-700 text-white py-2 px-4 text-sm font-medium"
              >
                Reset home view to default
              </button>
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-500 py-1 px-2 border border-gray-700 text-sm hover:bg-gray-900"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
