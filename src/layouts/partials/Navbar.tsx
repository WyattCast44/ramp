import type { JSX } from "react/jsx-runtime";
import MasterModeDropdown from "./../../components/MasterModeDropdown";
import DateTimeDisplay from "../../components/DateTimeDisplay";
import ApplicationStateDropdown from "../../components/ApplicationStateDropdown";
import Clocks from "../../components/Clocks";

export default function Navbar(): JSX.Element {
    return (
        <div className="flex h-12 bg-black border border-gray-700 text-gray-400">
            <MasterModeDropdown />
            <div className="flex-1 flex items-center">
                <div className="hidden lg:flex flex-1 items-center">
                    <Clocks />
                </div>
            </div>
            <div className="flex-1 flex items-center justify-end">
                <DateTimeDisplay />
                <ApplicationStateDropdown />
            </div>
        </div>
    )
}