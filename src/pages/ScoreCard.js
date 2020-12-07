import React from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/score-card', name: 'Score Card', id: 2 },
];

function ScoreCard() {
  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>
    </>
  );
}

export default ScoreCard;
