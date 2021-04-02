import React from 'react';

import BreadCrumbItem from '../smallComponents/BreadCrumbItem';

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
      <ol className="breadcrumb">{breadCrumbItems}</ol>
    </>
  );
}
export default BreadCrumb;
