export default function Skeleton({ color, rounded, width, height, margin = '' }) {
  return <div className={`skeleton rounded-lg h-[${height}] ${margin}`}>&nbsp;</div>
}
