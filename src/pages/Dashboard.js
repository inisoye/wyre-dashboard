import React, { useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import StackedBarChart from '../components/StackedBarChart';
import PieChartEmpty from '../components/PieChartEmpty';

import DashboardSmallBannerSection from '../smallComponents/DashboardSmallBannerSection';
import PrintButtons from '../smallComponents/PrintButtons';

import UpAndDownArrows from '../icons/UpAndDownArrows';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/', name: 'Dashboard', id: 2 },
];

function Dashboard() {
  let { refinedRenderedData } = useContext(CompleteDataContext);

  const {
    // name,
    total_kwh,
    min_demand,
    max_demand,
    // monthly_hours,
    avg_demand,
    carbon_emissions,
    cost_of_energy,
    today,
    yesterday,
    daily_data,
  } = refinedRenderedData;

  // console.log(refinedRenderedData);

  return (
    <>
      <div>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div className='dashboard-row-1'>
        <article className='total-energy dashboard__banner--small'>
          <h2 className='total-energy__heading'>Total Energy</h2>
          <p className='total-energy_value'>
            <span>{total_kwh && total_kwh.value}</span>
            <span>{total_kwh && total_kwh.unit}</span>
          </p>
        </article>

        <article className='dashboard__banner--small'>
          <DashboardSmallBannerSection
            name='Max. Demand'
            value={max_demand && max_demand.value}
            unit={max_demand && max_demand.unit}
          />
          <DashboardSmallBannerSection
            name='Min. Demand'
            value={min_demand && min_demand.value}
            unit={min_demand && min_demand.unit}
          />
          <DashboardSmallBannerSection
            name='Avg. Demand'
            value={avg_demand && avg_demand.value}
            unit={avg_demand && avg_demand.unit}
          />
        </article>

        <article className='dashboard__banner--small'>
          <DashboardSmallBannerSection
            name='Carbon Emission'
            value={carbon_emissions && carbon_emissions.value}
            unit={carbon_emissions && carbon_emissions.unit}
          />
          <DashboardSmallBannerSection
            name='Cost of Energy'
            value={cost_of_energy && cost_of_energy.value}
            unit={cost_of_energy && cost_of_energy.unit}
          />
        </article>
      </div>

      <article className='dashboard-row-2'>
        <StackedBarChart data={daily_data} />
      </article>

      <div className='dashboard-row-3'>
        <article>
          <PieChartEmpty />
        </article>

        <article>
          <section className='today-usage'>
            <h3 className='today-usage__heading'>Today's Usage (KWh)</h3>
            <p className='today-usage__value'>{today && today.value}</p>
            <UpAndDownArrows />
          </section>
          <section className='yesterday-usage'>
            <h3 className='yesterday-usage__heading'>
              Yesterday's Energy (KWh)
            </h3>
            <p className='yesterday-usage__value'>
              {yesterday && yesterday.value}
            </p>
            <UpAndDownArrows />
          </section>
        </article>
      </div>
    </>
  );
}

export default Dashboard;
