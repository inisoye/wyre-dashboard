import {
  sumArrayOfArrays,
  getAllOrganizationDevices,
  sumObjectValuesUp,
  sumNestedObjectValuesUp,
  getMinDemandObject,
  getMaxDemandObject,
  getAvgDemandObject,
  getNestedMinDemandObject,
  getNestedMaxDemandObject,
  getNestedAvgDemandObject,
  sumBaselineEnergies,
  sumPeakToAveragePowerRatios,
  sumScoreCardCarbonEmissions,
  sumOperatingTimeValues,
} from './genericHelpers';

/* -------------------------------------------------------------------
/* Org Dashboard Calculations Begin ----------------------------------
--------------------------------------------------------------------*/

/*----------------
   Obtain dashboard daily data for organization
  ----------------*/
const getOrganizationDailyKwh = (data) => {
  let organizationDailyKwh = {};

  // Add data for each branch
  data.branches &&
    data.branches.forEach((eachBranch) => {
      const { dates, ...rest } = eachBranch.daily_kwh;
      const allDevicesDailyKwh = Object.values(rest);
      const branchDailyKwh = sumArrayOfArrays(allDevicesDailyKwh);
      organizationDailyKwh.dates = dates;
      organizationDailyKwh[eachBranch.name] = branchDailyKwh;
    });

  // Add total
  const { dates, ...rest } = organizationDailyKwh;
  const allBranchesDailyKwh = Object.values(rest);
  const totalOrganizationDailyKwh = sumArrayOfArrays(allBranchesDailyKwh);
  organizationDailyKwh[data.name] = totalOrganizationDailyKwh;

  return organizationDailyKwh;
};

/*----------------
   Obtain dashboard monthly usage data for organization
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
   Collate dashboard energy data for each branch
  ----------------*/
const getBranchEnergyDataArray = (data) => {
  return (
    data.branches &&
    data.branches.map((eachBranch) => {
      const energySumValueNames = Object.keys(
        eachBranch.devices[0].dashboard
      ).filter(
        (eachName) =>
          !['name', 'id', 'avg_demand', 'min_demand', 'max_demand'].includes(
            eachName
          )
      );

      let branchEnergyData = {};

      energySumValueNames.forEach((eachName) => {
        return (branchEnergyData[eachName] = sumNestedObjectValuesUp(
          eachBranch.devices,
          'dashboard',
          eachName
        ));
      });
      branchEnergyData.min_demand = getNestedMinDemandObject(
        eachBranch.devices,
        'dashboard'
      );
      branchEnergyData.max_demand = getNestedMaxDemandObject(
        eachBranch.devices,
        'dashboard'
      );
      branchEnergyData.avg_demand = getNestedAvgDemandObject(
        eachBranch.devices,
        'dashboard'
      );

      return branchEnergyData;
    })
  );
};

/*----------------
   Obtain dashboard energy data for organization
  ----------------*/
