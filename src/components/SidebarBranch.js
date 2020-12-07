import React, { useState, useContext } from 'react';

import CompleteDataContext from '../Context';

import SidebarDevice from './SidebarDevice';

import ChevronDown from '../icons/ChevronDown';
import ChevronUp from '../icons/ChevronUp';

import {
  toCamelCase,
  toKebabCase,
  cloneObject,
} from '../helpers/genericHelpers';
import { getRefinedBranchData } from '../helpers/branchDataHelpers';

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
          const modifiedDeviceName = !eachDevice.name.includes(branchData.name)
            ? branchData.name + ' ' + eachDevice.name
            : eachDevice.name;

          // Creates name with parent branch name removed
          const originalDeviceName = eachDevice.name
            .replace(branchData.name, '')
            .trim();

          const deviceDailyKwh = {
            dates: branchData.daily_kwh.dates,
            [modifiedDeviceName]: branchData.daily_kwh[originalDeviceName],
          };

          const branchMonthlyUsage = branchData.usage_hours;
          const deviceIndex = branchMonthlyUsage.devices.indexOf(
            originalDeviceName
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
              originalDeviceName={originalDeviceName}
              modifiedDeviceName={modifiedDeviceName}
              deviceData={eachDevice}
              deviceDailyKwh={deviceDailyKwh}
              deviceMonthlyUsage={deviceMonthlyUsage}
              key={eachDevice.id}
            />
          );
        })
      : '';

  const refinedBranchData = getRefinedBranchData(branchData);

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
