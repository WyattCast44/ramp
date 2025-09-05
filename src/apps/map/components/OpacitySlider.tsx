import type Layer from "../../../libraries/map/layers/Layer";

interface OpacitySliderProps {
  layer: Layer;
  opacity: number;
  onOpacityChange: (layer: Layer, opacity: number) => void;
}

export default function OpacitySlider({
  layer,
  opacity,
  onOpacityChange,
}: OpacitySliderProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Opacity</span>
        <span>{Math.round(opacity * 100)}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={opacity}
        onChange={(e) => onOpacityChange(layer, parseFloat(e.target.value))}
        className="w-full cursor-pointer accent-blue-600"
      />
    </div>
  );
}