const getOrganizationEnergyData = (data) => {
  const eachBranchEnergyDataArray = getBranchEnergyDataArray(data);

  const energyValueNames =
    eachBranchEnergyDataArray && Object.keys(eachBranchEnergyDataArray[0]);

  let organizationEnergyData = {};

  energyValueNames &&
    energyValueNames.forEach((eachName) => {
      return (organizationEnergyData[eachName] = sumObjectValuesUp(
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
   Obtain dashboard energy data for organization ends
  ----------------*/
/* -------------------------------------------------------------------
/* Org Dashboard Calculations End ------------------------------------
--------------------------------------------------------------------*/

/* -------------------------------------------------------------------
/* Org Score Card Calculations Begin ---------------------------------
--------------------------------------------------------------------*/
// Baseline Energies
const getOrganizationBaselineEnergy = (data) => {
  const allOrganizationDevices = getAllOrganizationDevices(data);

  const baselineEnergiesArray = allOrganizationDevices.map(
    (eachDevice) => eachDevice.score_card.baseline_energy
  );

  return sumBaselineEnergies(baselineEnergiesArray);
};

// Peak to Average Power Ratios
const getOrganizationPeakToAveragePowerRatio = (data) => {
  const allOrganizationDevices = getAllOrganizationDevices(data);

  const peakToAveragePowerRatioArray = allOrganizationDevices.map(
    (eachDevice) => eachDevice.score_card.peak_to_avg_power_ratio
  );

  return sumPeakToAveragePowerRatios(peakToAveragePowerRatioArray);
};

// Score Card Carbon Emissions
const getOrganizationScoreCardCarbonEmissions = (data) => {
  const allOrganizationDevices = getAllOrganizationDevices(data);

  const scoreCardCarbonEmissionsArray = allOrganizationDevices.map(
    (eachDevice) => eachDevice.score_card.score_card_carbon_emissions
  );

  return sumScoreCardCarbonEmissions(scoreCardCarbonEmissionsArray);
};

// Generator Size Efficiency
const getOrgGeneratorSizeEfficiencyArray = (data) => {
  const allOrganizationDevices = getAllOrganizationDevices(data);

  return allOrganizationDevices.map((eachDevice) =>
    eachDevice.score_card.generator_size_efficiency
      ? {
          name: eachDevice.name,
          ...eachDevice.score_card.generator_size_efficiency,
        }
      : false
  );
};

// Change Over Lags
const getOrganizationChangeOverLags = (data) => {
  const allOrganizationDevices = getAllOrganizationDevices(data);

  // Get Units First
  const changeOverLagUnits = allOrganizationDevices
    .map((eachDevice) => eachDevice.score_card.change_over_lags.units)
    .filter(Boolean)[0];

  // Get Data
  const allDevicesChangeOverLagData = allOrganizationDevices
    .map((eachDevice) => eachDevice.score_card.change_over_lags.data)
    .filter(Boolean)
    .flat();

  // Group data by date
  const groupedOrganizationChangeOverLags = allDevicesChangeOverLagData.reduce(
    function (acc, curr) {
      acc[curr.date] = acc[curr.date] || [];
      acc[curr.date].push(curr);
      return acc;
    },
    Object.create(null)
  );

  const organizationChangeOverLagsData = [];

  // Add up values at each date, without adding up(or concatenating) the dates
  for (const date in groupedOrganizationChangeOverLags) {
    const summedChangeOverLag = groupedOrganizationChangeOverLags[date].reduce(
      (acc, curr) => {
        for (const prop in curr) {
          if (acc.hasOwnProperty(prop) && prop !== 'date' && prop !== 'id')
            acc[prop] += curr[prop];
          else acc[prop] = curr[prop];
        }
        return acc;
      },
      {}
    );

    // Push summed values to change over lags array
    organizationChangeOverLagsData.push(summedChangeOverLag);
  }

  return { data: organizationChangeOverLagsData, units: changeOverLagUnits };
};

// Operating Time
const getOrganizationOperatingTime = (data) => {
  const allOrganizationDevices = getAllOrganizationDevices(data);

  const organizationOperatingTimeDates = allOrganizationDevices.map(
    (eachDevice) => eachDevice.score_card.operating_time.chart.dates
  )[0];

  const allDevicesOperatingTimeValues = allOrganizationDevices.map(
    (eachDevice) => eachDevice.score_card.operating_time.chart.values
  );
  const organizationOperatingTimeValues = sumArrayOfArrays(
    allDevicesOperatingTimeValues
  );

  const organizationEstimatedTimeWasted = sumOperatingTimeValues(
    allOrganizationDevices,
    'estimated_time_wasted'
  );
  const organizationEstimatedDieselWasted = sumOperatingTimeValues(
    allOrganizationDevices,
    'estimated_diesel_wasted'
  );
  const organizationEstimatedDieselCost = sumOperatingTimeValues(
    allOrganizationDevices,
    'estimated_cost'
  );

  return {
    chart: {
      dates: organizationOperatingTimeDates,
      values: organizationOperatingTimeValues,
    },
    estimated_time_wasted: {
      unit: 'hours',
      value: organizationEstimatedTimeWasted,
    },
    estimated_diesel_wasted: {
      unit: 'litres',
      value: organizationEstimatedDieselWasted,
    },
    estimated_cost: {
      unit: 'naira',
      value: organizationEstimatedDieselCost,
    },
  };
};

// Fuel Consumption
const getOrganizationFuelConsumptionArray = (data) => {
  const allOrganizationDevices = getAllOrganizationDevices(data);

  return allOrganizationDevices.map((eachDevice) => {
    if (eachDevice.score_card.fuel_consumption)
      eachDevice.score_card.fuel_consumption.name = eachDevice.name;

    return eachDevice.score_card.fuel_consumption
      ? eachDevice.score_card.fuel_consumption
      : false;
  });
};
/* -------------------------------------------------------------------
/* Org Score Card Calculations End -----------------------------------
--------------------------------------------------------------------*/

const getRefinedOrganizationData = (data) => {
  return {
    name: data.name,
    // Dashboard Stuff
    ...getOrganizationEnergyData(data),
    daily_kwh: getOrganizationDailyKwh(data),
    usage_hours: getOrganizationMonthlyUsage(data),
    // Score Card Stuff
    baseline_energy: getOrganizationBaselineEnergy(data),
    peak_to_avg_power_ratio: getOrganizationPeakToAveragePowerRatio(data),
    score_card_carbon_emissions: getOrganizationScoreCardCarbonEmissions(data),
    generator_size_efficiency: getOrgGeneratorSizeEfficiencyArray(data),
    change_over_lags: getOrganizationChangeOverLags(data),
    operating_time: getOrganizationOperatingTime(data),
    fuel_consumption: getOrganizationFuelConsumptionArray(data),
  };
};

export { getRefinedOrganizationData, getOrganizationFuelConsumptionArray };
