import React from 'react';

import BreadCrumbItem from '../smallComponents/BreadCrumbItem';

function BreadCrumb({ routesArray }) {
  let DateEndPointRange = localStorage.getItem('DateEndPointRange');
  let parsedDateEndpointRange = JSON.parse(DateEndPointRange);

  const dateRangeStyles={
      fontSize:'small',
      marginLeft:'10px',
  }
  const breadCrumbItems = routesArray.map((eachRoute) => (
    <BreadCrumbItem
      key={eachRoute.id}
      linkName={eachRoute.name}
      linkUrl={eachRoute.url}
    />
  ));

  return (
    <ol className="breadcrumb">
      {breadCrumbItems}

      {/* <span style={dateRangeStyles}>{parsedDateEndpointRange}</span> */}
    </ol>
  );
}

export default BreadCrumb;
