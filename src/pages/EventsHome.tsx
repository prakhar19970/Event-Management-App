import { useState } from "react";
import { Tile } from "../types/tiles"; // Import the Tile type from the tiles.d.ts file
import { TileComp } from "../components/Tile";

interface EventProps {
  tiles: Record<string, Tile[]>;
  years: string[];
  updateTiles: (data: Record<string, Tile[]>) => void;
  updateYears: (years: string[]) => void;
}

const EventsHome: React.FC<EventProps> = ({
  tiles,
  years,
  updateTiles,
  updateYears,
}) => {
  const pallette = [
    "#6699ff",
    "#737dfe",
    "#cb5eee",
    "#fa7cbb",
    "#f14658",
    "#4be1ec",
    "#f40076",
    "#df98fa",
    "#f06966",
    "#e233ff",
    "#ff6b00",
    "#df98fa",
    "#9055ff",
    "#ed7b84",
    "#9055ff",
    "#402565",
    "#30be96",
    "#402662",
    "#3900a6",
    "#f14658",
    "#dc2537",
    "#fad6a6",
    "#ff0076",
    "#590fb7",
    "#9055ff",
    "#13e2da",
    "#0b63f6",
    "#003cc5",
    "#d6ff7f",
    "#00b3cc",
    "#f40076",
    "#342711",
    "#000066",
    "#ffcac9",
    "#2f80ed",
    "#b2ffda",
  ];
  const getPalletteColor = (index: number) => {
    return pallette[index];
  };

  const [draggedTile, setDraggedTile] = useState<string | null>(null);
  const [placeholderPosition, setPlaceholderPosition] = useState<{
    year?: string | null;
    position?: number | null;
  }>({ year: null, position: null });

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    tileId: string
  ) => {
    e.dataTransfer.setData("tile_id", tileId.toString());
    setDraggedTile(tileId.toString());
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
    setDraggedTile(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    year?: string,
    position?: number
  ) => {
    e.preventDefault();
    setPlaceholderPosition({ year, position }); // Update ref
  };

  const handleOnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    year: string,
    position: number
  ) => {
    e.preventDefault();

    const tileId = e.dataTransfer.getData("tile_id");
    const movedTileIndex = Number(tileId.charAt(tileId.length - 1));
    const movedTileYear = tileId.slice(0, 4);
    const newDataSet: Record<string, Tile[]> = JSON.parse(
      JSON.stringify(tiles)
    );
    const movedTile = newDataSet[movedTileYear][movedTileIndex];

    newDataSet[movedTileYear].splice(movedTileIndex, 1);

    if (year !== movedTileYear) {
      movedTile.year = year;
      movedTile.date = `${year}${movedTile.date.slice(4)}`;
    }

    newDataSet[year].splice(position, 0, movedTile);

    Object.keys(newDataSet).forEach((key) => {
      if (!newDataSet[key] || newDataSet[key].length === 0) {
        delete newDataSet[key];
      }
    });

    updateTiles(newDataSet);
    updateYears(Object.keys(newDataSet));
    setDraggedTile(null);
    setPlaceholderPosition({ year: null, position: null });
  };

  const checkIfDraggedTile = (tileId: string): boolean => {
    return draggedTile === tileId;
  };
  return (
    <div className="flex flex-col p-6 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {years.map((year, index) => {
          const randomColor = getPalletteColor(index);
          return (
            <div className="flex flex-col gap-4" key={index}>
              <div
                style={{
                  background: `linear-gradient(to bottom right, ${randomColor}, #FFFFFF66)`,
                }}
                className="flex rounded p-2 justify-end text-lg font-semibold"
              >
                {year}
              </div>
              <div
                className="rounded-lg h-[325px]"
                style={{
                  background: `linear-gradient(to bottom right, ${randomColor}, #FFFFFF1A)`,
                }}
              >
                <div className="flex flex-col gap-2 p-4 rounded-lg h-full overflow-y-scroll">
                  {tiles[year]?.map((tile, index) => {
                    return (
                      <div key={`${year}-tile-${index}`}>
                        {/* Invisible Drop Zone created when a Tile is dragged over to a specific position 
                          Helps Show user where they can drop the Tile */}
                        {placeholderPosition.year === year &&
                          placeholderPosition.position === index && (
                            <div
                              className="h-[60px]"
                              onDragOver={(e) => {
                                e.stopPropagation();
                                handleDragOver(e, year, index);
                              }}
                              onDrop={(e) => {
                                e.stopPropagation();
                                handleOnDrop(e, year, index);
                              }}
                            />
                          )}

                        {/* Tile Component */}
                        <TileComp
                          tileData={tile}
                          year={year}
                          position={index}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                          onDragOver={handleDragOver}
                          onDrop={handleOnDrop}
                          checkIfDraggedTile={checkIfDraggedTile}
                        />
                      </div>
                    );
                  })}

                  {/* DropZone at the end of list in Case there is space */}
                  <div
                    className="flex flex-grow rounded-lg "
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) =>
                      handleOnDrop(e, year, tiles[year]?.length || 0)
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsHome;
