import {
  sumNestedObjectValuesUp,
  getNestedMinDemandObject,
  getNestedMaxDemandObject,
  getNestedAvgDemandObject,
  sumArrayOfArrays,
  sumBaselineEnergies,
  sumPeakToAveragePowerRatios,
  sumScoreCardCarbonEmissions,
  joinChangeOverLagsValues,
  sumOperatingTimeValues,
} from '../helpers/genericHelpers';

/* -------------------------------------------------------------------
/* Branch Dashboard Calculations Begin -------------------------------
--------------------------------------------------------------------*/
/*-----------------
Obtain dashboard daily energy data for branch
----------------*/
const getBranchDailyKwh = (data) => {
  let branchDailyKwh = data.daily_kwh;
  // Add total
  const { dates, ...rest } = branchDailyKwh;
  const allDevicesDailyKwh = Object.values(rest);
  const totalBranchDailyKwh = sumArrayOfArrays(allDevicesDailyKwh);
  branchDailyKwh[data.name] = totalBranchDailyKwh;
  return branchDailyKwh;
};
/*-----------------
Obtain dashboard daily energy data for branch ends
----------------*/

/*-----------------
Obtain dashboard monthly usage data for branch
----------------*/
const getBranchUsageHours = (data) => {
  const { usage_hours } = data;
  return usage_hours;
};
/*-----------------
Obtain dashboard monthly usage data for branch ends
----------------*/

/*-----------------
Obtain dashboard energy data for branch
----------------*/
const getBranchEnergyData = (data) => {
  // Place energy value names of one device and place in array
  // Ensure 'name' and 'id' are excluded form values placed in the array
  const energyValueNames = Object.keys(data.devices[0].dashboard).filter(
    (eachName) =>
      !['name', 'id', 'avg_demand', 'min_demand', 'max_demand'].includes(
        eachName
      )
  );

  //  Use the energy value names to create an object with the branch's energy data
  let branchEnergyData = {};

  energyValueNames.forEach((eachName) => {
    return (branchEnergyData[eachName] = sumNestedObjectValuesUp(
      data.devices,
      'dashboard',
      eachName
    ));
  });

  branchEnergyData.min_demand = getNestedMinDemandObject(
    data.devices,
    'dashboard'
  );
  branchEnergyData.max_demand = getNestedMaxDemandObject(
    data.devices,
    'dashboard'
  );
  branchEnergyData.avg_demand = getNestedAvgDemandObject(
    data.devices,
    'dashboard'
  );

  return branchEnergyData;
};
/*-----------------
Obtain dashboard energy data for branch ends
----------------*/
/* -------------------------------------------------------------------
/* Branch Dashboard Calculations End ---------------------------------
--------------------------------------------------------------------*/

/* -------------------------------------------------------------------
/* Branch Score Card Calculations Begin ------------------------------
--------------------------------------------------------------------*/
// Baseline Energies
const getBranchBaselineEnergy = (data) => {
  const baselineEnergiesArray = data.devices.map(
    (eachDevice) => eachDevice.score_card.baseline_energy
  );
  return sumBaselineEnergies(baselineEnergiesArray);
};

// Peak to Average Power Ratios
const getBranchPeakToAveragePowerRatio = (data) => {
  const peakToAveragePowerRatioArray = data.devices.map(
    (eachDevice) => eachDevice.score_card.peak_to_avg_power_ratio
  );
  return sumPeakToAveragePowerRatios(peakToAveragePowerRatioArray);
};

// Score Card Carbon Emissions
const getBranchScoreCardCarbonEmissions = (data) => {
  const scoreCardCarbonEmissionsArray = data.devices.map(
    (eachDevice) => eachDevice.score_card.score_card_carbon_emissions
  );
  return sumScoreCardCarbonEmissions(scoreCardCarbonEmissionsArray);
};

// Generator Size Efficiency
const getBranchGeneratorSizeEfficiencyArray = (data) => {
  return data.devices.map((eachDevice) => {
    const modifiedDeviceName = !eachDevice.name.includes(data.name)
      ? data.name + ' ' + eachDevice.name
      : eachDevice.name;

    return eachDevice.score_card.generator_size_efficiency
      ? {
          name: modifiedDeviceName,
          ...eachDevice.score_card.generator_size_efficiency,
        }
      : false;
  });
};

