import React from 'react';

function DashboardSmallBannerSection({ name, value, unit }) {
  return (
    <section className='small-banner-section'>
      <h3 className='small-banner-section__heading'>
        {name}{' '}
        <span className='small-banner-section__subheading'>This Month</span>
      </h3>
      <p className='small-banner-section__value'>
        <span>{value}</span>
        <span>{unit}</span>
      </p>
    </section>
  );
}

export default DashboardSmallBannerSection;
