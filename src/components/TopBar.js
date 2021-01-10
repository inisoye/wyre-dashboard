import React, { useContext } from 'react';
import CompleteDataContext from '../Context';
import { Link } from 'react-router-dom';
import { Select } from 'antd';

import DateTimePicker from './DateTimePicker';

import { CaretDownFilled } from '@ant-design/icons';

const { Option } = Select;

function TopBar() {
  const { isSidebarOpen, currentUrl, setPowerQualityUnit } = useContext(
    CompleteDataContext
  );

  const pagesWithoutDateTimePickers = [
    'add-bills',
    'add-equipment',
    'client-profile',
    'password',
    'alerts-and-alarms',
    'branches',
  ];

  const pagesWithTimeIntervalSelector = [
    'energy-consumption',
    'power-quality',
    'power-demand',
    'time-of-use',
  ];

  const isDateTimePickerNotDisplayed = pagesWithoutDateTimePickers.some(
    (page) => currentUrl.includes(page)
  );

  const isTimeIntervalSelectorDisplayed = pagesWithTimeIntervalSelector.some(
    (page) => currentUrl.includes(page)
  );

  const isDateTimePickerDisabled = currentUrl.includes('last-reading');

  const isPlottedUnitSelectorDisplayed = currentUrl.includes('power-quality');

  const isTopBarCostTrackerRightDisplayed = currentUrl.includes('cost-tracker');

  const isTopBarUserBranchesRightDisplayed =
    currentUrl.includes('branches') && !currentUrl.includes('user-form');

  const handleIntervalChange = (interval) => {
    console.log(interval);
  };

  const handleUnitChange = (unit) => {
    setPowerQualityUnit(unit);
  };

  return (
    <div className={isSidebarOpen ? 'top-bar' : 'top-bar h-hidden-medium-down'}>
      <div className='top-bar__left'>
        <div className={isDateTimePickerNotDisplayed ? 'h-hide' : ''}>
          <DateTimePicker isDateTimePickerDisabled={isDateTimePickerDisabled} />
        </div>

        <div
          className={
            isTimeIntervalSelectorDisplayed
              ? 'time-interval-selector-container'
              : 'time-interval-selector-container h-hide'
          }
        >
          <Select
            className='time-interval-selector h-8-br'
            defaultValue='15Mins'
            onChange={handleIntervalChange}
            suffixIcon={<CaretDownFilled />}
          >
            <Option className='time-interval-option' value='15Mins'>
              15Mins
            </Option>
            <Option className='time-interval-option' value='30Mins'>
              30Mins
            </Option>
            <Option className='time-interval-option' value='1Hour'>
              1Hour
            </Option>
            <Option className='time-interval-option' value='Daily'>
              Daily
            </Option>
            <Option className='time-interval-option' value='Weeks'>
              Weeks
            </Option>
            <Option className='time-interval-option' value='Months'>
              Months
            </Option>
          </Select>
        </div>

        <div
          className={
            isPlottedUnitSelectorDisplayed
              ? 'plotted-unit-selector-container'
              : 'plotted-unit-selector-container h-hide'
          }
        >
          <Select
            className='plotted-unit-selector h-8-br'
            defaultValue='Current (Amps)'
            suffixIcon={<CaretDownFilled />}
            onChange={handleUnitChange}
          >
            <Option className='plotted-unit-option' value='Current (Amps)'>
              Current (Amps)
            </Option>
            <Option className='plotted-unit-option' value='Voltage (Volts)'>
              Voltage (Volts)
            </Option>
            <Option className='plotted-unit-option' value='Active-Power (kW)'>
              Active-Power (kW)
            </Option>
            <Option
              className='plotted-unit-option'
              value='Reactive-Power (kVar)'
            >
              Reactive-Power (kVar)
            </Option>
            <Option className='plotted-unit-option' value='Energy (kWh)'>
              Energy (kWh)
            </Option>
          </Select>
        </div>
      </div>

      <div
        className={
          isTopBarCostTrackerRightDisplayed
            ? 'top-bar__right'
            : 'top-bar__right h-hide'
        }
      >
        <Link className='top-bar-right__button' to='/cost-tracker/add-bills'>
          Add Bills
        </Link>
        <Link
          className='top-bar-right__button'
          to='/cost-tracker/add-equipment'
        >
          Add Equipment
        </Link>
      </div>

      <div
        className={
          isTopBarUserBranchesRightDisplayed
            ? 'top-bar__right'
            : 'top-bar__right h-hide'
        }
      >
        <Link className='top-bar-right__button h-extra-padding'>
          Edit Client
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
