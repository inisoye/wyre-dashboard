import React, { useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import DashboardStackedBarChart from '../components/barCharts/DashboardStackedBarChart';
import DashboardDoughnutChart from '../components/pieCharts/DashboardDoughnutChart';

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
    name,
    total_kwh,
    min_demand,
    max_demand,
    usage_hours,
    avg_demand,
    dashboard_carbon_emissions,
    cost_of_energy,
    today,
    yesterday,
    daily_kwh,
  } = refinedRenderedData;

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div className='dashboard-row-1'>
        <article className='dashboard__total-energy dashboard__banner--small'>
          <h2 className='total-energy__heading'>Total Energy</h2>
          <p className='total-energy_value'>
            <span>{total_kwh && total_kwh.value}</span>
            <span>{total_kwh && total_kwh.unit}</span>
          </p>
        </article>

        <article className='dashboard__demand-banner dashboard__banner--small'>
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

        <article className='dashboard__cost-emissions-banner dashboard__banner--small'>
          <DashboardSmallBannerSection
            name='Carbon Emissions'
            value={
              dashboard_carbon_emissions && dashboard_carbon_emissions.value
            }
            unit={dashboard_carbon_emissions && dashboard_carbon_emissions.unit}
          />
          <DashboardSmallBannerSection
            name='Cost of Energy'
            value={cost_of_energy && cost_of_energy.value}
            unit={cost_of_energy && cost_of_energy.unit}
          />
        </article>
      </div>

      <article className='dashboard-row-2 dashboard-bar-container'>
        <DashboardStackedBarChart
          className=''
          data={daily_kwh}
          organization={name}
        />
      </article>

      <div className='dashboard-row-3'>
        <article className='dashboard-pie-container'>
          <DashboardDoughnutChart data={usage_hours} />
        </article>

        <article className='dashboard-today-and-yesterday'>
          <section className='today-usage'>
            <h3 className='today-usage__heading'>Today's Usage (KWh)</h3>
            <div className='usage-value-and-arrow'>
              <p className='today-usage__value'>{today && today.value}</p>
              <UpAndDownArrows />
            </div>
          </section>
          <section className='yesterday-usage'>
            <h3 className='yesterday-usage__heading'>
              Yesterday's Usage (KWh)
            </h3>
            <div className='usage-value-and-arrow'>
              <p className='yesterday-usage__value'>
                {yesterday && yesterday.value}
              </p>
              <UpAndDownArrows />
            </div>
          </section>
        </article>
      </div>
    </>
  );
}

export default Dashboard;
