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
            'This Week': [moment().startOf('week'), moment().endOf('week')],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'This Quarter': [
              moment().quarter(moment().quarter()).startOf('quarter'),
              moment().quarter(moment().quarter()).endOf('quarter'),
            ],
            'This Year': [moment().startOf('year'), moment().endOf('year')],
          }}
        />
      </Space>
    </>
  );
}

export default DateTimePicker;
