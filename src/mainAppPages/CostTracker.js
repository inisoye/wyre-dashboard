import React, { useEffect, useContext, useState } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import CostTrackerDieselQuantityBarChart from '../components/barCharts/CostTrackerDieselQuantityBarChart';
import CostTrackerConsumptionGroupedBarChart from '../components/barCharts/CostTrackerConsumptionGroupedBarChart';
import CostTrackerMonthlyCostBarChart from '../components/barCharts/CostTrackerMonthlyCostBarChart';
import Loader from '../components/Loader';
import ComparisonBarChart from '../components/barCharts/ComparisonBarChart';
import DieselOverviewCostTrackerTable from '../components/tables/DieselOverviewCostTrackerTable'
import UtilityOverviewCostTrackerTable from '../components/tables/UtilityOverviewCostTrackerTable'
import axios from 'axios';
import DieselPurchasedTable from '../components/tables/DieselPurchasedTable';
import UtilityPurchasedTable from '../components/tables/UtilityPurchasedTable'

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Cost Tracker', id: 2 },
];

function CostTracker({ match }) {
  
  const [overviewData, setOverviewData] = useState([])
  const [dieselPurchasedData, setDieselPurchasedData] = useState([])

  const {
    refinedRenderedData,
    setCurrentUrl,
    isAuthenticatedDataLoading,
    organization,
    token,
    userId
  } = useContext(CompleteDataContext);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }

    const requestUrl = `http://wyreng.xyz/api/v1/cost_tracker_overview/${userId}/`;
    axios.get(requestUrl,  {
      headers:{
              'Content-Type': 'application/json',
              Authorization: `bearer ${token}`,
      }}
    ).then((req)=>{
      setOverviewData(req.data.data)
      setDieselPurchasedData(getDieselPurchaseData())
    }).catch((err)=>{
      alert('Something un-expected happened, please reload page')
      console.log(err)
    })
  }, [match, setCurrentUrl,token,userId]);

  const {
    cost_tracker_diesel_qty,
    cost_tracker_monthly_cost,
    cost_tracker_consumption,
  } = refinedRenderedData;


  const getDieselPurchaseData = ()=>{
    let branchesData = overviewData && Object.keys(overviewData).filter(key=>{
      return key !== 'diesel_overview'
    })
    const getData = branchesData.map(keys=>{
      return overviewData[keys]
    })

    let getDieselUtilityData = Object.entries(overviewData).filter(data=>{
      return data[0] !== 'diesel_overview'
    })

    return getDieselUtilityData
  }

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
      fontWeight:'500',
      marginTop:'20px',
    }


    const DieselOverViewCharts = (
      <article
        className='cost-tracker-chart-container'
      >
        <h3 className='cost-tracker-branch-name'>
          Cost Overview
        </h3>
        <p style={subHeaderStyle}>Diesel Overview</p>
           <DieselOverviewCostTrackerTable dieselOverviewData={overviewData.diesel_overview}/> 
      </article>
    );

    
    const DieselPurchasedCharts = (
      dieselPurchasedData && dieselPurchasedData.map(e=>(
        <article
        className='cost-tracker-chart-container'
      >
        <h3 className='cost-tracker-branch-name'>
            Diesel Purchased for {e[0]}
        </h3>
          <DieselPurchasedTable data={e[1].diesel}/>
      </article>
      ))
    )

    const utilityPurchasedCharts = (
      dieselPurchasedData && dieselPurchasedData.map(e=>(
        <article
        className='cost-tracker-chart-container'
      >
        <h3 className='cost-tracker-branch-name'>
            Utility Purchased for {e[0]}
        </h3>
          <UtilityPurchasedTable data={e[1].utility}/>
      </article>
      ))
    )


    const UtilityOverViewCharts =(
      <article
        className='cost-tracker-chart-container'
      >
        <div className='cost-tracker-chart-wrapper'>
        <p style={subHeaderStyle}>Utility Overview</p>
          <UtilityOverviewCostTrackerTable/> 
        </div>
      </article>
    );
  
   if (isAuthenticatedDataLoading) {
     return <Loader />;
   }

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div>
      </div>

      <section className="cost-tracker-section">
        <h2 className='h-screen-reader-text'>Cost Overview</h2>
        {DieselOverViewCharts}
        {UtilityOverViewCharts}
      </section>


      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Quantity of Diesel Purchased</h2>
          {DieselPurchasedCharts}
      </section>

      
      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Quantity of utility Purchased</h2>
          {utilityPurchasedCharts}
      </section>


      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Monthly Cost</h2>
        {/* {monthlyCostBarCharts} */}
      </section>
    </>
  );
}

export default CostTracker;
