import { useState } from "react";
import { ChevronUpIcon, MapIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { basemaps, type Basemap } from "../scripts/map";

export default function BasemapsContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBasemap, setSelectedBasemap] = useState<Basemap>(basemaps[0]);

  function handleBasemapChange(basemap: Basemap) {
    setSelectedBasemap(basemap);
    basemaps.forEach((basemap) => {
      basemap.deactivate();
    });
    basemap.activate();
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-12 cursor-pointer items-center justify-center space-x-1.5 border-l border-gray-700 px-2.5 text-gray-400"
      >
        <MapIcon className="size-5 stroke-current text-gray-400" />
        <ChevronUpIcon
          className={`h-4 w-4 stroke-current text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogPanel className="absolute bottom-0 right-0 top-0 my-12 w-96 select-none border-l border-gray-700 bg-black text-gray-200 sm:right-12">
          <div className="flex h-12 items-center justify-between border-b border-gray-700 px-4 text-gray-500">
            <DialogTitle className="flex w-full items-center justify-between font-bold uppercase">
              <p>Change Basemap</p>
            </DialogTitle>
          </div>

          <div className="divide-y divide-gray-800">
            <div className="overflow-y-scroll flex-1 scrollbar-thin scrollbar-track-black scrollbar-thumb-slate-600 py-2 space-y-4">
              {basemaps.map((basemap) => (
                <button
                  key={basemap.getId()}
                  onClick={() => handleBasemapChange(basemap)}
                  className="flex items-center justify-between px-3.5 text-gray-400 overflow-hidden hover:text-white w-full"
                >
                  <div className="space-y-2 mr-2 max-w-1/2 flex items-center">
                    <p className="font-semibold flex-nowrap whitespace-nowrap">{basemap.getLabel()}
                      {selectedBasemap?.getId() === basemap.getId() && (
                        <span className="ml-2 text-green-500">✓</span>
                      )}
                    </p>
                  </div>

                  <div className="h-10 aspect-video rounded-md overflow-hidden relative">
                    <img
                      src={basemap.getPreviewUrl()}
                      alt={basemap.getLabel()}
                      className="absolute inset-0 object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
