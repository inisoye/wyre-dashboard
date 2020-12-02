import {
  sumValuesUp,
  getMinDemandObject,
  getMaxDemandObject,
  getAvgDemandObject,
} from './genericHelpers';

// Collate data for each branch
// Process(es) explained in SidebarBranch component
const getEachBranchDailyDataArray = (data) => {
  return (
    data.branches &&
    data.branches.map((eachBranch) => {
      return eachBranch.daily_kwh.map((eachDay) => {
        const { date, ...rest } = eachDay;

        const allDevicesDailyData = Object.values(rest);
        const branchDailyData = allDevicesDailyData.reduce(
          (acc, curr) => acc + curr,
          0
        );

        return {
          date: date,
          [eachBranch.name]: branchDailyData,
        };
      });
    })
  );
};

// /*----------------
//    Obtain daily data for organization
//   ----------------*/
const getOrganizationDailyData = (data) => {
  const eachBranchDailyDataArray = getEachBranchDailyDataArray(data);

  const organizationDailyData = eachBranchDailyDataArray.reduce((acc, curr) => {
    curr.forEach((dayObject, index) => {
      const dayObjectKeys = Object.keys(dayObject);
      // remove "date" string
      const branchName = dayObjectKeys.filter(
        (eachItem) => eachItem !== 'date'
      )[0];

      acc[index].date = dayObject.date;
      acc[index][branchName] = dayObject[branchName];
    });

    return acc;
  });

  return organizationDailyData;
};
/*----------------
   Obtain daily data for organization ends
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
  const organizationDailyData = getOrganizationDailyData(data);

  // Note: returned daily data is a sum from all branches
  return {
    name: data.name,
    ...organizationEnergyData,
    daily_data: organizationDailyData,
  };
};

export { getRefinedOrganizationData };
