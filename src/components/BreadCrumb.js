import React from 'react';

import BreadCrumbItem from '../smallComponents/BreadCrumbItem';

import DateRange from '../smallComponents/DateRange';

import ChevronRight from '../icons/ChevronRight';

function BreadCrumb({ routesArray }) {
  const breadCrumbItems = routesArray.map((eachRoute) => (
    <BreadCrumbItem
      key={eachRoute.id}
      linkName={eachRoute.name}
      linkUrl={eachRoute.url}
    />
  ));

  return (
    <>
      <ol className="breadcrumb">
        {breadCrumbItems}
        <ChevronRight className="breadcrumb-icon" />
        <DateRange />
      </ol>
    </>
  );
}
export default BreadCrumb;
