import BasemapsContainer from "./BasemapsContainer";
import CoordinatesDisplay from "./CoordinatesDisplay";
import FiltersContainer from "./FiltersContainer";
import HomeButton from "./HomeButton";

export default function FooterToolbar({ container }: { container: HTMLElement }) {
  return (
    <footer className="h-12 flex items-center border-t border-gray-700 bg-black border">
      <div className="size-12 border-r border-t -mx-px text-white overflow-hidden flex items-center justify-center border-gray-700 bg-black">
        Hello
      </div>
      <div className="flex-1">center</div>

      <div className="flex items-center">
        <HomeButton />
        <FiltersContainer container={container} />
        <BasemapsContainer />
        <CoordinatesDisplay />
      </div>
    </footer>
  );
}
