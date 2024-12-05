import { TileProps } from "@/types/props";
import { Clock, Scroll } from "lucide-react";

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
            ? "bg-black/85 text-white cursor-grabbing shadow-2xl opacity-50 none"
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
        className="flex flex-1 items-center text-md font-bold break-words mb-2"
      >
         <Scroll size="15px" className="mr-1"/> {tileData?.message}
      </div>
      <div className="flex flex-1 items-center text-xs font-bold text-[#A9A9A9]">
        <Clock size="15px" className="mr-1"/> {tileData?.date}
      </div>
    </div>
  );
};
