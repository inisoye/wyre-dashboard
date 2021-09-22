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


  const getDieselPurchaseData = ()=>{
    let branchesData = overviewData && Object.keys(overviewData).filter(key=>{
      return key !== 'diesel_overview'
    })
    const getData = branchesData.map(keys=>{
      return overviewData[keys]
    })

    let getDieselUtilityData = Object.entries(overviewData).filter(data=>{
      return data[0] !== 'diesel_overview' && data[0] !== "utility_overview" 
    })

    return getDieselUtilityData
  }

  console.log(overviewData)
  
  const monthlyCostBarCharts =
    dieselPurchasedData && dieselPurchasedData.map(e=>(
      <article
        className='cost-tracker-chart-container'
      >
        <h3 className='cost-tracker-branch-name'>
          Monthly Cost at {e[0]}
        </h3>
        <div className='cost-tracker-chart-wrapper'>
          <CostTrackerMonthlyCostBarChart  DieselData={e[1].diesel} utilityData={e[1].utility}/>
        </div>
      </article>

    ))
      

    const subHeaderStyle= {
      marginLeft:'20px',
      fontSize:'1.5rem',
      fontWeight:'500',
      marginTop:'20px',
    }


    const DieselOverViewCharts = (
      <article
        // className='cost-tracker-chart-container'
      >
        <h3 className='cost-tracker-branch-name'>
          Cost Overview
        </h3>
        <p style={subHeaderStyle}>Diesel Overview</p>
           <DieselOverviewCostTrackerTable dieselOverviewData={overviewData.diesel_overview}/> 
      </article>
    );

    
    const UtilityOverViewCharts =(
      <article
        className='cost-tracker-chart-container'
      >
        <p style={subHeaderStyle}>Utility Overview</p>
          <UtilityOverviewCostTrackerTable dataSource={overviewData.utility_overview}/> 
      </article>
    );

    
    const DieselPurchasedCharts = (
      dieselPurchasedData && dieselPurchasedData.map((e,index)=>(
        <article
        className='cost-tracker-chart-container'
        key={index}
      >
        <h3 className='cost-tracker-branch-name'>
            Diesel Purchased for {e[0]}
        </h3>
          <DieselPurchasedTable data={e[1].diesel}/>
      </article>
      ))
    )

    const utilityPurchasedCharts = (
      dieselPurchasedData && dieselPurchasedData.map((e,index)=>(
        <article
        className='cost-tracker-chart-container'
        key={index}
      >
        <h3 className='cost-tracker-branch-name'>
            Utility Purchased for {e[0]}
        </h3>
          <UtilityPurchasedTable data={e[1].utility}/>
      </article>
      ))
    )
  
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

      <section className="cost-tracker-chart-container">
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
        {monthlyCostBarCharts}
      </section>
    </>
  );
}

export default CostTracker;
