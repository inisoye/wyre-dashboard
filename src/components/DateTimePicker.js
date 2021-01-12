import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

function DateTimePicker({ isDateTimePickerDisabled }) {
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
          disabled={isDateTimePickerDisabled}
          ranges={{
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, 'days'),
              moment().subtract(1, 'days'),
            ],
            'Past Week': [moment().subtract(7, 'days'), moment()],
            'Past Month': [moment().subtract(1, 'months'), moment()],
            'Past Quarter': [moment().subtract(3, 'months'), moment()],
            'Past Half Year': [moment().subtract(6, 'months'), moment()],
            'Past Year': [moment().subtract(1, 'years'), moment()],
          }}
        />
      </Space>
    </>
  );
}

export default DateTimePicker;
