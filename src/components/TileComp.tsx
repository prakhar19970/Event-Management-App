import { TileProps } from "@/types/props";
import { Clock, Edit, Scroll, Trash2Icon } from "lucide-react";

export const TileComp: React.FC<TileProps> = ({
  tileData,
  year,
  position,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDelete,
  onEdit,
  checkIfDraggedTile,
  color,
}) => {
  return (
    <div
      id={`${year}-tile-${position}`}
      style={{
        borderTop: `10px solid ${color}`,
        cursor: checkIfDraggedTile(`${year}-tile-${position}`)
          ? "grabbing"
          : "grab",
      }}
      className={`relative backdrop-blur-md p-4 rounded-lg transition-transform ease-in-out duration-300
        ${
          checkIfDraggedTile(`${year}-tile-${position}`)
            ? "bg-black/85 text-white shadow-2xl opacity-0 none"
            : "bg-white/85 shadow-lg hover:bg-white/90 hover:scale-105"
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
      <div className="flex flex-col gap-2 absolute top-2 right-2">
        <Trash2Icon
          className="hover:text-red-600 cursor-pointer"
          size="20px"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(year, position);
          }}
        />
        <Edit
          className="hover:text-blue-500 cursor-pointer "
          size="20px"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(year, position);
          }}
        />
      </div>
      <div className="flex flex-1 items-center text-[18px] font-bold mb-2">
        <Scroll size="15px" className="mr-1" />
        <span className="truncate w-40">{tileData?.message}</span>
      </div>
      <div className="flex flex-1 items-center text-xs font-bold text-[#A9A9A9]">
        <Clock size="15px" className="mr-1" /> {tileData?.date}
      </div>
    </div>
  );
};
