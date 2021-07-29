import React, { useEffect, useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import CostTrackerDieselQuantityBarChart from '../components/barCharts/CostTrackerDieselQuantityBarChart';
import CostTrackerConsumptionGroupedBarChart from '../components/barCharts/CostTrackerConsumptionGroupedBarChart';
import CostTrackerMonthlyCostBarChart from '../components/barCharts/CostTrackerMonthlyCostBarChart';
import Loader from '../components/Loader';
import ComparisonBarChart from '../components/barCharts/ComparisonBarChart';
import DieselOverviewCostTrackerTable from '../components/tables/DieselOverviewCostTrackerTable'

import UtilityOverviewCostTrackerTable from '../components/tables/UtilityOverviewCostTrackerTable'


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Cost Tracker', id: 2 },
];

function CostTracker({ match }) {
  const {
    refinedRenderedData,
    setCurrentUrl,
    isAuthenticatedDataLoading,
    organization
  } = useContext(CompleteDataContext);

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


  const comparisonData = organization.branches && organization.branches.map((eachValue)=>{
   const {cost_tracker_monthly_diesel_purchase, cost_tracker_monthly_diesel_estimate, name} = eachValue
    return {
      'branchName': name,
      'diesel_estimate': cost_tracker_monthly_diesel_estimate,
      "diesel_purchase": cost_tracker_monthly_diesel_purchase
    }
  })

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

    const DiselCostAndConsumptionComparison  =
    comparisonData &&
    comparisonData.map((eachBranch) => (
      <article
        className='cost-tracker-chart-container'
        key={eachBranch.branchName}
      >
        <h3 className='cost-tracker-branch-name'>
          {eachBranch.branchName}
        </h3>
        <div className='cost-tracker-chart-wrapper'>
          <ComparisonBarChart comparisonData={eachBranch} />
        </div>
      </article>
    ));

    const subHeaderStyle= {
      marginLeft:'20px',
      fontSize:'1.5rem',
      fontWeight:'500'
    }


    const DieselOverViewCharts =
    cost_tracker_diesel_qty &&
    cost_tracker_diesel_qty.map((eachBranch) => (
      <article
        className='cost-tracker-chart-container'
        key={eachBranch.branchName}
      >
        <h3 className='cost-tracker-branch-name'>
          Cost Overview
        </h3>
        <div className='cost-tracker-chart-wrapper'>
        <p style={subHeaderStyle}>Diesel Overview</p>
          { <DieselOverviewCostTrackerTable/> }
        </div>
      </article>
    ));

    

    const UtilityOverViewCharts =
    cost_tracker_diesel_qty &&
    cost_tracker_diesel_qty.map((eachBranch) => (
      <article
        className='cost-tracker-chart-container'
        key={eachBranch.branchName}
      >
        <div className='cost-tracker-chart-wrapper'>
        <p style={subHeaderStyle}>Utility Overview</p>
          { <UtilityOverviewCostTrackerTable/> }
        </div>
      </article>
    ));
  
   if (isAuthenticatedDataLoading) {
     return <Loader />;
   }

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <section className="cost-tracker-section">
        <h2 className='h-screen-reader-text'>Cost Overview</h2>
        <p>{DieselOverViewCharts}</p>
        <p> {UtilityOverViewCharts}</p>
      </section>

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

      
      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Estimated Monthly Cost</h2>
        {DiselCostAndConsumptionComparison}
      </section>
    </>
  );
}

export default CostTracker;
