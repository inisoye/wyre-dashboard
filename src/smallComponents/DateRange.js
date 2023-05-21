import React, { useContext } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import CompleteDataContext from '../Context';

// import { useLocation } from 'react-router-dom';

import dataHttpServices from '../services/devices';

const DateRange = () => {
  const { selectedDateRange, userDateRange, organization } = useContext(CompleteDataContext)
  const scoreCardDate = organization.score_cards_date;

  const defaultDateRange = dataHttpServices.endpointDateRange;
  const defaultStartDate = defaultDateRange.split(' ');
  // const reversedDate = defaultStartDate[1].split('').reverse().join('');
  // const defaultEndDate = reversedDate.toString().split('', 10).reverse().join('');

  const startDate = dayjs(defaultStartDate[0]).format('MMMM');
  let endArr = defaultStartDate[1].split("/");
  const endDateArray = endArr[1];  
  const endDate = dayjs(endDateArray.split("-").reverse()).format('MMMM');

  const dateRangeStyles = {
    color: '#646464',
    width:'260px'
   };

   const rangeStyles = {
     fontSize: '13px',
     width: 'auto'
   };


   const convertStartDate = (dateRangeStart) => {
     if (dateRangeStart && dateRangeStart.length > 0 ){
      const dateString = moment(dateRangeStart, 'DD-MM-YYYY HH:mm').format('YYYY-MM');
      // return dayjs(dateRangeStart.split('-').reverse()).format('MMMM-YYYY');
      return dayjs(dateString).format('MMMM-YYYY');      
     }
   }
   const convertEndDate = (dateRangeEnd) => {
    
    if (dateRangeEnd && dateRangeEnd.length > 0 ){
      const dateString = moment(dateRangeEnd, 'DD-MM-YYYY HH:mm').format('YYYY-MM');
      return dayjs(dateString).format('MMMM-YYYY');
    }
   
   }

  return (
    <div style={dateRangeStyles}>
      {
      // Displaylocation === '/dashboard' &&
        (userDateRange === null || userDateRange.length ===0 ? (

            <div style={rangeStyles}>
              <span>{scoreCardDate}</span>
            </div>
                

          // <div style={rangeStyles}>
          //   <span>(</span>
          //   <span>{startDate}</span>
          //   <span style={{ marginLeft: '10px', marginRight: '10px' }}> — </span>
          //   <span>{endDate}</span>
          //   <span>)</span>
          // </div>
        ) : (
          <div style={rangeStyles}>
            <span>(</span>
            <span>{              
              convertStartDate(selectedDateRange[0])           
            }</span>
            <span style={{ marginLeft: '10px', marginRight: '10px' }}> — </span>
            <span>{
              convertEndDate(selectedDateRange[1])
              }</span>
            <span>)</span>
          </div>
         ))} 
    </div>
  );
}

export default DateRange
