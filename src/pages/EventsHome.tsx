import { useState, useEffect } from "react";

const EventsHome = () => {
  type Tile = {
    date: string;
    message: string;
    year?: string;
  };

  // Initial list of tiles
  const initialTiles: Tile[] = [
    { date: "2021-06-21", message: "Message D" },
    { date: "2021-06-01", message: "Message 1" },
    { date: "2021-06-11", message: "Message 2" },
    { date: "2018-06-18", message: "Message A" },
    { date: "2018-06-01", message: "Message 1" },
    { date: "2018-06-11", message: "Message 2" },
    { date: "2019-06-19", message: "Message B" },
    { date: "2020-06-20", message: "Message C" },
    { date: "2026-06-26", message: "Message E" },
  ];

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

  const [tiles, setTiles] = useState<Record<string, Tile[]>>(() => ({}));
  const [years, setYears] = useState<string[]>([""]);
  const [isDragging, setIsDragging] = useState(false);
  const [tiltedTile, setTiltedTile] = useState<string | null>(null);

  useEffect(() => {
    assignYearKeyToTilesData();
  }, [])

  const assignYearKeyToTilesData = () => {
    const newDataSet: Record<string, Tile[]> = {};
    initialTiles.forEach((tileData) => {
      const tileDateYear = new Date(tileData.date).getFullYear().toString();
      if (!newDataSet[tileDateYear]) {
        newDataSet[tileDateYear] = [];
      }
      newDataSet[tileDateYear].push({
        ...tileData,
        year: tileDateYear,
      });
    });

    setTiles(newDataSet);
    setYears(Object.keys(newDataSet));
  };

  // const getAllYearsFromDataSet = () => {
  //   return tiles.map((tileData) => {
  //     const tileDateYear = new Date(tileData.date).getFullYear();
  //     return tileDateYear.toString();
  //   });
  // };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    tileId: string
  ) => {
    e.dataTransfer.setData("tile_id", tileId.toString());

    const tileCard = document.getElementById(tileId);
    setTiltedTile(tileId);
    setIsDragging(true);
    if (tileCard instanceof HTMLElement) {
      tileCard.style.opacity = "0";
      tileCard.style.rotate = "6deg";
    }
  };

  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    tileId: string
  ) => {
    const tileCard = document.getElementById(tileId);

    if (tileCard instanceof HTMLElement) {
      tileCard.style.opacity = "100";
      tileCard.style.rotate = "0deg";
    }
    setIsDragging(false);
    setTiltedTile(null);
  };

  const handleOnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    year: string,
    position: number
  ) => {
    e.preventDefault();
    const tileId = e.dataTransfer.getData("tile_id");
    const tileCard = document.getElementById(tileId);
    if (tileCard instanceof HTMLElement) {
      tileCard.style.opacity = "100";
      tileCard.style.rotate = "0deg";
    }
 
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

    Object.keys(newDataSet).forEach((key)=>{
      if(!newDataSet[key] || newDataSet[key].length === 0){
        delete newDataSet[key];
      }
    });
    
    setTiles(newDataSet);
    setYears(Object.keys(newDataSet))
    setIsDragging(false);
    setTiltedTile(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col p-6 gap-4">
      <div className="text-white">Buttons Section</div>
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
                className="rounded-lg"
                onDragOver={(e) => handleDragOver(e)}
                style={{
                  background: `linear-gradient(to bottom right, ${randomColor}, #FFFFFF1A)`,
                }}
              >
                <div className="flex flex-col gap-2 p-4 rounded-lg">
                  {tiles[year]?.map((tile, index) => {
                    return (
                      <div
                        id={`${year}-tile-${index}`}
                        key={`${year}-tile-${index}`}
                        className={`bg-white/15 shadow-lg backdrop-blur-md p-4 
                          rounded-lg hover:bg-white/35 hover:scale-105
                          transition-transform ease-in-out duration-300`}
                        draggable
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleOnDrop(e, year, index)}
                        onDragStart={(e) =>
                          handleDragStart(e, `${year}-tile-${index}`)
                        }
                        onDragEnd={(e) =>
                          handleDragEnd(e, `${year}-tile-${index}`)
                        }
                      >
                        <div className="flex flex-1 justify-end text-xs font-normal">
                          {tile.date}
                        </div>
                        <div className="text-md font-semibold">
                          {tile.message}
                        </div>
                      </div>
                    );
                  })}
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
