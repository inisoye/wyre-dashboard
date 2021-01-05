import React, { useEffect, useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

import CostTrackerDieselQuantityBarChart from '../components/barCharts/CostTrackerDieselQuantityBarChart';
import CostTrackerConsumptionGroupedBarChart from '../components/barCharts/CostTrackerConsumptionGroupedBarChart';
import CostTrackerMonthlyCostBarChart from '../components/barCharts/CostTrackerMonthlyCostBarChart';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Cost Tracker', id: 2 },
];

function CostTracker({ match }) {
  const { refinedRenderedData, setCurrentUrl } = useContext(
    CompleteDataContext
  );

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const {
    cost_tracker_diesel_qty,
    cost_tracker_monthly_cost,
    cost_tracker_consumption,
  } = refinedRenderedData;

  const dieselQuantityBarCharts =
    cost_tracker_diesel_qty &&
    cost_tracker_diesel_qty.map((eachBranch) => (
      <article
        className='cost-tracker-chart-container'
        key={eachBranch.branchName}
      >
        <h3 className='cost-tracker-branch-name'>
          Quantity of Diesel Purchased at {eachBranch.branchName}
        </h3>
        <div className='cost-tracker-chart-wrapper'>
          <CostTrackerDieselQuantityBarChart dieselQuantityData={eachBranch} />
        </div>
      </article>
    ));

  const dieselConsumptionBarCharts =
    cost_tracker_consumption &&
    cost_tracker_consumption.map((eachBranch) => (
      <article
        className='cost-tracker-chart-container'
        key={eachBranch.branchName}
      >
        <h3 className='cost-tracker-branch-name'>
          Quantity of Diesel Consumed at {eachBranch.branchName}
        </h3>
        <div className='cost-tracker-chart-wrapper'>
          <CostTrackerConsumptionGroupedBarChart consumptionData={eachBranch} />
        </div>
      </article>
    ));

  const monthlyCostBarCharts =
    cost_tracker_monthly_cost &&
    cost_tracker_monthly_cost.map((eachBranch) => (
      <article
        className='cost-tracker-chart-container'
        key={eachBranch.branchName}
      >
        <h3 className='cost-tracker-branch-name'>
          Monthly Cost at {eachBranch.branchName}
        </h3>
        <div className='cost-tracker-chart-wrapper'>
          <CostTrackerMonthlyCostBarChart monthlyCostData={eachBranch} />
        </div>
      </article>
    ));

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Quantity of Diesel Purchased</h2>
        {dieselQuantityBarCharts}
      </section>

      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Quantity of Diesel Consumed</h2>
        {dieselConsumptionBarCharts}
      </section>

      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Monthly Cost</h2>
        {monthlyCostBarCharts}
      </section>
    </>
  );
}

export default CostTracker;
