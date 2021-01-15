import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

import dataHttpServices from '../services/devices';

const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
  dataHttpServices.updateEndpointDateRange(value);
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
            'Past Three Months': [moment().subtract(3, 'months'), moment()],
            'Past Half Year': [moment().subtract(6, 'months'), moment()],
            'Past Year': [moment().subtract(1, 'years'), moment()],
            'This Week': [moment().startOf('week'), moment()],
            'This Month': [moment().startOf('month'), moment()],
            'This Quarter': [
              moment().quarter(moment().quarter()).startOf('quarter'),
              moment(),
            ],
            'This Year': [moment().startOf('year'), moment()],
          }}
        />
      </Space>
    </>
  );
}

export default DateTimePicker;
