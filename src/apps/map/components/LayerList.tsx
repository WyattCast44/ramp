import type Layer from "../../../libraries/map/layers/Layer";
import LayerItem from "./LayerItem";

interface LayerListProps {
  layers: Layer[];
  layerOpacities: Record<string, number>;
  onLayerToggle: (layer: Layer) => void;
  onMoveLayerUp: (layer: Layer) => void;
  onMoveLayerDown: (layer: Layer) => void;
  onOpacityChange: (layer: Layer, opacity: number) => void;
}

export default function LayerList({
  layers,
  layerOpacities,
  onLayerToggle,
  onMoveLayerUp,
  onMoveLayerDown,
  onOpacityChange,
}: LayerListProps) {
  return (
    <div className="divide-y divide-gray-800">
      <div className="overflow-y-scroll flex-1 scrollbar-thin scrollbar-track-black scrollbar-thumb-slate-600 py-2 space-y-2 px-2">
        {layers.map((layer, index) => (
          <LayerItem
            key={layer.getId()}
            layer={layer}
            index={index}
            totalLayers={layers.length}
            opacity={layerOpacities[layer.getId()] || 1}
            onToggle={onLayerToggle}
            onMoveUp={onMoveLayerUp}
            onMoveDown={onMoveLayerDown}
            onOpacityChange={onOpacityChange}
          />
        ))}
      </div>
    </div>
  );
} 