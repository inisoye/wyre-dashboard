import React from 'react';
import { numberFormatter } from '../helpers/numberFormatter';

function DashboardSmallBannerSection({ name, value, unit }) {
  return (
    <div className='small-banner-section'>
      <h3 className='small-banner-section__heading'>
        {name}{' '}
        {/* <span className='small-banner-section__subheading'>This Month</span> */}
      </h3> 
      <p className='small-banner-section__value'>
        <span className='value'>{value ?  numberFormatter(Number(value)) : 0}</span>
        <span className='unit'>{unit}</span>
      </p>
    </div>
  );
}

export default DashboardSmallBannerSection;
