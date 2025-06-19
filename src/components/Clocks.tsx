import Clock from "./NamedClock.tsx";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useAppStore, type AppStore } from "../stores";
import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

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

export default function Clocks() {
  const { clocks, setClocks } = useAppStore((state: AppStore) => state.app);
  const [isOpen, setIsOpen] = useState(false);
  const [newClock, setNewClock] = useState({ label: "", timezone: "UTC" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClock.label.trim()) return;

    setClocks([...clocks, newClock]);
    setNewClock({ label: "", timezone: "UTC" });
  };

  return (
    <>
      <Popover className="relative">
        <PopoverButton
          onClick={() => setIsOpen(!isOpen)}
          title="Manage clocks"
          className="flex h-12 w-12 items-center justify-center border-r border-gray-700"
        >
          <ClockIcon className="size-5" />
        </PopoverButton>

        <PopoverPanel className="absolute top-12 z-[1000] w-64 border-x border-b border-gray-700 bg-black p-4 focus:!outline-none">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="clock-label"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Clock Label
              </label>
              <input
                type="text"
                id="clock-label"
                value={newClock.label}
                onChange={(e) =>
                  setNewClock({ ...newClock, label: e.target.value })
                }
                className="w-full bg-black focus:bg-gray-900 text-white border border-gray-700 p-2 text-sm"
                placeholder="Enter clock label"
              />
            </div>

            <div>
              <label
                htmlFor="clock-timezone"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Timezone
              </label>
              <select
                id="clock-timezone"
                value={newClock.timezone}
                onChange={(e) =>
                  setNewClock({ ...newClock, timezone: e.target.value })
                }
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
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 border border-gray-700 text-white py-2 px-4 text-sm font-medium"
            >
              Add Clock
            </button>
          </form>

          {clocks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                Your Clocks
              </h3>
              <div className="space-y-2">
                {clocks.map((clock) => (
                  <div
                    key={clock.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-300">{clock.label}</span>
                    <button
                      onClick={() =>
                        setClocks(clocks.filter((c) => c.label !== clock.label))
                      }
                      className="text-red-500 py-1 px-2 border border-gray-700 text-sm hover:bg-gray-900"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </PopoverPanel>
      </Popover>

      {clocks.map((clock) => (
        <Clock
          key={clock.label}
          label={clock.label}
          timezone={clock.timezone}
        />
      ))}
    </>
  );
}
