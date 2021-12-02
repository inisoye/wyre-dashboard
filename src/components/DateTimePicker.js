import React, { useContext } from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

import CompleteDataContext from '../Context';

import dataHttpServices from '../services/devices';

const { RangePicker } = DatePicker;

function DateTimePicker({ isDateTimePickerDisabled }) {
  const {
    setUserDateRange,
    setSelectedDateRange
  } = useContext(CompleteDataContext);

  function onChange(value, dateString) {
    setUserDateRange(value);
    setSelectedDateRange(dateString);
    dataHttpServices.setEndpointDateRange(value);
  }

  function onOk(value) {
    setUserDateRange(value);
    dataHttpServices.setEndpointDateRange(value);
  }

  return (
    <>
      <Space
        className="date-range-picker-containers"
        direction="vertical"
        size={12}
      >
        <RangePicker
          className="date-range-picker"
          showTime={{
            format: 'HH:mm',
            defaultValue: [moment('00:00:00', 'HH:mm:ss')],
          }}
          format="DD-MM-YYYY HH:mm"
          onChange={onChange}
          onOk={onOk}
          disabled={isDateTimePickerDisabled}
          ranges={{
            Today: [moment().startOf('day'), moment()],
            'Past 24 Hours': [moment('00:00:00', 'HH:mm:ss').subtract(1, 'days'), moment()],
            'Past Week': [moment('00:00:00', 'HH:mm:ss').subtract(7, 'days'), moment()],
            'Past Month': [moment('00:00:00', 'HH:mm:ss').subtract(1, 'months'), moment()],
            'Past Three Months': [moment('00:00:00', 'HH:mm:ss').subtract(3, 'months'), moment()],
            'Past Half Year': [moment('00:00:00', 'HH:mm:ss').subtract(6, 'months'), moment()],
            'Past Year': [moment('00:00:00', 'HH:mm:ss').subtract(1, 'years'), moment()],
            'This Week': [moment('00:00:00', 'HH:mm:ss').startOf('week'), moment()],
            'This Month': [moment('00:00:00', 'HH:mm:ss').startOf('month'), moment()],
            'This Quarter': [
              moment().quarter(moment().quarter()).startOf('quarter'),
              moment(),
            ],
            'This Year': [moment('00:00:00', 'HH:mm:ss').startOf('year'), moment()],
          }}
        />
      </Space>
    </>
  );
}

export default DateTimePicker;
