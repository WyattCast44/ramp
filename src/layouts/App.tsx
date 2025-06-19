import type { JSX } from "react/jsx-runtime";
import Navbar from "./partials/Navbar";
import Map from "../apps/map/Map";

export default function App(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1">
          <Map />
        </div>
      </div>
    </div>
  );
}
