import dayjs from 'dayjs';

/* --------------------------------------------------------------------
/* Completely Generic Helpers ------------------------------------------
--------------------------------------------------------------------*/

function removeDuplicateDatas(value, index, self) {
  return self.indexOf(value) === index;
}


const mergeTheData = (arr) => {
      return [...new Set([].concat(...arr))];
}

const truncateEmail = (str, num)=>{
  if(str.length <= num)
  {
    return str
  }
  return str.slice(0,num) + '...'
}

const toCamelCase = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');

const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

const toSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('_');

const cloneObject = (object) => Object.assign({}, object);

const getLastArrayItems = (array, numberOfItems) => {
  return array.slice(Math.max(array.length - numberOfItems, 0));
};

//checkIsGenStatus
const checkIsGenStatus = (data) => {
  const checkStatus = data.filter(Boolean);
  return checkStatus.length
}


const daysInMonth = () => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  //const numberOfDaysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();
  return new Date(currentYear, currentMonth+1, 0).getDate();
}

/*
 * Sum up values a the same index in each array found in a wrapper array
 * @param  {Array}   arrayOfArrays  an array which contains other arrays of numbers
 */
const sumArrayOfArrays = (arrayOfArrays) =>
  arrayOfArrays.reduce((acc, curr) => {
    curr.forEach((innerArrayItem, index) => {
      acc[index] = (acc[index] || 0) + innerArrayItem;
    });
    return acc;
  }, []);

const calculateRatio = (avg, peak) => {
  let peak_ratio =  Number(avg)/Number(peak)

  if(peak_ratio && isFinite(peak_ratio)){
    return peak_ratio.toFixed(2)
  }
  return 0;
}

const getPeakToAverageMessage = (peakRatio) => {
  let peakMessage;
  let peakMessageColor;
  if (peakRatio > 0.7){
    peakMessage = 'Efficient';
    peakMessageColor = '#008000';
  }else if (peakRatio >= 0.5){
    peakMessage = 'Fairly efficient';
    peakMessageColor = '#FFBF00';
  }else{
    peakMessage = 'Inefficient - Higher is better';
    peakMessageColor = '#fa0303';
  }
  return {message: peakMessage, color: peakMessageColor}
}

const getBaselineEnergyColor = (inbound) => {
  let peakMessageColor;
  if (Number(inbound) > 0){
    peakMessageColor = '#008000';
  }else{
    peakMessageColor = '#fa0303';
  }
  return {color: peakMessageColor}
}

const calculatePercentage = (num_1, num_2) => { 
  const percentage = ((num_1 / num_2) * 100).toFixed() || 0;

  if (isNaN(percentage)) {
    return 0;
  }
  return percentage 
};
// -------------------------------------------------------------------

// -------------------------------------------------------------------

// -------------------------------------------------------------------

// -------------------------------------------------------------------

// 
/**
 * @description nadd the usage hour to the device
 * @param {*} branch the branch
 * @param {*} deviceName the name of the device
 * @returns the usage hours of the int
 */
const addUsageHoursToDevice = (branch, deviceName) => {
  const index = branch.usage_hours.devices.findIndex((item) => deviceName === item);
  return branch.usage_hours.hours[index]
}

const getAllOrganizationDevices = (data) => {
  return (
    data.branches &&
    data.branches
      .map((eachBranch) => {
        // Add branch name to each device name
        eachBranch.devices.forEach((device) => {
          // Prevent process from repeating several times
          if (!device.name.includes(eachBranch.name)){
            device.usage_hour = addUsageHoursToDevice(eachBranch, device.name, eachBranch.name)
            device.deviceName = device.name;
            device.name = eachBranch.name + ' ' + device.name;
            device.branchName = eachBranch.name;
          }
        });
              
        return eachBranch.devices;
      })
      .flat()
  );
};



const getModifiedBranchLevelData = (branchData, propertyName, branchName) => {
  const branchLevelDataOfProperty = branchData && branchData[propertyName];

  // Add name to data
  return {
    ...branchLevelDataOfProperty,
    branchName: branchName,
  };
};

// -------------------------------------------------------------------

// -------------------------------------------------------------------

// -------------------------------------------------------------------

// -------------------------------------------------------------------

/* --------------------------------------------------------------------
/* Dashboard Helpers Begin ------------------------------------------
Note: Although the dash helpers are named with generic names, they are
hardly used in any other section
--------------------------------------------------------------------*/
/*
 * Sum up values (for one value type) nested deep within an array of objects.
 * Output shape: {unit: "kwh", value: outputNumber}
 * @param  {Array}   array  an array of objects
 * @param  {String}  the name of the value needed in the output
 */
const sumObjectValuesUp = (array, valueName) => {
  // Pick out values and place them in array(s)
  const valuesArray = array.map(
    (eachItem) => eachItem[valueName] && eachItem[valueName].value
  );

  const unitsArray = array.map(
    (eachItem) => eachItem[valueName] && eachItem[valueName].unit
  );

  // Sum up values in each array
  const valuesTotal = valuesArray.reduce((acc, curr) => acc + curr, 0);

  return { unit: unitsArray[0], value: valuesTotal };
};

