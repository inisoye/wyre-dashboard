import React, { useContext, useState } from 'react';

import CompleteDataContext from '../Context';

import {
  toCamelCase,
  toKebabCase,
  cloneObject,
} from '../helpers/genericHelpers';

function SidebarDevice({
  parentBranchName,
  modifiedDeviceName,
  deviceData,
  deviceDailyKwh,
  deviceMonthlyUsage,
}) {
  const [isChecked, setIsChecked] = useState(false);

  const {
    renderedDataObjects,
    setRenderedDataObjects,
    checkedItems,
    setCheckedItems,
  } = useContext(CompleteDataContext);

  const checkBoxName = toCamelCase(modifiedDeviceName);
  const checkboxId = toKebabCase(modifiedDeviceName) + '-checkbox';

  // Destructure data for device
  const {
    total_kwh,
    min_demand,
    max_demand,
    monthly_hours,
    avg_demand,
    carbon_emissions,
    cost_of_energy,
    today,
    yesterday,
  } = deviceData;

  // Place all data for device in new object
  const refinedDeviceData = {
    [modifiedDeviceName]: {
      name: modifiedDeviceName,
      total_kwh,
      min_demand,
      max_demand,
      monthly_hours,
      avg_demand,
      carbon_emissions,
      cost_of_energy,
      today,
      yesterday,
      daily_kwh: deviceDailyKwh,
      usage_hours: deviceMonthlyUsage,
    },
  };

  const handleCheck = (event) => {
    setIsChecked(!isChecked);

    /* isChecked will remain falsy when this bit runs.
    /* This is due to the asynchronous nature of the useState hook.
    /* The initial changed value is accessible outside this function
    */
    if (!isChecked) {
      setRenderedDataObjects({
        ...renderedDataObjects,
        ...refinedDeviceData,
      });

      setCheckedItems({
        ...checkedItems,
        [modifiedDeviceName]: true,
      });
    } else {
      const modifiedRenderedDataObjects = cloneObject(renderedDataObjects);
      delete modifiedRenderedDataObjects[modifiedDeviceName];
      setRenderedDataObjects({
        ...modifiedRenderedDataObjects,
      });

      const modifiedCheckedItems = cloneObject(checkedItems);
      delete modifiedCheckedItems[modifiedDeviceName];
      setCheckedItems({
        ...modifiedCheckedItems,
      });
    }
  };

  return (
    <li>
      <div>
        <input
          type='checkbox'
          name={checkBoxName}
          id={checkboxId}
          onChange={handleCheck}
        />
        <label htmlFor={checkboxId}>{deviceData.name}</label>
      </div>
    </li>
  );
}

export default SidebarDevice;
