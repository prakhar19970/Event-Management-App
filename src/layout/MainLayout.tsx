import { useEffect, useState } from "react";
import { Button, Header } from "@/components";
import EventsHome from "@/pages/EventsHome";
import { Tile } from "@/types/tile";
import { useToast } from "@/contexts/ToastContext";

const MainLayout = () => {
  const { showToast } = useToast();
  const [tileDataSet, setTileDataSet] = useState<Record<string, Tile[]>>(
    () => ({})
  );
  const [years, setYears] = useState<string[]>([""]);

  const assignYearKeyToTilesData = (tiles: Tile[]) => {
    const newDataSet: Record<string, Tile[]> = {};
    if (tiles && tiles.length) {
      tiles.forEach((tileData) => {
        const tileDateYear = new Date(tileData.date).getFullYear().toString();
        if (!newDataSet[tileDateYear]) {
          newDataSet[tileDateYear] = [];
        }
        newDataSet[tileDateYear].push({
          ...tileData,
        });
      });
    }

    return newDataSet;
  };
  const handleSuccess = (message: string) => {
    showToast(`${message} successful!`, "success");
  };

  const handleInitialOrder = () => {
    const storedData = localStorage.tileDataSet;
    if (storedData) {
      const parsedData: Tile[] = JSON.parse(storedData);
      const restoredDataSet = assignYearKeyToTilesData(parsedData);
      setTileDataSet(restoredDataSet);
      setYears(Object.keys(restoredDataSet));
      handleSuccess("Initial Ordereing");
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
      handleSuccess("Sorted Ordereing");
    }
  };

  useEffect(() => {
    if (localStorage.tileDataSet) {
      const organizedDataSet = assignYearKeyToTilesData(
        JSON.parse(localStorage.tileDataSet)
      );
      setTileDataSet(organizedDataSet);
      setYears(Object.keys(organizedDataSet));
    }
  }, []);

  const updateTileData = (data: Record<string, Tile[]>, save: boolean) => {
    setTileDataSet(data);
    if (save) {
      const dataSetToBeStored: Tile[] = [];
      Object.values(data).forEach((data) => {
        dataSetToBeStored.push(...data);
      });
      localStorage.setItem("tileDataSet", JSON.stringify(dataSetToBeStored));
    }
  };

  return (
    <div className="px-2">
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
        updateTiles={updateTileData}
        updateYears={setYears}
      />
    </div>
  );
};

export default MainLayout;
