import { useState } from "react";
import CurrentDate from "./CurrentDate";
import CurrentTimestamp from "./CurrentTimestamp";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useAppStore, type AppStore } from "./../stores";

const COMMON_TIMEZONES = [
  { code: "UTC", name: "UTC / Zulu Time" },
  { code: "America/New_York", name: "Eastern Time" },
  { code: "America/Chicago", name: "Central Time" },
  { code: "America/Denver", name: "Mountain Time" },
  { code: "America/Los_Angeles", name: "Pacific Time" },
  { code: "Europe/London", name: "London" },
  { code: "Europe/Paris", name: "Central European Time" },
  { code: "Asia/Tokyo", name: "Japan Time" },
  { code: "Asia/Shanghai", name: "China Time" },
  { code: "Australia/Sydney", name: "Sydney Time" },
];

export default function DateTimeDisplay() {
  const [isOpen, setIsOpen] = useState(false);
  const { timezone, setTimezone } = useAppStore((state: AppStore) => state.app);

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value);
    setIsOpen(false);
  };

  return (
    <Popover className="relative">
      <PopoverButton
        onClick={() => setIsOpen(!isOpen)}
        title={`Timezone: ${timezone}`}
        className="h-12 md:w-56 w-32 flex items-center justify-end cursor-pointer"
      >
        <p className="px-3 uppercase text-base tabular-nums tracking-tight flex items-center font-semibold">
          <span className="mr-2 hidden sm:inline-block">
            <CurrentDate timezone={timezone} />
          </span>

          <span>
            <CurrentTimestamp timezone={timezone} />
          </span>

          <span className="ml-2 flex items-center justify-center">
            <ChevronDownIcon
              className={`size-3 ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        </p>
      </PopoverButton>

      <PopoverPanel className="absolute top-12 z-[1000] w-full border-x border-b border-gray-700 bg-black p-4 focus:!outline-none">
        <p className="pt-1 pb-4 text-center text-sm font-semibold">
          Select your timezone
        </p>

        <select
          value={timezone}
          onChange={handleTimezoneChange}
          className="w-full bg-black focus:bg-gray-900 text-white border border-gray-700 p-2 text-sm"
        >
          {COMMON_TIMEZONES.map((tz) => (
            <option
              key={tz.code}
              value={tz.code}
              className="bg-black text-white"
            >
              {tz.name}
            </option>
          ))}
        </select>
      </PopoverPanel>
    </Popover>
  );
}
