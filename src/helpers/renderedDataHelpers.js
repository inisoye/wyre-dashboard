import {
  sumValuesUp,
  getMinDemandObject,
  getMaxDemandObject,
  getAvgDemandObject,
} from './genericHelpers';

// Collate data for each Item
// Process(es) explained in SidebarBranch component
const getSelectionDailyKwh = (selectedItemsArray) => {
  let selectionDailyKwh = {};

  // const selectionDailyKwhArray =
  selectedItemsArray.length &&
    selectedItemsArray.forEach((eachSelectedItem) => {
      selectionDailyKwh.dates = eachSelectedItem.daily_kwh.dates;

      selectionDailyKwh[eachSelectedItem.name] =
        eachSelectedItem.daily_kwh[eachSelectedItem.name];
    });

  return selectionDailyKwh;
};

const getSelectionMonthlyUsage = (data) => {
  let SelectionMonthlyUsage = { devices: [], hours: [] };

  // Add data for each branch
  data.forEach((eachBranch) => {
    const branchMonthlyUsage = eachBranch.usage_hours.hours.reduce(
      (acc, curr) => acc + curr,
      0
    );
    SelectionMonthlyUsage.devices.push(eachBranch.name);
    SelectionMonthlyUsage.hours.push(branchMonthlyUsage);
  });

  return SelectionMonthlyUsage;
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
  const refinedDailyKwh = getSelectionDailyKwh(data);
  const refinedMonthlyUsage = getSelectionMonthlyUsage(data);

  return {
    ...refinedEnergyData,
    daily_kwh: refinedDailyKwh,
    usage_hours: refinedMonthlyUsage,
  };
};

export { getRenderedData };
