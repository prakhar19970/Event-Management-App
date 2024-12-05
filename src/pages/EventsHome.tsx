import { useEffect, useState } from "react";
import { Tile } from "@/types/tile"; // Import the Tile type from the tiles.d.ts file
import { TileComp, Button, AddTileForm, Modal } from "@/components";
import { CirclePlus, Calendar } from "lucide-react";
import { format } from "date-fns";
import { paletteColors } from "@/constants/pallette";

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
  const getPalletteColor = (index: number) => {
    return paletteColors[index];
  };
  const [visibleTiles, setVisibleTiles] =
    useState<Record<string, Tile[]>>(tiles);
  const [draggedTile, setDraggedTile] = useState<string | null>(null);
  const [placeholderPosition, setPlaceholderPosition] = useState<{
    year?: string | null;
    position?: number | null;
    flag?: string | null;
  }>({ year: null, position: null });
  const [openAddTileModal, setOpenAddTileModal] = useState<boolean>(false);

  useEffect(() => {
    setVisibleTiles(tiles);
  }, [tiles]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    tileId: string
  ) => {
    e.dataTransfer.setData("tile_id", tileId.toString());
    setDraggedTile(tileId.toString());

    // Remove dragged tile from visibleTiles
    const draggedYear = tileId.slice(0, 4);
    const draggedIndex = Number(tileId.charAt(tileId.length - 1));

    const newVisibleTiles: Record<string, Tile[]> = JSON.parse(
      JSON.stringify(visibleTiles)
    );

    newVisibleTiles[draggedYear].splice(draggedIndex, 1);

    setVisibleTiles(newVisibleTiles);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
    setVisibleTiles(tiles); // Reset to original tiles
    setDraggedTile(null);
    setPlaceholderPosition({ year: null, position: null, flag: "" });
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    year?: string,
    position?: number
  ) => {
    e.preventDefault();
    if (
      !draggedTile ||
      !year ||
      (draggedTile &&
        year &&
        draggedTile.slice(0, 4) === year &&
        Number(draggedTile.charAt(draggedTile.length - 1)) === position)
    ) {
      setPlaceholderPosition({ year: null, position: null, flag: null });
    } else if (
      // If dragging within the same year
      draggedTile &&
      year &&
      position &&
      draggedTile.slice(0, 4) === year &&
      Number(draggedTile.charAt(draggedTile.length - 1)) < position
    ) {
      setPlaceholderPosition({
        year: year,
        position: position,
        flag: "after",
      });
    } else {
      console.log("yoooollooo ---> ", year, position);
      console.log(draggedTile);
      setPlaceholderPosition({ year, position, flag: "" });
    }
  };

  const handleOnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    year: string,
    position: number
  ) => {
    e.preventDefault();
    console.log("hello");
    if (draggedTile) {
      console.log("hello");
      const movedTileIndex = parseInt(
        draggedTile?.charAt(draggedTile.length - 1),
        10
      );
      const movedTileYear = draggedTile?.slice(0, 4);
      const newDataSet: Record<string, Tile[]> = JSON.parse(
        JSON.stringify(tiles)
      );
      const movedTile: Tile = newDataSet[movedTileYear][movedTileIndex];
      newDataSet[movedTileYear].splice(movedTileIndex, 1);

      if (year !== movedTileYear) {
        movedTile.date = `${year}${movedTile?.date?.slice(4)}`;
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
      setPlaceholderPosition({ year: null, position: null, flag: null });
    }
  };

  const saveTileData = (tileData: { message: string; date: string }) => {
    const newDataSet: Record<string, Tile[]> = JSON.parse(
      JSON.stringify(tiles)
    );
    const year = new Date(tileData?.date).getFullYear().toString();
    const formattedDate = format(tileData.date, "yyyy-MM-dd");

    if (!newDataSet[year]) {
      newDataSet[year] = [];
    }
    newDataSet[year].push({
      message: tileData.message,
      date: formattedDate,
    });
    updateTiles(newDataSet);
    updateYears(Object.keys(newDataSet));
  };

  const checkIfDraggedTile = (tileId: string): boolean => {
    return draggedTile === tileId;
  };
  return (
    <>
      <div className="flex flex-col p-6 gap-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {years.map((year, index) => {
            const randomColor = getPalletteColor(index);
            return (
              <div className="flex flex-col gap-4" key={`${year}-${index}`}>
                <div
                  style={{
                    borderTop: `10px solid ${randomColor}`,
                  }}
                  className="flex items-center rounded-t-lg rounded-b-sm p-2 text-lg font-semibold backdrop-blur-md  bg-[#F1F1F1]"
                >
                  <Calendar size="20" className="mr-2" /> {year}
                </div>
                <div className="rounded-xl h-[325px] bg-[#F1F1F1] backdrop-blur-md">
                  <div className="flex flex-col gap-2 p-4 rounded-lg h-full overflow-y-scroll">
                    {tiles[year]?.map((tile, index) => {
                      return (
                        <div key={`${year}-tile-${index}`}>
                          {/*
                            Invisible Drop Zone created when a Tile is dragged over to a specific position 
                            from bottom to top or from one group to another.
                            It Helps Show user where they can drop the Tile.
                          */}
                          {placeholderPosition.year === year &&
                            placeholderPosition.position === index &&
                            placeholderPosition.flag !== "after" && (
                              <div
                                className="h-[90px]"
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
                            color={randomColor}
                            checkIfDraggedTile={checkIfDraggedTile}
                          />
                          {/* 
                            Invisible Drop Zone created when a Tile is dragged over from top to bottom in Same group. 
                            It Helps Show user where they can drop the Tile.
                          */}
                          {placeholderPosition.year === year &&
                            placeholderPosition.position === index &&
                            placeholderPosition.flag === "after" && (
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
                        </div>
                      );
                    })}

                    {/* DropZone at the end of list in Case there is space */}
                    <div
                      className="flex flex-grow h-[80px] p-7 rounded-lg"
                      onDragOver={(e) => handleDragOver(e)}
                      onDrop={(e) => handleOnDrop(e, year, tiles[year]?.length)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          primary
          className="flex justify-center items-center sticky bottom-10 hover:scale-125 left-full w-fit rounded-[30px] p-2 text-white"
          onClick={() => setOpenAddTileModal(true)}
        >
          <CirclePlus size="24px" />
        </Button>
      </div>
      <Modal
        open={openAddTileModal}
        close={() => setOpenAddTileModal(false)}
        className="w-1/3"
      >
        <AddTileForm
          onSave={(tileData) => {
            saveTileData({
              message: tileData.message,
              date: String(tileData.date),
            });
            setOpenAddTileModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default EventsHome;
