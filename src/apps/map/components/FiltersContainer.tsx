import { useEffect, useState } from "react";
import {
  ChevronUpIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle, Switch } from "@headlessui/react";
import { useAppStore } from "../../../stores";
import { type FiltersState } from "../stores/filters.store";

export default function FiltersContainer({
  container,
}: {
  container: HTMLElement;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const filtersStore = useAppStore((state) => state.filters);

  const applyFiltersBool = filtersStore.applyFilters;
  const setApplyFilters = filtersStore.setApplyFilters;

  const [applyFiltersBoolState, setApplyFiltersBoolState] = useState(applyFiltersBool);

  const brightness = filtersStore.brightness;
  const setBrightness = filtersStore.setBrightness;

  const blur = filtersStore.blur;
  const setBlur = filtersStore.setBlur;

  const contrast = filtersStore.contrast;
  const setContrast = filtersStore.setContrast;

  const grayscale = filtersStore.grayscale;
  const setGrayscale = filtersStore.setGrayscale;

  const hue = filtersStore.hue;
  const setHue = filtersStore.setHue;

  const invert = filtersStore.invert;
  const setInvert = filtersStore.setInvert;

  const saturation = filtersStore.saturation;
  const setSaturation = filtersStore.setSaturation;

  const sepia = filtersStore.sepia;
  const setSepia = filtersStore.setSepia;

  const filters = {
    brightness,
    blur,
    contrast,
    grayscale,
    hue,
    invert,
    saturation,
    sepia,
  };

  const keysAndHandlers = {
    brightness: setBrightness,
    blur: setBlur,
    contrast: setContrast,
    grayscale: setGrayscale,
    hue: setHue,
    invert: setInvert,
    saturation: setSaturation,
    sepia: setSepia,
  };

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "+") {
      setBrightness(brightness + 10);
    }

    if (e.key === "-") {
      setBrightness(brightness - 10);
    }
  }

  function applyFilters(filters: FiltersState) {
    let filterString = `
         brightness(${filters.brightness}%)
         blur(${filters.blur}px)
         contrast(${filters.contrast}%)
         grayscale(${filters.grayscale}%)
         hue-rotate(${filters.hue}deg)
         invert(${filters.invert}%)
         saturate(${filters.saturation}%)
         sepia(${filters.sepia}%)
      `;

    if (!applyFiltersBool) {
      filterString = "none";
    }

    container.style.filter = filterString;
  }

  useEffect(() => {
    applyFilters(filters as FiltersState);
  }, [filters]);

  function resetFilters() {
    setBrightness(100);
    setBlur(0);
    setContrast(100);
    setGrayscale(0);
    setHue(0);
    setInvert(0);
    setSaturation(100);
    setSepia(0);
  }

  const handleApplyFilterSwitch = (e: boolean) => {
    setApplyFiltersBoolState(e);
    setApplyFilters(e);
  };

  useEffect(() => {
    applyFilters(filters as FiltersState);

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [filters, applyFiltersBool]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-12 cursor-pointer items-center justify-center space-x-1.5 border-l border-gray-700 px-2.5 text-gray-400"
      >
        <AdjustmentsHorizontalIcon className="size-5 stroke-current text-gray-400" />
        <ChevronUpIcon
          className={`h-4 w-4 stroke-current text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogPanel className="absolute bottom-0 right-0 top-0 my-12 w-80 select-none border-l border-gray-700 bg-black text-gray-200 sm:right-12">
          <div className="flex h-12 items-center justify-between border-b border-gray-700 px-4 text-gray-500">
            <DialogTitle className="flex w-full items-center justify-between font-bold uppercase">
              <p>Map Style Filters</p>
              <button
                onClick={resetFilters}
                type="button"
                className="rounded p-1 px-2 text-sm hover:bg-gray-900 hover:text-gray-400"
              >
                Reset
              </button>
            </DialogTitle>
          </div>

          <DialogPanel className="w-full space-y-3 border-b border-gray-700 p-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-400">Turn filters on</p>

              <Switch
                checked={applyFiltersBoolState}
                onChange={handleApplyFilterSwitch}
                className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition data-checked:bg-green-500"
              >
                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
              </Switch>
            </div>
          </DialogPanel>

          <div className="divide-y divide-gray-800">
            {Object.keys(filters).map((key) => (
              <div
                key={key}
                className="flex items-center justify-between space-x-2 px-4 py-3 text-sm uppercase text-gray-400"
              >
                <label htmlFor={key}>{key}</label>
                <input
                  value={filters[key as keyof typeof filters]}
                  onChange={function (e) {
                    keysAndHandlers[key as keyof typeof keysAndHandlers](
                      Number(e.target.value)
                    );
                  }}
                  type="range"
                  min={0}
                  max={200}
                  id={key}
                />
              </div>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
