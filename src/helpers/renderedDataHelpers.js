import {
  sumValuesUp,
  getMinDemandObject,
  getMaxDemandObject,
  getAvgDemandObject,
} from './genericHelpers';

// Collate data for each Item
// Process(es) explained in SidebarBranch component
const getSelectionDailyData = (selectedItemsArray) => {
  const selectionDailyDataArray =
    selectedItemsArray.length &&
    selectedItemsArray.map((eachSelectedItem) => {
      return eachSelectedItem.daily_data;
    });

  const selectionDailyData = selectionDailyDataArray.reduce((acc, curr) => {
    curr.forEach((dayObject, index) => {
      const dayObjectKeys = Object.keys(dayObject);

      // remove "date" string
      const deviceNames = dayObjectKeys.filter(
        (eachItem) => eachItem !== 'date'
      );

      acc[index].date = dayObject.date;
      acc[index][deviceNames] = dayObject[deviceNames];
    });

    return acc;
  });

  return selectionDailyData;
};

const getRefinedEnergyData = (data) => {
  // Ensure data isn't falsy
  const refinedEnergyDataArray = data[0] && data;

  const energyValueNames =
    refinedEnergyDataArray && Object.keys(refinedEnergyDataArray[0]);

  let refinedEnergyData = {};

  energyValueNames &&
    energyValueNames.forEach((eachName) => {
      return (refinedEnergyData[eachName] = sumValuesUp(
        refinedEnergyDataArray,
        eachName
      ));
    });

  refinedEnergyData.min_demand =
    refinedEnergyDataArray && getMinDemandObject(refinedEnergyDataArray);
  refinedEnergyData.max_demand =
    refinedEnergyDataArray && getMaxDemandObject(refinedEnergyDataArray);
  refinedEnergyData.avg_demand =
    refinedEnergyDataArray && getAvgDemandObject(refinedEnergyDataArray);

  return refinedEnergyData;
};

const getRenderedData = (data) => {
  const refinedEnergyData = getRefinedEnergyData(data);
  const refinedDailyData = getSelectionDailyData(data);

  // Note: returned daily data is a sum from all selected items
  return {
    ...refinedEnergyData,
    daily_data: refinedDailyData,
  };
};

export { getRenderedData };
