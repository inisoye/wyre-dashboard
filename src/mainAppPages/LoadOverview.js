import React, { useEffect, useContext, useState } from 'react';
import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import Loader from '../components/Loader';


import RunningTime from '../components/barCharts/RunningTime';
import LoadConsumptionPieChart from '../components/pieCharts/LoadConsumptionPieChart';
import LoadOverviewDataTable from '../components/tables/LoadOverviewDataTable';
import {
  generateLoadCosumptionChartData,
  generateRunningTimeChartData
} from '../helpers/genericHelpers';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Load Overview', id: 2 },
];


function LoadOverview({ match }) {
  const {
    refinedRenderedData,
    setCurrentUrl,
    isAuthenticatedDataLoading,
  } = useContext(CompleteDataContext);

  const [allIsLoadDeviceData, setAllisLoadDeviceData] = useState(false);

  const {
    all_device_data,
  } = refinedRenderedData;

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  useEffect(() => {
    if (all_device_data) {
      const data = refineisLoadOverviewData(all_device_data);
      setAllisLoadDeviceData(Object.values(data));
    }

  }, [all_device_data]);



  const refineisLoadOverviewData = (all_device_data) => {
    let branchData = {};
    Object.values(all_device_data).map((eachData) => {
      const branchName = eachData.branchName;
      if (eachData.is_load) {
        if (branchData[branchName]) {
          branchData[branchName].push(eachData);
        } else {
          branchData[branchName] = [eachData];
        }
      }
    })
    return branchData;
  }

  if (isAuthenticatedDataLoading) {
    return <Loader />;
  }


  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>
      {
        allIsLoadDeviceData && allIsLoadDeviceData.map((branch) => (<>
          <article className='score-card-row-3'>
            <h2> {branch[0].branchName} </h2>
            <hr />
          </article>
          <article className='score-card-row-3'>
            <RunningTime runningTimeData={generateRunningTimeChartData(branch)}
              dataTitle='Operating Time'
            />
          </article>
          <div className={'load-overviews-row-table-data'} style={{ marginBottom: '50px' }}>
            <article className="load-overviews-table-data">
              <div className='load-overview-card-data__header'>
                <p>
                  Load Consumption
                </p>
              </div>
              <hr />
              <LoadConsumptionPieChart loadCunsumptionData={generateLoadCosumptionChartData(branch)} />
            </article>
            {branch
              .map((eachDeviceData, index) => {
                return <LoadOverviewDataTable device={eachDeviceData} index={index} />
              })}
          </div>
        </>))
      }
    </>

  );
}

export default LoadOverview;
