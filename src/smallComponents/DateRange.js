import React, { useContext } from 'react';
import dayjs from 'dayjs';
// import { useLocation } from 'react-router-dom';

import CompleteDataContext from '../Context';
import dataHttpServices from '../services/devices';

const DateRange = () => {
  const { selectedDateRange, userDateRange } = useContext(CompleteDataContext)
        
  const defaultDateRange = dataHttpServices.endpointDateRange;
  const defaultStartDate = defaultDateRange.split(' ');
  // const reversedDate = defaultStartDate[1].split('').reverse().join('');
  // const defaultEndDate = reversedDate.toString().split('', 10).reverse().join('');

  const startDate = dayjs(defaultStartDate[0]).format('MMMM-YYYY');
  let endArr = defaultStartDate[1].split("/");
  const endDateArray = endArr[1];  
  const endDate = dayjs(endDateArray.split("-").reverse()).format('MMMM-YYYY');

  const dateRangeStyles = {
    color: '#646464'
   };

   const rangeStyles = {
     fontSize: '13px'
   };


   const convertStartDate = (dateRangeStart) => {
     if (dateRangeStart && dateRangeStart.length > 0 ){
      return dayjs(dateRangeStart[0].split('-').reverse()).format('DD-MMMM-YYYY');      
     }
   }
   const convertEndDate = (dateRangeEnd) => {
    if (dateRangeEnd && dateRangeEnd.length > 0 ){
      return dayjs(dateRangeEnd[0].split('-').reverse()).format('DD-MMMM-YYYY');
    }
   
   }

  return (
    <div style={dateRangeStyles}>
      {
      // Displaylocation === '/dashboard' &&
        (userDateRange === null || userDateRange.length ===0 ? (

          <div style={rangeStyles}>
            <span>(</span>
            <span>{startDate}</span>
            <span style={{ marginLeft: '10px', marginRight: '10px' }}> — </span>
            <span>{endDate}</span>
            <span>)</span>
          </div>
        ) : (
          <div style={rangeStyles}>
            <span>(</span>
            <span>{              
              convertStartDate(selectedDateRange[0].split(' '))            
            }</span>
            <span style={{ marginLeft: '10px', marginRight: '10px' }}> — </span>
            <span>{
              convertEndDate(selectedDateRange[1].split(' '))
              }</span>
            <span>)</span>
          </div>
         ))} 
    </div>
  );
}

export default DateRange
