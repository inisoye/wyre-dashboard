import React, { useEffect, useContext } from 'react';
import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import ScoreCardDoughnutChart from '../components/pieCharts/ScoreCardDoughnutChart';
import ScoreCardTable from '../components/tables/ScoreCardTable';
import ScoreCardBarChart from '../components/barCharts/ScoreCardBarChart';
import ScoreCardGenEfficiencyDoughnut from '../components/pieCharts/ScoreCardGenEfficiencyDoughnut';
import ScoreCardFuelConsumptionDoughnut from '../components/pieCharts/ScoreCardFuelConsumptionDoughnut';
import Loader from '../components/Loader';



import { SCORE_CARD_TOOLTIP_MESSAGES } from '../helpers/constants';
import RunningTime from '../components/barCharts/RunningTime';

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



  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const {
    operating_time,
    all_device_data
  } = refinedRenderedData;

  console.log('here is the refined data render ==================>>>>>>>>>>>>>>>', all_device_data);

  let deviceLength;

  const dataPresent = Object.keys(refinedRenderedData).length !== 0;


  if (isAuthenticatedDataLoading) {
    return <Loader />;
  }


  return (
    <> {
      dataPresent && (<>
        <div className='breadcrumb-and-print-buttons'>
          <BreadCrumb routesArray={breadCrumbRoutes} />
        </div>

        <div className={'load-overviews-row-table-data'} style={{ marginBottom: '50px' }}>
          {all_device_data && Object.values(all_device_data)?.filter((value) => value.is_load)
            .map(eachDeviceData => {
              return <article className={'load-overviews-table-data'}>
                <h2>
                  Change Over Lags
                </h2>
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
                    Running Time: 20
                  </p>
                  <hr />
                </div>
              </article>
            })}
        </div>
        <article className='score-card-row-3'>
          <RunningTime operatingTimeData={operating_time}
            dataTitle='Operating Time'
            dataMessage={SCORE_CARD_TOOLTIP_MESSAGES.OPERATING_TIME}
          />
        </article>
      </>)
    }
    </>

  );
}

export default LoadOverview;
