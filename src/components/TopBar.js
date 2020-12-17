import React, { useContext } from 'react';
import CompleteDataContext from '../Context';
import { Select } from 'antd';

import DateTimePicker from './DateTimePicker';

import { CaretDownFilled } from '@ant-design/icons';

const { Option } = Select;

function TopBar() {
  const { isSidebarOpen, currentUrl } = useContext(CompleteDataContext);

  const isDateTimePickerHidden = currentUrl.includes('last-reading');

  const pagesWithTimeIntervalSelector = [
    'energy-consumption',
    'power-quality',
    'power-demand',
    'time-of-use',
  ];

  const isTimeIntervalSelectorDisplayed = pagesWithTimeIntervalSelector.some(
    (page) => currentUrl.includes(page)
  );

  const isPlottedUnitSelectorDisplayed = currentUrl.includes('power-quality');

  return (
    <div className={isSidebarOpen ? 'top-bar' : 'top-bar h-hidden-medium-down'}>
      <div>
        <DateTimePicker isDateTimePickerHidden={isDateTimePickerHidden} />
      </div>

      <div
        className={
          isTimeIntervalSelectorDisplayed
            ? 'time-interval-selector-container'
            : 'time-interval-selector-container h-hide'
        }
      >
        <Select
          className='time-interval-selector'
          defaultValue='15Mins'
          // style={{ width: 120 }}
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
          className='plotted-unit-selector'
          defaultValue='Current (Amps)'
          suffixIcon={<CaretDownFilled />}
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
          <Option className='plotted-unit-option' value='Reactive-Power (kVar)'>
            Reactive-Power (kVar)
          </Option>
          <Option className='plotted-unit-option' value='Energy (kWh)'>
            Energy (kWh)
          </Option>
          <Option className='plotted-unit-option' value='Months'>
            Months
          </Option>
        </Select>
      </div>
    </div>
  );
}

export default TopBar;
