import React, { useState, useContext } from 'react';

import CompleteDataContext from '../Context';

import SidebarDevice from './SidebarDevice';

import ChevronDown from '../icons/ChevronDown';
import ChevronUp from '../icons/ChevronUp';

import {
  toCamelCase,
  toKebabCase,
  sumValuesUp,
  getMinDemandObject,
  getMaxDemandObject,
  getAvgDemandObject,
  cloneObject,
} from '../helpers/genericHelpers';

function SidebarBranch({ branchData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    renderedDataObjects,
    setRenderedDataObjects,
    checkedItems,
    setCheckedItems,
  } = useContext(CompleteDataContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const Icon = isOpen ? <ChevronUp /> : <ChevronDown />;
  const checkBoxName = toCamelCase(branchData.name);
  const checkboxId = toKebabCase(branchData.name) + '-checkbox';

  const deviceComponents =
    branchData.devices && isOpen
      ? branchData.devices.map((eachDevice) => {
          const deviceDailyData = branchData.daily_kwh.map((eachDay) => {
            // Add parent branch name to make each device name unique
            const modifiedDeviceName = branchData.name + ' ' + eachDevice.name;
            return {
              date: eachDay.date,
              [modifiedDeviceName]: eachDay[eachDevice.name],
            };
          });

          return (
            <SidebarDevice
              parentBranchName={branchData.name}
              deviceData={eachDevice}
              deviceDailyData={deviceDailyData}
              key={eachDevice.id}
            />
          );
        })
      : '';

  /*-----------------
   Obtain daily data for branch
  ----------------*/
  const branchDailyData = branchData.daily_kwh.map((eachDay) => {
    const { date, ...rest } = eachDay;

    const allDevicesDailyData = Object.values(rest);
    const devicesDailyDataSum = allDevicesDailyData.reduce(
      (acc, curr) => acc + curr,
      0
    );

    return {
      date: date,
      [branchData.name]: devicesDailyDataSum,
    };
  });
  /*-----------------
   Obtain daily data for branch ends
  ----------------*/

  /*-----------------
   Obtain energy data for branch
  ----------------*/
  // Place energy value names of one device and place in array
  // Ensure 'name' and 'id' are excluded form values placed in the array
  const energyValueNames = Object.keys(branchData.devices[0]).filter(
    (eachName) =>
      !['name', 'id', 'avg_demand', 'min_demand', 'max_demand'].includes(
        eachName
      )
  );

  //  Use the energy value names to create an object with the branch's energy data
  let branchEnergyData = {};

  energyValueNames.forEach((eachName) => {
    return (branchEnergyData[eachName] = sumValuesUp(
      branchData.devices,
      eachName
    ));
  });

  branchEnergyData.min_demand = getMinDemandObject(branchData.devices);
  branchEnergyData.max_demand = getMaxDemandObject(branchData.devices);
  branchEnergyData.avg_demand = getAvgDemandObject(branchData.devices);
  /*-----------------
   Obtain energy data for branch ends
  ----------------*/

  const refinedBranchData = {
    [branchData.name]: {
      name: branchData.name,
      ...branchEnergyData,
      daily_data: branchDailyData,
    },
  };

  const handleCheck = (event) => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      // Add this branch to list of rendered objects when checked
      setRenderedDataObjects({
        ...renderedDataObjects,
        ...refinedBranchData,
      });

      // Add this branch to list of checked items
      setCheckedItems({
        ...checkedItems,
        [branchData.name]: true,
      });
    } else {
      // Delete this branch to list of rendered objects (and checked items) when unchecked
      const modifiedRenderedDataObjects = cloneObject(renderedDataObjects);
      delete modifiedRenderedDataObjects[branchData.name];
      setRenderedDataObjects({
        ...modifiedRenderedDataObjects,
      });

      const modifiedCheckedItems = cloneObject(checkedItems);
      delete modifiedCheckedItems[branchData.name];
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
        <label htmlFor={checkboxId}>{branchData.name}</label>
        {branchData.devices ? (
          <button onClick={handleToggle}>{Icon}</button>
        ) : (
          ''
        )}
      </div>

      <ul>{deviceComponents}</ul>
    </li>
  );
}

export default SidebarBranch;