// Same as a above but for an even deeper nested object within an array.
const sumNestedObjectValuesUp = (array, nestedObject, valueName) => {
  // Pick out values and place them in array(s)
  const valuesArray = array.map(
    (eachItem) =>
      eachItem[nestedObject][valueName] &&
      eachItem[nestedObject][valueName].value
  );

  const unitsArray = array.map(
    (eachItem) =>
      eachItem[nestedObject][valueName] &&
      eachItem[nestedObject][valueName].unit
  );

  // Sum up values in each array
  const valuesTotal = valuesArray.reduce((acc, curr) => acc + curr, 0);

  return { unit: unitsArray[0], value: valuesTotal };
};

const getMinDemandObject = (array) => {
  const valuesArray = array.map((eachItem) => eachItem.min_demand.value);

  //Obtain min demand of all min demands
  const valuesArrayMin = Math.min.apply(null, valuesArray);

  return { unit: 'kw', value: valuesArrayMin };
};

const getNestedMinDemandObject = (array, nestedObject) => {
  const valuesArray = array.map(
    (eachItem) => eachItem[nestedObject].min_demand.value
  );

  //Obtain min demand of all min demands
  const valuesArrayMin = Math.min.apply(null, valuesArray);

  return { unit: 'kw', value: valuesArrayMin };
};

const getMaxDemandObject = (array) => {
  const valuesArray = array.map((eachItem) => eachItem.max_demand.value);

  //Obtain max demand of all max demands
  const valuesArrayMax = Math.max.apply(null, valuesArray);

  return { unit: 'kw', value: valuesArrayMax };
};

const getNestedMaxDemandObject = (array, nestedObject) => {
  const valuesArray = array.map(
    (eachItem) => eachItem[nestedObject].max_demand.value
  );

  //Obtain max demand of all max demands
  const valuesArrayMax = Math.max.apply(null, valuesArray);

  return { unit: 'kw', value: valuesArrayMax };
};

const getAvgDemandObject = (array) => {
  const valuesArray = array.map((eachItem) => eachItem.avg_demand.value);

  //Obtain avg demand of all avg demands
  const valuesArrayAvg =
    valuesArray.reduce((acc, curr) => acc + curr, 0) / valuesArray.length;

  return { unit: 'kw', value: valuesArrayAvg };
};

const getNestedAvgDemandObject = (array, nestedObject) => {
  const valuesArray = array.map(
    (eachItem) => eachItem[nestedObject].avg_demand.value
  );

  //Obtain avg demand of all avg demands
  const valuesArrayAvg =
    valuesArray.reduce((acc, curr) => acc + curr, 0) / valuesArray.length;

  return { unit: 'kw', value: valuesArrayAvg };
};

const allDeviceGenerators = (checkedItems, organization) => {

  let holdAllDevices = [];
  const checkedItemsArray = Object.keys(checkedItems);

  checkedItemsArray.map((name) => {
    organization.branches.forEach((eachBranch) => {
      if (eachBranch.name === name) {
        holdAllDevices = [...holdAllDevices, ...eachBranch.devices];
      }
      else if (name.startsWith(eachBranch.name) && (name.length > eachBranch.name.length)
      ) {
        eachBranch.devices.some((device) => {
          if (device.name === name) {
            holdAllDevices.push(device);
            return false;
          }
        })
      }
    })
  })
  return holdAllDevices;
}
/* --------------------------------------------------------------------
/* Dashboard Helpers End --------------------------------------------
--------------------------------------------------------------------*/

// -------------------------------------------------------------------

// -------------------------------------------------------------------

// -------------------------------------------------------------------

// -------------------------------------------------------------------

/* --------------------------------------------------------------------
/* Score Card Helpers Begin ------------------------------------------
--------------------------------------------------------------------*/
const sumBaselineEnergies = (array) => {
  const forecastValues = array.map((eachItem) => eachItem.forecast);
  const usedValues = array.map((eachItem) => eachItem.used);
  const forecastTotal = forecastValues.reduce((acc, curr) => acc + curr, 0);
  const usedTotal = usedValues.reduce((acc, curr) => acc + curr, 0);

  return { unit: 'kwh', forecast: forecastTotal, used: usedTotal };
};

const sumPeakToAveragePowerRatios = (array) => {
  const peakValues = array.map((eachItem) => eachItem.peak);
  const avgValues = array.map((eachItem) => eachItem.avg);

  const peakOfPeakValues = Math.max.apply(null, peakValues);
  const avgOfAvgValues =
    avgValues.reduce((acc, curr) => acc + curr, 0) / avgValues.length;

  return { unit: 'kw', peak: peakOfPeakValues, avg: avgOfAvgValues };
};

