import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';

import CompleteDataContext from '../Context';
import dataHttpServices from '../services/devices';

const DateRange = () => {
  const { selectedDateRange } = useContext(CompleteDataContext)
  const Displaylocation = useLocation().pathname;

  const defaultDateRange = dataHttpServices.endpointDateRange;
  const defaultStartDate = defaultDateRange.split(' ');
  const reversedDate = defaultStartDate[1].split('').reverse().join('');
  const defaultEndDate = reversedDate.toString().split('', 10).reverse().join('');


   const dateRangeStyles = {
    display: 'flex',
    justifyContent: 'center'
   };

   const rangeStyles = {
     fontSize: '15px',
     fontWeight: 'bold',
   }

  return (
    <div style={dateRangeStyles}>
      {Displaylocation === '/dashboard' &&
        (selectedDateRange && selectedDateRange.length > 0 ? (
          <div style={rangeStyles}>
            <span>{selectedDateRange[0]}</span>
            <span style={{ marginLeft: '10px'}}> — </span>
            <span style={{ marginLeft: '10px'}}>{selectedDateRange[1]}</span>
          </div>
        ) : (
          <div style={rangeStyles}>
            <span>{defaultStartDate[0]}</span>
            <span style={{ marginLeft: '10px'}}> — </span>
            <span style={{ marginLeft: '10px'}}>{defaultEndDate}</span>
          </div>
        ))}
    </div>
  );
}

export default DateRange
