import React from 'react';

import { CHART_BACKGROUD_COLOR } from '../../helpers/constants';



function LoadOverviewDataTable({ device, index }) {

  return (
    <>
      <article className={'load-overviews-table-data'}>
        <div className='load-overview-card-data__header'>
          <div style={{ backgroundColor: CHART_BACKGROUD_COLOR[index] || '#6C00FA' }}
            className='load-overview-tag-header-color-box red'>
          </div>
          <p>
            {device.deviceName}
          </p>
        </div>
        <div>
          <hr />
          <p>
            Consumption: {device.energy_consumption.usage}Kw
          </p>
          <hr />
          <p>
            Maximum Demand: {device.dashboard.max_demand.value}Kw
          </p>
          <hr />
          <p>
            Minimum Demand: {device.dashboard.min_demand.value}Kw
          </p>
          <hr />
          <p>
            Average Demand: {device.dashboard.avg_demand.value}Kw
          </p>
          <hr />
          <p>
            Running Time: {device.usage_hour || 0}Kw
          </p>
        </div>
      </article>
    </>

  );
}

export default LoadOverviewDataTable;
