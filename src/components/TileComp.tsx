import { Tile } from "@/types/tiles";

interface TileProps {
  tileData: Tile;
  year: string;
  position: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, tileId: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (
    e: React.DragEvent<HTMLDivElement>,
    year: string,
    position: number
  ) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    year: string,
    position: number
  ) => void;
  checkIfDraggedTile: (tileId: string) => boolean;
}

export const TileComp: React.FC<TileProps> = ({
  tileData,
  year,
  position,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  checkIfDraggedTile,
}) => {
  return (
    <div
      id={`${year}-tile-${position}`}
      className={`backdrop-blur-md p-4 rounded-lg transition-transform ease-in-out duration-300
        ${
          checkIfDraggedTile(`${year}-tile-${position}`)
            ? "bg-black/85 text-white scale-110 cursor-grabbing shadow-2xl opacity-0 none"
            : "cursor-grab bg-white/15 shadow-lg hover:bg-white/35 hover:scale-105"
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
      <div className="flex flex-1 justify-end text-xs font-semibold">
        {tileData?.date}
      </div>
      <div className="text-sm font-semibold break-words">{tileData?.message}</div>
    </div>
  );
};