// Change Over Lags
const getBranchChangeOverLags = (data) => {
  // Pick out dates for first device that is not false(a utility)
  const branchLagsDates = data.devices
    .map(
      (eachDevice) =>
        eachDevice.score_card.change_over_lags &&
        eachDevice.score_card.change_over_lags.dates.values
    )
    .filter(Boolean)[0];

  const dieselUnitLitrePrice = data.devices
    .map(
      (eachDevice) =>
        eachDevice.score_card.change_over_lags &&
        eachDevice.score_card.change_over_lags.diesel_cost.diesel_litre_price
    )
    .filter(Boolean)[0];

  const allDevicesLagValues = joinChangeOverLagsValues(data.devices, 'lags');
  const branchLagValues = {
    values: sumArrayOfArrays(allDevicesLagValues),
    unit: 'minutes',
  };

  const allDevicesDieselCostValues = joinChangeOverLagsValues(
    data.devices,
    'diesel_cost'
  );
  const branchDieselCostValues = {
    values: sumArrayOfArrays(allDevicesDieselCostValues),
    unit: 'litres',
    diesel_litre_price: dieselUnitLitrePrice,
  };

  return {
    dates: { values: branchLagsDates, unit: 'date' },
    lags: branchLagValues,
    diesel_cost: branchDieselCostValues,
  };
};

// Operating Time
const getBranchOperatingTime = (data) => {
  const branchOperatingTimeDates = data.devices.map(
    (eachDevice) => eachDevice.score_card.operating_time.chart.dates
  )[0];

  const allDevicesOperatingTimeValues = data.devices.map(
    (eachDevice) => eachDevice.score_card.operating_time.chart.values
  );
  const branchOperatingTimeValues = sumArrayOfArrays(
    allDevicesOperatingTimeValues
  );

  const branchEstimatedTimeWasted = sumOperatingTimeValues(
    data.devices,
    'estimated_time_wasted'
  );
  const branchEstimatedDieselWasted = sumOperatingTimeValues(
    data.devices,
    'estimated_diesel_wasted'
  );
  const branchEstimatedDieselCost = sumOperatingTimeValues(
    data.devices,
    'estimated_cost'
  );

  return {
    chart: {
      dates: branchOperatingTimeDates,
      values: branchOperatingTimeValues,
    },
    estimated_time_wasted: {
      unit: 'hours',
      value: branchEstimatedTimeWasted,
    },
    estimated_diesel_wasted: {
      unit: 'litres',
      value: branchEstimatedDieselWasted,
    },
    estimated_cost: {
      unit: 'naira',
      value: branchEstimatedDieselCost,
    },
  };
};

// Fuel Consumption
const getBranchFuelConsumptionArray = (data) =>
  data.devices.map((eachDevice) => {
    const modifiedDeviceName = !eachDevice.name.includes(data.name)
      ? data.name + ' ' + eachDevice.name
      : eachDevice.name;

    if (eachDevice.score_card.fuel_consumption)
      eachDevice.score_card.fuel_consumption.name = modifiedDeviceName;

    return eachDevice.score_card.fuel_consumption
      ? eachDevice.score_card.fuel_consumption
      : false;
  });
/* -------------------------------------------------------------------
/* Branch Score Card Calculations End --------------------------------
--------------------------------------------------------------------*/

const getRefinedBranchData = (data) => {
  return {
    [data.name]: {
      name: data.name,
      // Dashboard Stuff
      ...getBranchEnergyData(data),
      usage_hours: getBranchUsageHours(data),
      daily_kwh: getBranchDailyKwh(data),
      // Score Card Stuff
      baseline_energy: getBranchBaselineEnergy(data),
      peak_to_avg_power_ratio: getBranchPeakToAveragePowerRatio(data),
      score_card_carbon_emissions: getBranchScoreCardCarbonEmissions(data),
      generator_size_efficiency: getBranchGeneratorSizeEfficiencyArray(data),
      change_over_lags: getBranchChangeOverLags(data),
      operating_time: getBranchOperatingTime(data),
      fuel_consumption: getBranchFuelConsumptionArray(data),
    },
  };
};

export { getRefinedBranchData };
