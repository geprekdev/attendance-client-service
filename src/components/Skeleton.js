export default function Skeleton({
  color,
  rounded,
  width,
  height,
  margin = "",
}) {
  return (
    <div
      className={`animate-pulse rounded-${rounded} ${color} w-[${width}] h-[${height}] ${margin}`}
    >
      &nbsp;
    </div>
  );
}
