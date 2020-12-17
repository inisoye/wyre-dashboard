import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

function DateTimePicker({ isDateTimePickerHidden }) {
  return (
    <>
      <Space
        className='date-range-picker-containers'
        direction='vertical'
        size={12}
      >
        <RangePicker
          className='date-range-picker'
          showTime={{ format: 'HH:mm' }}
          format='DD-MM-YYYY HH:mm'
          onChange={onChange}
          onOk={onOk}
          disabled={isDateTimePickerHidden}
        />
      </Space>
    </>
  );
}

export default DateTimePicker;
