import { TileProps } from "@/types/props";

export const TileComp: React.FC<TileProps> = ({
  tileData,
  year,
  position,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  checkIfDraggedTile,
  color,
}) => {
  return (
    <div
      id={`${year}-tile-${position}`}
      style={{
        borderTop: `10px solid ${color}`,
      }}
      className={`backdrop-blur-md p-4 rounded-lg transition-transform ease-in-out duration-300
        ${
          checkIfDraggedTile(`${year}-tile-${position}`)
            ? "bg-black/85 text-white cursor-grabbing shadow-2xl opacity-0 none"
            : "cursor-grab bg-white/85 shadow-lg hover:bg-white/35 hover:scale-105"
        }`}
      draggable
      onDragStart={(e) => onDragStart(e, `${year}-tile-${position}`)}
      onDragEnd={(e) => onDragEnd(e)}
      onDragOver={(e) => {
        e.stopPropagation();
        onDragOver(e, year, position);
      }}
      onDrop={(e) => {
        e.stopPropagation();
        onDrop(e, year, position);
      }}
    >
      <div
        className="text-md font-semibold break-words mb-2"
        style={{
          color: `${
            checkIfDraggedTile(`${year}-tile-${position}`) ? "#ffffff" : "#1A1A1A"
          }`,
        }}
      >
        {tileData?.message}
      </div>
      <div className="flex flex-1 text-xs font-bold text-[#A9A9A9]">{tileData?.date}</div>
    </div>
  );
};
