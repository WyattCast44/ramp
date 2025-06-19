import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { STORAGE_KEY } from "../stores";
import {
  uploadLocalStorage,
  downloadLocalStorage,
  clearLocalStorage,
} from "../libraries/localstorage";

export default function MasterModeDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = async () => {
    try {
      await uploadLocalStorage(STORAGE_KEY);
      // Force a reload to ensure the store is rehydrated with the new state
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to upload state");
    }
  };

  const handleDownload = async () => {
    try {
      await downloadLocalStorage(STORAGE_KEY, "Ramp_SavedState_");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to download state"
      );
    }
  };

  const handleClear = async () => {
    try {
      await clearLocalStorage(STORAGE_KEY);
      // Force a reload to ensure the store is rehydrated with the new state
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to clear state");
    }
  };

  return (
    <Popover className="relative h-full">
      <PopoverButton
        title="Upload / Download Application State"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-12 -mx-px h-full items-center justify-center border-l border-gray-700 cursor-pointer"
      >
        <span className="sr-only">Upload / Download Application State</span>
        <ArrowPathIcon
          className={`${
            isOpen ? "rotate-180" : ""
          } inline-block size-5 transition-transform duration-200`}
        />
      </PopoverButton>

      <PopoverPanel
        modal={true}
        className="absolute -right-px z-[1000] w-64 border-x border-y border-gray-700 bg-black py-1 focus:!outline-none"
      >
        <button
          type="button"
          onClick={handleUpload}
          title="Upload Application State"
          className="flex items-center bg-black px-3 py-2 hover:text-white w-full cursor-pointer hover:bg-gray-950"
        >
          <ArrowUpCircleIcon className="mr-2 inline-block size-5" />
          <p>Upload Saved State</p>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          title="Download Application State"
          className="flex items-center bg-black px-3 py-2 hover:text-white w-full cursor-pointer hover:bg-gray-950"
        >
          <ArrowDownCircleIcon className="mr-2 inline-block size-5" />
          <p>Download Current State</p>
        </button>

        <button
          type="button"
          onClick={handleClear}
          title="Clear Application State"
          className="flex items-center bg-black px-3 py-2 hover:text-white w-full cursor-pointer hover:bg-gray-950"
        >
          <XCircleIcon className="mr-2 inline-block size-5" />
          <p>Clear Current State</p>
        </button>
      </PopoverPanel>
    </Popover>
  );
}
