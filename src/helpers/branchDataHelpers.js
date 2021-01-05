import {
  getModifiedBranchLevelData,
  sumNestedObjectValuesUp,
  getNestedMinDemandObject,
  getNestedMaxDemandObject,
  getNestedAvgDemandObject,
  sumArrayOfArrays,
  sumBaselineEnergies,
  sumPeakToAveragePowerRatios,
  sumScoreCardCarbonEmissions,
  sumOperatingTimeValues,
  convertDateStringToObject,
  convertParameterDateStringsToObjects,
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
  // Get Units First
  const changeOverLagUnits = data.devices
    .map((eachDevice) => eachDevice.score_card.change_over_lags.units)
    .filter(Boolean)[0];

  // Get Data
  const allDevicesChangeOverLagData = data.devices
    .map((eachDevice) => eachDevice.score_card.change_over_lags.data)
    .filter(Boolean)
    .flat();

  // Group data by date
  const groupedBranchChangeOverLags = allDevicesChangeOverLagData.reduce(
    function (acc, curr) {
      acc[curr.date] = acc[curr.date] || [];
      acc[curr.date].push(curr);
      return acc;
    },
    Object.create(null)
  );

  const branchChangeOverLagsData = [];

  // Add up values at each date, without adding up(or concatenating) the dates
  for (const date in groupedBranchChangeOverLags) {
    const summedChangeOverLag = groupedBranchChangeOverLags[date].reduce(
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
    branchChangeOverLagsData.push(summedChangeOverLag);
  }

  return { data: branchChangeOverLagsData, units: changeOverLagUnits };
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

/* -------------------------------------------------------------------
/* Branch Power Quality Calculations Start ---------------------------
--------------------------------------------------------------------*/
const getBranchPowerQualityData = (data) =>
  data.devices.map((eachDevice) => {
    // Check if device name includes branch name already
    const modifiedDeviceName = !eachDevice.name.includes(data.name)
      ? data.name + ' ' + eachDevice.name
      : eachDevice.name;

    const devicePowerQualityData = convertParameterDateStringsToObjects(
      eachDevice,
      'power_quality'
    );
    // Add device name to data
    devicePowerQualityData.deviceName = modifiedDeviceName;

    return devicePowerQualityData;
  });
/* -------------------------------------------------------------------
/* Branch Power Quality Calculations Start ---------------------------
--------------------------------------------------------------------*/

/* -------------------------------------------------------------------
/* Branch Last Reading Calculations Start ----------------------------
--------------------------------------------------------------------*/
const getBranchLastReadingData = (data) =>
  data.devices.map((eachDevice) => {
    // Check if device name includes branch name already
    const modifiedDeviceName = !eachDevice.name.includes(data.name)
      ? data.name + ' ' + eachDevice.name
      : eachDevice.name;

    const deviceLastReadingData = Object.assign({}, eachDevice.last_reading);
    deviceLastReadingData.date = convertDateStringToObject(
      deviceLastReadingData.date
    );
    deviceLastReadingData.deviceName = modifiedDeviceName;

    return deviceLastReadingData;
  });
/* -------------------------------------------------------------------
/* Branch Last Reading Calculations Start ----------------------------
--------------------------------------------------------------------*/

/* -------------------------------------------------------------------
/* Branch Power Demand Calculations Start ----------------------------
--------------------------------------------------------------------*/
const getBranchPowerDemandData = (data) =>
  data.devices.map((eachDevice) => {
    // Check if device name includes branch name already
    const modifiedDeviceName = !eachDevice.name.includes(data.name)
      ? data.name + ' ' + eachDevice.name
      : eachDevice.name;

    const devicePowerDemandData = convertParameterDateStringsToObjects(
      eachDevice,
      'power_demand'
    );

    const { dates, power_demand_values } = devicePowerDemandData;
    if (power_demand_values) power_demand_values.source = modifiedDeviceName;

    return { dates, ...power_demand_values };
  });
/* -------------------------------------------------------------------
/* Branch Power Demand Calculations Start ----------------------------
--------------------------------------------------------------------*/

/* -------------------------------------------------------------------
/* Branch Time of Use Calculations Start -----------------------------
--------------------------------------------------------------------*/
const getBranchTimeOfUseChartData = (data) =>
  data.devices.map((eachDevice) => {
    // Check if device name includes branch name already
    const modifiedDeviceName = !eachDevice.name.includes(data.name)
      ? data.name + ' ' + eachDevice.name
      : eachDevice.name;

    const deviceTimeOfUseChartData = convertParameterDateStringsToObjects(
      eachDevice,
      'time_of_use'
    );

    if (deviceTimeOfUseChartData)
      deviceTimeOfUseChartData.deviceName = modifiedDeviceName;

    return deviceTimeOfUseChartData;
  });

/* -------------------------------------------------------------------
/* Branch Time of Use Calculations Start -----------------------------
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
      // Power Quality Stuff
      power_quality: getBranchPowerQualityData(data),
      // Time of Use Stuff
      last_reading: getBranchLastReadingData(data),
      // Power Demand Stuff
      power_demand: getBranchPowerDemandData(data),
      // Time of Use Stuff
      time_of_use_chart: getBranchTimeOfUseChartData(data),
      time_of_use_table: [
        getModifiedBranchLevelData(data, 'time_of_use_table', data.name),
      ],
      // Cost Tracker Stuff
      cost_tracker_diesel_qty: [
        getModifiedBranchLevelData(
          data,
          'cost_tracker_qty_of_diesel',
          data.name
        ),
      ],
      cost_tracker_monthly_cost: [
        getModifiedBranchLevelData(
          data,
          'cost_tracker_monthly_cost',
          data.name
        ),
      ],
      cost_tracker_consumption: [
        getModifiedBranchLevelData(
          data,
          'cost_tracker_consumption_breakdown',
          data.name
        ),
      ],
    },
  };
};

export { getRefinedBranchData };
