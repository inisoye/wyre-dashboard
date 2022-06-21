import React, { useEffect, useContext, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import CostTrackerMonthlyCostBarChart from '../components/barCharts/CostTrackerMonthlyCostBarChart';
import DieselOverviewCostTrackerTable from '../components/tables/DieselOverviewCostTrackerTable'
import UtilityOverviewCostTrackerTable from '../components/tables/UtilityOverviewCostTrackerTable'
import DieselPurchasedTable from '../components/tables/DieselPurchasedTable';
import UtilityPurchasedTable from '../components/tables/UtilityPurchasedTable'
import { fetchCostTrackerData } from '../redux/actions/constTracker/costTracker.action';
import { allCostTrackerBranchesBaseline } from '../helpers/genericHelpers';
import EnergyConsumptionMultipleChart from '../components/barCharts/EnergyConsumptionMultipleChart';
import Loader from '../components/Loader';

// Tooltips
import { Tooltip } from 'antd';
import InformationIcon from '../icons/InformationIcon';
import { COST_TRACKER_TOOLTIP_MESSAGES } from '../components/toolTips/Cost_Tracker_Tooltip_Messages';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Cost Tracker', id: 2 },
];

function CostTracker({ match, fetchCostTrackerData: fetchCostTracker }) {

  const [overviewData, setOverviewData] = useState([]);
  const [branchInfo, setBranchInfo] = useState(false);
  const [baseLineData, setBaseLineData] = useState(false);
  const costTracker = useSelector((state) => state.costTracker);
  const sideBar = useSelector((state) => state.sideBar);


  const subHeaderStyle = {
    marginLeft: '20px',
    fontSize: '1.8rem',
    fontWeight: '500',
    marginTop: '20px',
  }

  const {
    setCurrentUrl,
    uiSettings
  } = useContext(CompleteDataContext);


  useEffect(() => {
    fetchCostTracker();
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, []);

  useEffect(() => {
    setOverviewData(costTracker.costTrackerData)
  }, [costTracker.costTrackerData]);

  useEffect(() => {

    const getBranchData = Object.entries(overviewData)?.filter(data => {
      return data[0] !== 'diesel_overview' && data[0] !== "utility_overview"
        && data[0] !== "has_generator"
    })
    if (getBranchData && getBranchData[0]) {
      setBranchInfo(getBranchData);
      setBaseLineData(allCostTrackerBranchesBaseline(sideBar?.selectedSideBar, getBranchData))
    }

  }, [overviewData, sideBar.selectedSideBar]);


  const DieselOverViewCharts = overviewData && (
    <article
    >
      <h3 className='cost-tracker-branch-name'>
        Cost Overview
      </h3>
      <div className='doughnut-card-heading'>
        <p style={subHeaderStyle}>Diesel Overview</p>
        <div style={{ textAlign: 'right', paddingTop: 20, paddingRight: 20 }}>
          <Tooltip placement='top' style={{ textAlign: 'right' }}
            overlayStyle={{ whiteSpace: 'pre-line' }} title={COST_TRACKER_TOOLTIP_MESSAGES.DIESEL_OVERVIEW}>
            <p>
              <InformationIcon className="info-icon" />
            </p>
          </Tooltip>
        </div>
      </div>
      <DieselOverviewCostTrackerTable isLoading={costTracker.fetchCostTrackerLoading}
        dieselOverviewData={overviewData.diesel_overview} />
    </article>
  );


  const UtilityOverViewCharts = overviewData && (
    <article
      className='cost-tracker-chart-container'
    >
      <div className='doughnut-card-heading'>
        <p style={subHeaderStyle}>Utility Overview</p>
        <div style={{ textAlign: 'right', paddingTop: 20, paddingRight: 20 }}>
          <Tooltip placement='top' style={{ textAlign: 'right' }}
            overlayStyle={{ whiteSpace: 'pre-line' }} title={COST_TRACKER_TOOLTIP_MESSAGES.UTILITY_OVERVIEW}>
            <p>
              <InformationIcon className="info-icon" />
            </p>
          </Tooltip>
        </div>
      </div>
      <UtilityOverviewCostTrackerTable isLoading={costTracker.fetchCostTrackerLoading}
        dataSource={overviewData.utility_overview} />
    </article>
  );


  const DieselPurchasedCharts = (
    branchInfo && branchInfo.length > 0 && branchInfo.map((e, index) => (
      <article
        className='cost-tracker-chart-container'
        key={index}
      >
        <div style={{ textAlign: 'right', paddingTop: 20, paddingRight: 20 }}>
          <Tooltip placement='top' style={{ textAlign: 'right' }}
            overlayStyle={{ whiteSpace: 'pre-line' }} title={COST_TRACKER_TOOLTIP_MESSAGES.DIESEL_PURCHASED}>
            <p>
              <InformationIcon className="info-icon" />
            </p>
          </Tooltip>
        </div>
        <h3 className='cost-tracker-branch-name'>
          Diesel Purchased for {e[0]}
        </h3>

        <DieselPurchasedTable isLoading={costTracker.fetchCostTrackerLoading} data={e[1].diesel} />
      </article>
    ))
  )

  const utilityPurchasedCharts = (
    branchInfo && branchInfo.map((e, index) => (
      <article
        className='cost-tracker-chart-container'
        key={index}
      >
        <div style={{ textAlign: 'right', paddingTop: 20, paddingRight: 20 }}>
          <Tooltip placement='top' style={{ textAlign: 'right' }}
            overlayStyle={{ whiteSpace: 'pre-line' }} title={COST_TRACKER_TOOLTIP_MESSAGES.UTILITY_PAYMENTS}>
            <p>
              <InformationIcon className="info-icon" />
            </p>
          </Tooltip>
        </div>
        <h3 className='cost-tracker-branch-name'>
          Utility Payments for {e[0]}
        </h3>

        <UtilityPurchasedTable isLoading={costTracker.fetchCostTrackerLoading} data={e[1].utility} />
      </article>
    ))
  )



  const monthlyCostBarCharts =
    branchInfo && branchInfo.length > 0 && [branchInfo[0]].map((e, index) => (
      <article
        key={index}
        className='cost-tracker-chart-container'
      >
        <div style={{ textAlign: 'right', paddingTop: 20, paddingRight: 20 }}>
          <Tooltip placement='top' style={{ textAlign: 'right' }}
            overlayStyle={{ whiteSpace: 'pre-line' }} title={COST_TRACKER_TOOLTIP_MESSAGES.BASELINE_TRACKER}>
            <p>
              <InformationIcon className="info-icon" />
            </p>
          </Tooltip>
        </div>
        <h3 className='cost-tracker-branch-name'>
          Energy Consumption at {e[0]}
        </h3>
        <div className='cost-tracker-chart-wrapper'>
          <EnergyConsumptionMultipleChart uiSettings={uiSettings} energyData={baseLineData} />
        </div>
      </article>
    ))

  const monthlyEnergyConsumptionBarCharts =
    branchInfo && branchInfo.length > 0 && [branchInfo[0]].map((e, index) => (
      <article
        key={index}
        className='cost-tracker-chart-container'
      >
        <div style={{ textAlign: 'right', paddingTop: 20, paddingRight: 20 }}>
          <Tooltip placement='top' style={{ textAlign: 'right' }}
            overlayStyle={{ whiteSpace: 'pre-line' }} title={COST_TRACKER_TOOLTIP_MESSAGES.MONTHLY_COST}>
            <p>
              <InformationIcon className="info-icon" />
            </p>
          </Tooltip>
        </div>
        <h3 className='cost-tracker-branch-name'>
          Monthly Cost at {e[0]}
        </h3>
        <div className='cost-tracker-chart-wrapper'>
          <CostTrackerMonthlyCostBarChart uiSettings={uiSettings} DieselData={e[1].diesel} utilityData={e[1].utility} />
        </div>
      </article>
    ))

  if (costTracker.fetchCostTrackerLoading) {
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
        <h2 className='h-screen-reader-text'>Quantity of utility Payments</h2>
        {utilityPurchasedCharts}
      </section>

      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Monthly Cost</h2>
        {monthlyCostBarCharts}
      </section>

      <section className='cost-tracker-section'>
        <h2 className='h-screen-reader-text'>Monthly Cost</h2>
        {monthlyEnergyConsumptionBarCharts}
      </section>

    </>

  );
}

const mapDispatchToProps = {
  fetchCostTrackerData
};

export default connect(null, mapDispatchToProps)(CostTracker);
