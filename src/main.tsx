import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./layouts/App";
import Map from "./apps/map/Map";
import Planner from "./apps/planner/Planner";

let routes = {
  "/": Map,
  "/planner": Planner,
};

const route = routes[window.location.pathname as keyof typeof routes];

// get the key of the route
const routeKey = Object.keys(routes).find(key => routes[key as keyof typeof routes] === route);

if (routeKey === '/') {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App></App>
    </StrictMode>
  );
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Planner></Planner>
    </StrictMode>
  );
}