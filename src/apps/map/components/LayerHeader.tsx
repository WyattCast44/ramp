import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import type Layer from "../../../libraries/map/layers/Layer";

interface LayerHeaderProps {
  layer: Layer;
  index: number;
  totalLayers: number;
  onToggle: (layer: Layer) => void;
  onMoveUp: (layer: Layer) => void;
  onMoveDown: (layer: Layer) => void;
}

export default function LayerHeader({
  layer,
  index,
  totalLayers,
  onToggle,
  onMoveUp,
  onMoveDown,
}: LayerHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggle(layer)}
          className={`w-4 h-4 rounded border-2 ${
            layer.isActive() 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-600'
          }`}
        />
        <p className="font-semibold text-sm text-gray-300">
          {layer.getLabel()}
        </p>
      </div>
      
      {/* Reorder Controls */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onMoveUp(layer)}
          disabled={index === 0}
          className={`p-1 rounded ${
            index === 0 
              ? 'text-gray-600 cursor-not-allowed' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <ChevronUpIcon className="w-3 h-3" />
        </button>
        <button
          onClick={() => onMoveDown(layer)}
          disabled={index === totalLayers - 1}
          className={`p-1 rounded ${
            index === totalLayers - 1 
              ? 'text-gray-600 cursor-not-allowed' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <ChevronDownIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
} 