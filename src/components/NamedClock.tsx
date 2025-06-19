import CurrentTimestamp from "./CurrentTimestamp";

export default function NamedClock({ label, timezone }: { label: string; timezone: string }) {
    return (
    <div
      className="relative flex h-12 flex-col justify-center border-r border-gray-700 pl-3 pr-5"
    >
      <p className="truncate text-xs font-semibold uppercase text-gray-600">
            {label}
         </p>
         <time className="text-sm tabular-nums tracking-tight">
            <CurrentTimestamp timezone={timezone} />
         </time>
      </div>
   );
}
