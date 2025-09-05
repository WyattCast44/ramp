import type Layer from "../../../libraries/map/layers/Layer";
import LayerHeader from "./LayerHeader";
import OpacitySlider from "./OpacitySlider";

interface LayerItemProps {
  layer: Layer;
  index: number;
  totalLayers: number;
  opacity: number;
  onToggle: (layer: Layer) => void;
  onMoveUp: (layer: Layer) => void;
  onMoveDown: (layer: Layer) => void;
  onOpacityChange: (layer: Layer, opacity: number) => void;
}

export default function LayerItem({
  layer,
  index,
  totalLayers,
  opacity,
  onToggle,
  onMoveUp,
  onMoveDown,
  onOpacityChange,
}: LayerItemProps) {
  return (
    <div className="px-3.5 py-2 border border-gray-700 bg-gray-900">
      <LayerHeader
        layer={layer}
        index={index}
        totalLayers={totalLayers}
        onToggle={onToggle}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />

      <OpacitySlider
        layer={layer}
        opacity={opacity}
        onOpacityChange={onOpacityChange}
      />
    </div>
  );
}
