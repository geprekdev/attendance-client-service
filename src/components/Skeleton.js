export default function Skeleton({
  color,
  rounded,
  width,
  height,
  margin = "",
}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 h-[${height}] ${margin}`}
    >
      &nbsp;
    </div>
  );
}
