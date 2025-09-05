import { useState, useEffect } from "react";
import { ChevronUpIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { manager } from "../scripts/map";
import type Layer from "../../../libraries/map/layers/Layer";
import LayerList from "./LayerList";

export default function LayersContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderedLayers, setOrderedLayers] = useState<Layer[]>([]);
  const [layerOpacities, setLayerOpacities] = useState<Record<string, number>>(
    {}
  );

  // Update layer order when dialog opens or layers change
  useEffect(() => {
    if (isOpen) {
      updateLayerOrder();
    }
  }, [isOpen]);

  // Initialize opacities
  useEffect(() => {
    const opacities: Record<string, number> = {};
    manager.layers.getLayers().forEach((layer) => {
      opacities[layer.getId()] = layer.getOpacity();
    });
    setLayerOpacities(opacities);
  }, []);

  function updateLayerOrder() {
    setOrderedLayers(manager.layers.getLayersInRenderingOrder());
  }

  function handleLayerToggle(layer: Layer) {
    if (layer.isActive()) {
      layer.deactivate();
    } else {
      layer.activate();
    }
    updateLayerOrder();
  }

  function handleMoveLayerUp(layer: Layer) {
    manager.layers.moveLayerUp(layer);
    updateLayerOrder();
  }

  function handleMoveLayerDown(layer: Layer) {
    manager.layers.moveLayerDown(layer);
    updateLayerOrder();
  }

  function handleOpacityChange(layer: Layer, opacity: number) {
    layer.setOpacity(opacity);
    setLayerOpacities((prev) => ({
      ...prev,
      [layer.getId()]: opacity,
    }));
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-12 cursor-pointer items-center justify-center space-x-1.5 border-l border-gray-700 px-2.5 text-gray-400 hover:text-white"
      >
        <Square3Stack3DIcon className="size-5 stroke-current" />
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
              <p>Manage Map Layers</p>
            </DialogTitle>
          </div>

          <LayerList
            layers={orderedLayers}
            layerOpacities={layerOpacities}
            onLayerToggle={handleLayerToggle}
            onMoveLayerUp={handleMoveLayerUp}
            onMoveLayerDown={handleMoveLayerDown}
            onOpacityChange={handleOpacityChange}
          />
        </DialogPanel>
      </Dialog>
    </div>
  );
}
