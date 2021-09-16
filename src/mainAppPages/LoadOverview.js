import React, { useEffect, useContext, useState } from 'react';
import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import Loader from '../components/Loader';



import { CHART_BACKGROUD_COLOR, SCORE_CARD_TOOLTIP_MESSAGES } from '../helpers/constants';
import RunningTime from '../components/barCharts/RunningTime';
import LoadConsumptionPieChart from '../components/pieCharts/LoadConsumptionPieChart';

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
    usage_hours
  } = refinedRenderedData;

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  useEffect(() => {
    if (all_device_data) {
      console.log('==============>>>>>>>', all_device_data)
      const data = refineisLoadOverviewData(all_device_data);
      setAllisLoadDeviceData(Object.values(data));
    }

  }, [all_device_data]);
 console.log(allIsLoadDeviceData);
  const generateChartData = (isLoadData, nonEmpty) => {
    let label = [];
    let data = []
    let usageHours = {};
    isLoadData.map((device) => {
      if (nonEmpty) {
        if (device.energy_consumption?.current) {
          label.push(device.deviceName);
          data.push(device.energy_consumption.current);
          usageHours[device.deviceName] = device.usage_hour;
        }
      } else {
        label.push(device.deviceName);
        data.push(device.energy_consumption.current);
        usageHours[device.deviceName] = device.usage_hour;
      }

    });

    return { label, data, usageHours };
  }


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
          </article>
          <article className='score-card-row-3'>
            <RunningTime runningTimeData={generateChartData(branch, false)}
              dataTitle='Operating Time'
              dataMessage={SCORE_CARD_TOOLTIP_MESSAGES.OPERATING_TIME}
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
              <LoadConsumptionPieChart loadCunsumptionData={generateChartData(branch, true)} />
            </article>
            {branch
              .map((eachDeviceData, index) => {
                return <article className={'load-overviews-table-data'}>
                  <div className='load-overview-card-data__header'>
                    <div style={{ backgroundColor: CHART_BACKGROUD_COLOR[index] || '#6C00FA' }}
                      className='load-overview-tag-header-color-box red'>
                    </div>
                    <p>
                      {eachDeviceData.deviceName}
                    </p>
                  </div>
                  <div>
                    <hr />
                    <p>
                      Consumption: {eachDeviceData.energy_consumption.usage}
                    </p>
                    <hr />
                    <p>
                      Maximum Demand: {eachDeviceData.dashboard.max_demand.value}
                    </p>
                    <hr />
                    <p>
                      Minimum Demand: {eachDeviceData.dashboard.min_demand.value}
                    </p>
                    <hr />
                    <p>
                      Average Demand: {eachDeviceData.dashboard.avg_demand.value}
                    </p>
                    <hr />
                    <p>
                      Running Time: {usage_hours.hours[usage_hours.devices.findIndex(branchName => branchName === eachDeviceData.branchName)] || 0}
                    </p>
                  </div>
                </article>
              })}
          </div>
        </>))
      }
    </>

  );
}

export default LoadOverview;
