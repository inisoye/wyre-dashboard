import {
  sumArrayOfArrays,
  sumObjectValuesUp,
  getMinDemandObject,
  getMaxDemandObject,
  getAvgDemandObject,
  sumBaselineEnergies,
  sumPeakToAveragePowerRatios,
  sumScoreCardCarbonEmissions,
} from './genericHelpers';

/* -------------------------------------------------------------------
/* Dashboard Calculations Begin --------------------------------------
--------------------------------------------------------------------*/
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
      return (refinedEnergyData[eachName] = sumObjectValuesUp(
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
/* -------------------------------------------------------------------
/* Dashboard Calculations End ----------------------------------------
--------------------------------------------------------------------*/

/* -------------------------------------------------------------------
/* Score Card Calculations Begin -------------------------------------
--------------------------------------------------------------------*/
// Baseline Energies
const getSelectionBaselineEnergy = (data) => {
  const baselineEnergiesArray = data.map(
    (eachSelection) => eachSelection.baseline_energy
  );

  return sumBaselineEnergies(baselineEnergiesArray);
};

// Peak to Average Power Ratios
const getSelectionPeakToAveragePowerRatio = (data) => {
  const peakToAveragePowerRatioArray = data.map(
    (eachSelection) => eachSelection.peak_to_avg_power_ratio
  );

  return sumPeakToAveragePowerRatios(peakToAveragePowerRatioArray);
};

// Score Card Carbon Emissions
const getSelectionScoreCardCarbonEmissions = (data) => {
  const scoreCardCarbonEmissionsArray = data.map(
    (eachSelection) => eachSelection.score_card_carbon_emissions
  );

  return sumScoreCardCarbonEmissions(scoreCardCarbonEmissionsArray);
};

// Generator Size Efficiency
const getSelectionGeneratorSizeEfficiencyArray = (data) => {
  const nestedSelectedEfficiencies = data.map((eachSelection) =>
    eachSelection.generator_size_efficiency
      ? {
          name: eachSelection.name,
          ...eachSelection.generator_size_efficiency,
        }
      : false
  );

  const flattenedSelectedEfficiencies = nestedSelectedEfficiencies
    .map((eachSelection) => {
      // Remove falsy values, selection names
      return Object.values(eachSelection).filter(
        (eachItem) => typeof eachItem === 'object'
      );
    })
    // flatten
    .flat();

  // Remove duplicates with ES6 Sets
  const selectedEfficienciesSet = new Set();

  return flattenedSelectedEfficiencies.filter((item) => {
    const duplicate = selectedEfficienciesSet.has(item.name);
    selectedEfficienciesSet.add(item.name);
    return !duplicate;
  });
};

// Change Over Lags
const getSelectionChangeOverLags = (data) => {
  // Pick out dates for first device that is not false(a utility)
  const selectionLagsDates = data
    .map(
      (eachItem) =>
        eachItem.change_over_lags && eachItem.change_over_lags.dates.values
    )
    .filter(Boolean)[0];

  const dieselUnitLitrePrice = data
    .map(
      (eachItem) =>
        eachItem.change_over_lags &&
        eachItem.change_over_lags.diesel_cost.diesel_litre_price
    )
    .filter(Boolean)[0];

  // create custom joiner function (excludes 'score-card' nesting)
  const joinChangeOverLagsValues = (parentArray, nestedValue) => {
    return parentArray
      .map(
        (eachSelection) =>
          eachSelection.change_over_lags &&
          eachSelection.change_over_lags[nestedValue].values
      )
      .filter(Boolean);
  };

  const allSelectionsLagValues = joinChangeOverLagsValues(data, 'lags');
  const selectionLagValues = {
    values: sumArrayOfArrays(allSelectionsLagValues),
    unit: 'minutes',
  };

  const allSelectionsDieselCostValues = joinChangeOverLagsValues(
    data,
    'diesel_cost'
  );
  const selectionDieselCostValues = {
    values: sumArrayOfArrays(allSelectionsDieselCostValues),
    unit: 'litres',
    diesel_litre_price: dieselUnitLitrePrice,
  };

  return {
    dates: { values: selectionLagsDates, unit: 'date' },
    lags: selectionLagValues,
    diesel_cost: selectionDieselCostValues,
  };
};

// Operating Time
const getSelectionOperatingTime = (data) => {
  const selectionOperatingTimeDates = data.map(
    (eachSelection) => eachSelection.operating_time.chart.dates
  )[0];

  const allSelectionsOperatingTimeValues = data.map(
    (eachSelection) => eachSelection.operating_time.chart.values
  );
  const selectionOperatingTimeValues = sumArrayOfArrays(
    allSelectionsOperatingTimeValues
  );

  // recreate function (exclude 'score-card' nesting)
  const sumOperatingTimeValues = (parentArray, nestedValueName) => {
    return parentArray
      .map(
        (eachSelection) =>
          eachSelection.operating_time[nestedValueName] &&
          eachSelection.operating_time[nestedValueName].value
      )
      .filter(Boolean)
      .reduce((acc, curr) => acc + curr, 0);
  };

  const selectionEstimatedTimeWasted = sumOperatingTimeValues(
    data,
    'estimated_time_wasted'
  );
  const selectionEstimatedDieselWasted = sumOperatingTimeValues(
    data,
    'estimated_diesel_wasted'
  );
  const selectionEstimatedDieselCost = sumOperatingTimeValues(
    data,
    'estimated_cost'
  );

  return {
    chart: {
      dates: selectionOperatingTimeDates,
      values: selectionOperatingTimeValues,
    },
    estimated_time_wasted: {
      unit: 'hours',
      value: selectionEstimatedTimeWasted,
    },
    estimated_diesel_wasted: {
      unit: 'litres',
      value: selectionEstimatedDieselWasted,
    },
    estimated_cost: {
      unit: 'naira',
      value: selectionEstimatedDieselCost,
    },
  };
};

// Fuel Consumption
const getSelectionFuelConsumptionArray = (data) => {
  const nestedFuelConsumptions = data.map((eachSelection) => {
    return eachSelection.fuel_consumption
      ? eachSelection.fuel_consumption
      : false;
  });

  const flattenedFuelConsumptions = nestedFuelConsumptions
    .map((eachSelection) => {
      // Remove falsy values, selection names
      return Object.values(eachSelection).filter(
        (eachItem) => typeof eachItem === 'object'
      );
    })
    // flatten
    .flat();

  // Remove duplicates with ES6 Sets
  const selectedFuelConsumptionsSet = new Set();

  return flattenedFuelConsumptions.filter((item) => {
    const duplicate = selectedFuelConsumptionsSet.has(item.name);
    selectedFuelConsumptionsSet.add(item.name);
    return !duplicate;
  });
};

/* -------------------------------------------------------------------
/* Score Card Calculations Begin -------------------------------------
--------------------------------------------------------------------*/

const getRenderedData = (data) => {
  return {
    // Dashboard Stuff
    ...getRefinedEnergyData(data),
    daily_kwh: getSelectionDailyKwh(data),
    usage_hours: getSelectionMonthlyUsage(data),
    // Score Card Stuff
    baseline_energy: getSelectionBaselineEnergy(data),
    peak_to_avg_power_ratio: getSelectionPeakToAveragePowerRatio(data),
    score_card_carbon_emissions: getSelectionScoreCardCarbonEmissions(data),
    generator_size_efficiency: getSelectionGeneratorSizeEfficiencyArray(data),
    change_over_lags: getSelectionChangeOverLags(data),
    operating_time: getSelectionOperatingTime(data),
    fuel_consumption: getSelectionFuelConsumptionArray(data),
  };
};

export { getRenderedData };