const sumScoreCardCarbonEmissions = (array) => {
  const estimatedValues = array.map((eachItem) => eachItem.estimated_value);
  const actualValues = array.map((eachItem) => eachItem.actual_value);

  const estimatedTotal = estimatedValues.reduce((acc, curr) => acc + curr, 0);
  const actualTotal = actualValues.reduce((acc, curr) => acc + curr, 0);

  return {
    unit: 'tons',
    estimated_value: estimatedTotal,
    actual_value: actualTotal,
  };
};

const joinChangeOverLagsValues = (parentArray, nestedValue) => {
  return parentArray
    .map(
      (eachDevice) =>
        eachDevice.score_card.change_over_lags &&
        eachDevice.score_card.change_over_lags[nestedValue].values
    )
    .filter(Boolean);
};

const sumOperatingTimeValues = (parentArray, nestedValueName) => {
  return parentArray
    .map(
      (eachDevice) =>
        eachDevice.score_card.operating_time[nestedValueName] &&
        eachDevice.score_card.operating_time[nestedValueName].value
    )
    .filter(Boolean)
    .reduce((acc, curr) => acc + curr, 0);
};
// round decimple to the legth specifile
const roundToDecimalPLace = (number, length) => (!Number.isInteger(number) 
  ? number.toFixed(length) : number);

const sumOfArrayElements = (array) => array.reduce((acc, curr) => acc + Number(curr), 0)

/* --------------------------------------------------------------------
/* Score Card Helpers End -------------------------------------------
--------------------------------------------------------------------*/

// -------------------------------------------------------------------

// -------------------------------------------------------------------

// -------------------------------------------------------------------

// -------------------------------------------------------------------

/* --------------------------------------------------------------------
/* Parameters Helpers Start-------------------------------------------
--------------------------------------------------------------------*/
// DayJS chosen for browser compatibility (and consistency) issues with native date objects.
const convertDateStringToObject = (dateString) => {
  return dayjs(dateString);
};

const convertDateStringsToObjects = (dateStrings) => {
  return dateStrings.map((eachDate) => dayjs(eachDate));
};

const formatParametersDatetimes = (dateStrings) => {
  return dateStrings.map((eachDate) => eachDate.format('DD/MM/YYYY h:mm A'));
};

const formatParametersDates = (dateStrings) => {
  return dateStrings.map((eachDate) => eachDate.format('DD/MM/YYYY'));
};

const formatParametersTimes = (dateStrings) => {
  return dateStrings.map((eachDate) => eachDate.format('hh:mm A'));
};

const formatParameterTableData = (tableHeadings, tableValues) => {
  const tableValuesWithHeadings =
    tableValues[0] &&
    tableValues.map((eachArray, index1) => {
      return eachArray.map((eachItem) => {
        return {
          [tableHeadings[index1]]: eachItem,
        };
      });
    });

  const formattedTableData =
    tableValuesWithHeadings &&
    tableValuesWithHeadings.reduce((acc, currArray) => {
      currArray.forEach((eachItem, index) => {
        acc[index] = { ...acc[index], ...eachItem };
      });

      return acc;
    }, []);

  const formattedTableDataWithIndex =
    formattedTableData &&
    formattedTableData.map(function (currentValue, index) {
      currentValue.index = index + 1;
      return currentValue;
    });

  return formattedTableDataWithIndex;
};

const convertParameterDateStringsToObjects = (deviceData, parameterName) => {
  // Create a copy of original parameter data
  const parameterData = Object.assign({}, deviceData[parameterName]);
  const { dates } = parameterData;

  // Convert dates to objects for easy manipulation
  const parameterDateObjects = convertDateStringsToObjects(
    dates.dates || dates
  );
  // Add date objects and device name to data
  parameterData.dates = parameterDateObjects;

  return { ...parameterData, dates: parameterDateObjects };
};
/* -------------------------------------------------------------------
/* Parameter Helpers End ---------------------------------------------
--------------------------------------------------------------------*/

export {
  daysInMonth,
  getPeakToAverageMessage,
  getBaselineEnergyColor,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  checkIsGenStatus,
  sumArrayOfArrays,
  calculateRatio,
  calculatePercentage,
  getAllOrganizationDevices,
  sumObjectValuesUp,
  sumNestedObjectValuesUp,
  getModifiedBranchLevelData,
  getMinDemandObject,
  getMaxDemandObject,
  getAvgDemandObject,
  getNestedMinDemandObject,
  getNestedMaxDemandObject,
  getNestedAvgDemandObject,
  cloneObject,
  getLastArrayItems,
  sumBaselineEnergies,
  sumPeakToAveragePowerRatios,
  sumScoreCardCarbonEmissions,
  joinChangeOverLagsValues,
  sumOperatingTimeValues,
  convertDateStringToObject,
  convertDateStringsToObjects,
  formatParametersDatetimes,
  formatParametersDates,
  formatParametersTimes,
  formatParameterTableData,
  convertParameterDateStringsToObjects,
  removeDuplicateDatas,
  truncateEmail,
  mergeTheData,
  allDeviceGenerators,
  roundToDecimalPLace,
  sumOfArrayElements
};
