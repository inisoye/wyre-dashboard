import {
  sumArrayofArrays,
  sumValuesUp,
  getMinDemandObject,
  getMaxDemandObject,
  getAvgDemandObject,
} from './genericHelpers';

// Process(es) explained in SidebarBranch component
// /*----------------
//    Obtain daily data for organization
//   ----------------*/
const getOrganizationDailyKwh = (data) => {
  let organizationDailyKwh = {};

  // Add data for each branch
  data.branches &&
    data.branches.forEach((eachBranch) => {
      const { dates, ...rest } = eachBranch.daily_kwh;
      const allDevicesDailyKwh = Object.values(rest);
      const branchDailyKwh = sumArrayofArrays(allDevicesDailyKwh);
      organizationDailyKwh.dates = dates;
      organizationDailyKwh[eachBranch.name] = branchDailyKwh;
    });

  // Add total
  const { dates, ...rest } = organizationDailyKwh;
  const allBranchesDailyKwh = Object.values(rest);
  const totalOrganizationDailyKwh = sumArrayofArrays(allBranchesDailyKwh);
  organizationDailyKwh[data.name] = totalOrganizationDailyKwh;

  return organizationDailyKwh;
};

/*----------------
   Obtain monthly usage data for organization
  ----------------*/

const getOrganizationMonthlyUsage = (data) => {
  let organizationMonthlyUsage = { devices: [], hours: [] };

  // Add data for each branch
  data.branches &&
    data.branches.forEach((eachBranch) => {
      const branchMonthlyUsage = eachBranch.usage_hours.hours.reduce(
        (acc, curr) => acc + curr,
        0
      );
      organizationMonthlyUsage.devices.push(eachBranch.name);
      organizationMonthlyUsage.hours.push(branchMonthlyUsage);
    });

  return organizationMonthlyUsage;
};

/*----------------
   Collate energy data for each branch
  ----------------*/
const getBranchEnergyDataArray = (data) => {
  return (
    data.branches &&
    data.branches.map((eachBranch) => {
      const energySumValueNames = Object.keys(eachBranch.devices[0]).filter(
        (eachName) =>
          !['name', 'id', 'avg_demand', 'min_demand', 'max_demand'].includes(
            eachName
          )
      );

      let branchEnergyData = {};

      energySumValueNames.forEach((eachName) => {
        return (branchEnergyData[eachName] = sumValuesUp(
          eachBranch.devices,
          eachName
        ));
      });
      branchEnergyData.min_demand = getMinDemandObject(eachBranch.devices);
      branchEnergyData.max_demand = getMaxDemandObject(eachBranch.devices);
      branchEnergyData.avg_demand = getAvgDemandObject(eachBranch.devices);

      return branchEnergyData;
    })
  );
};

/*----------------
   Obtain energy data for organization
  ----------------*/
const getOrganizationEnergyData = (data) => {
  const eachBranchEnergyDataArray = getBranchEnergyDataArray(data);

  const energyValueNames =
    eachBranchEnergyDataArray && Object.keys(eachBranchEnergyDataArray[0]);

  let organizationEnergyData = {};

  energyValueNames &&
    energyValueNames.forEach((eachName) => {
      return (organizationEnergyData[eachName] = sumValuesUp(
        eachBranchEnergyDataArray,
        eachName
      ));
    });

  organizationEnergyData.min_demand = getMinDemandObject(
    eachBranchEnergyDataArray
  );
  organizationEnergyData.max_demand = getMaxDemandObject(
    eachBranchEnergyDataArray
  );
  organizationEnergyData.avg_demand = getAvgDemandObject(
    eachBranchEnergyDataArray
  );

  return organizationEnergyData;
};

/*----------------
   Obtain energy data for organization ends
  ----------------*/
const getRefinedOrganizationData = (data) => {
  const organizationEnergyData = getOrganizationEnergyData(data);
  const organizationDailyKwh = getOrganizationDailyKwh(data);
  const organizationMonthlyUsage = getOrganizationMonthlyUsage(data);

  return {
    name: data.name,
    ...organizationEnergyData,
    daily_kwh: organizationDailyKwh,
    usage_hours: organizationMonthlyUsage,
  };
};

export { getRefinedOrganizationData };
