import React, { useEffect, useContext, useState } from 'react';
import { message, Spin } from 'antd';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import CostTrackerMonthlyCostBarChart from '../components/barCharts/CostTrackerMonthlyCostBarChart';
import Loader from '../components/Loader';
import DieselOverviewCostTrackerTable from '../components/tables/DieselOverviewCostTrackerTable'
import UtilityOverviewCostTrackerTable from '../components/tables/UtilityOverviewCostTrackerTable'
import axios from 'axios';
import DieselPurchasedTable from '../components/tables/DieselPurchasedTable';
import UtilityPurchasedTable from '../components/tables/UtilityPurchasedTable'
// const baseUrl = `http://wyreng.xyz/api/v1/`;


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Cost Tracker', id: 2 },
];

function CostTracker({ match }) {

  const [overviewData, setOverviewData] = useState([]);
  const [isLoading, setIsLoading] = useState([])


  const subHeaderStyle = {
    marginLeft: '20px',
    fontSize: '1.8rem',
    fontWeight: '500',
    marginTop: '20px',
  }

  const {
    setCurrentUrl,
    isAuthenticatedDataLoading,
    token,
    userId
  } = useContext(CompleteDataContext);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
    setIsLoading(true);
    const requestUrl = `${process.env.REACT_APP_API_URL}cost_tracker_overview/${userId}/`;
    axios.get(requestUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      }
    }
    ).then(async (res) => {
      setOverviewData(res.data.data);
      setIsLoading(false);
    }).catch((err) => {
      message.error('Something un-expected happened, please reload page')
      console.log(err)
      setIsLoading(false);
    })
  }, []);


  let dieselPurchasedData = Object.entries(overviewData).filter(data => {
    return data[0] !== 'diesel_overview' && data[0] !== "utility_overview"
  })

  const DieselOverViewCharts = overviewData && (
    <article
    >
      <h3 className='cost-tracker-branch-name'>
        Cost Overview
      </h3>
      <p style={subHeaderStyle}>Diesel Overview</p>
      <DieselOverviewCostTrackerTable isLoading={isLoading}
        dieselOverviewData={overviewData.diesel_overview} />
    </article>
  );


  const UtilityOverViewCharts = overviewData && (
    <article
      className='cost-tracker-chart-container'
    >
      <p style={subHeaderStyle}>Utility Overview</p>
      <UtilityOverviewCostTrackerTable isLoading={isLoading}
        dataSource={overviewData.utility_overview} />
    </article>
  );


  const DieselPurchasedCharts = (
    dieselPurchasedData && dieselPurchasedData.map((e, index) => (
      <article
        className='cost-tracker-chart-container'
        key={index}
      >
        <h3 className='cost-tracker-branch-name'>
          Diesel Purchased for {e[0]}
        </h3>
        <DieselPurchasedTable isLoading={isLoading} data={e[1].diesel} />
      </article>
    ))
  )

  const utilityPurchasedCharts = (
    dieselPurchasedData && dieselPurchasedData.map((e, index) => (
      <article
        className='cost-tracker-chart-container'
        key={index}
      >
        <h3 className='cost-tracker-branch-name'>
          Utility Purchased for {e[0]}
        </h3>
        <UtilityPurchasedTable isLoading={isLoading} data={e[1].utility} />
      </article>
    ))
  )

  const getMonthlyDataCharts = Object.entries(overviewData).filter(data => {
    return data[0] !== 'diesel_overview' && data[0] !== "utility_overview"
  })

  const monthlyCostBarCharts =
    getMonthlyDataCharts && getMonthlyDataCharts.map((e, index) => (
      <article
        key={index}
        className='cost-tracker-chart-container'
      >
        <h3 className='cost-tracker-branch-name'>
          Monthly Cost at {e[0]}
        </h3>
        <div className='cost-tracker-chart-wrapper'>
          <CostTrackerMonthlyCostBarChart DieselData={e[1].diesel} utilityData={e[1].utility} />
        </div>
      </article>
    ))


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
        <Spin spinning={isLoading}>
          <h2 className='h-screen-reader-text'>Monthly Cost</h2>
          {monthlyCostBarCharts}
        </Spin>
      </section>

    </>

  );
}

export default CostTracker;
