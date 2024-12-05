import { useEffect, useState } from "react";
import { Button, Header } from "@/components";
import EventsHome from "@/pages/EventsHome";
import { Tile } from "@/types/tile";
import { input } from "@/constants/data";

const MainLayout = () => {
  const [tileDataSet, setTileDataSet] = useState<Record<string, Tile[]>>(
    () => ({})
  );
  const [years, setYears] = useState<string[]>([""]);

  const assignYearKeyToTilesData = (tiles: Tile[]) => {
    const newDataSet: Record<string, Tile[]> = {};
    tiles.forEach((tileData) => {
      const tileDateYear = new Date(tileData.date).getFullYear().toString();
      if (!newDataSet[tileDateYear]) {
        newDataSet[tileDateYear] = [];
      }
      newDataSet[tileDateYear].push({
        ...tileData,
      });
    });

    return newDataSet;
  };

  const handleInitialOrder = () => {
    const storedData = localStorage.getItem("initialTileDataSet");
    if (storedData) {
      const parsedData: Tile[] = JSON.parse(storedData);
      const restoredDataSet = assignYearKeyToTilesData(parsedData);
      setTileDataSet(restoredDataSet);
      setYears(Object.keys(restoredDataSet));
    }
  };

  const handleSortedOrder = () => {
    const newTileData = { ...tileDataSet };
    if (newTileData) {
      Object.keys(newTileData).forEach((year) => {
        const sortedData = newTileData[year].sort(
          (tileA: Tile, tileB: Tile) =>
            new Date(tileA.date).getTime() - new Date(tileB.date).getTime()
        );
        newTileData[year] = sortedData;
      });
      setTileDataSet(newTileData);
    }
  };

  useEffect(() => {
    localStorage.setItem("initialTileDataSet", JSON.stringify(input));
    const organizedDataSet = assignYearKeyToTilesData(input);
    setTileDataSet(organizedDataSet);
    setYears(Object.keys(organizedDataSet));
  }, []);

  return (
    <div>
      <Header>
        <Button
          primary
          label="Initial Order"
          className="text-white"
          onClick={() => handleInitialOrder()}
        />
        <Button
          secondary
          className="text-white"
          label="Sorted Order"
          onClick={() => handleSortedOrder()}
        />
      </Header>
      <EventsHome
        tiles={tileDataSet}
        years={years}
        updateTiles={setTileDataSet}
        updateYears={setYears}
      />
    </div>
  );
};

export default MainLayout;
