import { useState } from "react";
import {
  MapIcon,
  Bars4Icon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function MasterModeDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Map", href: "/", icon: MapIcon },
    {
      name: "Planner",
      href: "/planner",
      icon: CalculatorIcon,
      onclick: function(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        window.open("/planner", "_blank", "width=600,height=300,popup=true");
        return false;
      },
    },
  ];

  return (
    <Popover className="relative">
      <PopoverButton
        title="Visit other pages"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-12 -mx-px h-full items-center justify-center border-r border-gray-700 cursor-pointer"
      >
        <span className="sr-only">Navigate to other pages</span>
        <Bars4Icon className="size-5" />
      </PopoverButton>

      <PopoverPanel
        modal={true}
        className="absolute left-[-1px]  z-[1000] w-40 border-x border-y border-gray-700 bg-black py-1 focus:!outline-none"
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            title={link.name}
            className="flex items-center justify-between bg-black px-3 py-2 hover:text-white"
            onClick={
              link.onclick !== undefined
                ? (event: React.MouseEvent<HTMLAnchorElement>) => link.onclick(event)
                : () => undefined as any
            }
          >
            {link.name}
            <link.icon className="mr-2 inline-block size-5" />
          </a>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
