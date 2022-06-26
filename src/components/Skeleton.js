export default function Skeleton({
  color,
  rounded,
  width,
  height,
  margin = "",
}) {
  return (
    <div
      className={`animate-pulse rounded-${rounded} ${color}  h-[${height}] ${margin}`}
    >
      &nbsp;
    </div>
  );
}
