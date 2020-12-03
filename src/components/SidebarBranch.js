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
  sumArrayofArrays,
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
          // Add parent branch name to make each device name unique
          const modifiedDeviceName = branchData.name + ' ' + eachDevice.name;
          const deviceDailyKwh = {
            dates: branchData.daily_kwh.dates,
            [modifiedDeviceName]: branchData.daily_kwh[eachDevice.name],
          };

          const branchMonthlyUsage = branchData.usage_hours;
          const deviceIndex = branchMonthlyUsage.devices.indexOf(
            eachDevice.name
          );
          const deviceMonthlyUsage = {
            // Use modified device name
            devices: [
              branchData.name + ' ' + branchMonthlyUsage.devices[deviceIndex],
            ],
            hours: [branchMonthlyUsage.hours[deviceIndex]],
          };

          return (
            <SidebarDevice
              parentBranchName={branchData.name}
              modifiedDeviceName={modifiedDeviceName}
              deviceData={eachDevice}
              deviceDailyKwh={deviceDailyKwh}
              deviceMonthlyUsage={deviceMonthlyUsage}
              key={eachDevice.id}
            />
          );
        })
      : '';

  /*-----------------
   Obtain daily energy data for branch
  ----------------*/
  let branchDailyKwh = branchData.daily_kwh;
  // Add total
  const { dates, ...rest } = branchDailyKwh;
  const allDevicesDailyKwh = Object.values(rest);
  const totalBranchDailyKwh = sumArrayofArrays(allDevicesDailyKwh);
  branchDailyKwh[branchData.name] = totalBranchDailyKwh;
  /*-----------------
   Obtain daily energy data for branch ends
  ----------------*/

  /*-----------------
   Obtain monthly usage data for branch
  ----------------*/
  const { usage_hours } = branchData;
  /*-----------------
   Obtain monthly usage data for branch ends
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
      usage_hours: usage_hours,
      daily_kwh: branchDailyKwh,
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
    <li className='sidebar-branch'>
      <div className='sidebar-branch__details'>
        <div>
          <input
            className='sidebar-branch__checkbox'
            type='checkbox'
            name={checkBoxName}
            id={checkboxId}
            onChange={handleCheck}
          />
          <label htmlFor={checkboxId}>{branchData.name}</label>
        </div>
        {branchData.devices ? (
          <button className='sidebar-branch__button' onClick={handleToggle}>
            {Icon}
          </button>
        ) : (
          ''
        )}
      </div>

      <ul className='sidebar-branch__devices'>{deviceComponents}</ul>
    </li>
  );
}

export default SidebarBranch;
