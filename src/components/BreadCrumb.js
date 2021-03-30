import React from 'react';

import BreadCrumbItem from '../smallComponents/BreadCrumbItem';

import dataHttpServices from '../services/devices';

function BreadCrumb({ routesArray }) {
  const dateRange = dataHttpServices.endpointDateRange;
  const Date = dateRange.split(' ');
  const reversedDate = Date[1].split('').reverse().join('');
  const NewEndDate = reversedDate.toString().split('', 10).reverse().join('');

  console.log(NewEndDate);
  const dateRangeStyles = {
    fontSize: 'small',
    marginLeft: '10px',
  };
  const breadCrumbItems = routesArray.map((eachRoute) => (
    <BreadCrumbItem
      key={eachRoute.id}
      linkName={eachRoute.name}
      linkUrl={eachRoute.url}
    />
  ));

  return (
    <>
      <ol className="breadcrumb">{breadCrumbItems}</ol>
      <div>
        <span style={dateRangeStyles}>{Date[0]}</span>
        <span style={dateRangeStyles}> — </span>
        <span style={dateRangeStyles}>{NewEndDate}</span>
      </div>
    </>
  );
}

export default BreadCrumb;
