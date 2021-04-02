import React, { useEffect, useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import DashboardStackedBarChart from '../components/barCharts/DashboardStackedBarChart';
import DashboardDoughnutChart from '../components/pieCharts/DashboardDoughnutChart';
import Loader from '../components/Loader';

import DashboardSmallBannerSection from '../smallComponents/DashboardSmallBannerSection';

import DashboardUpArrow from '../icons/DashboardUpArrow';
import DashboardDownArrow from '../icons/DashboardDownArrow';
import { numberFormatter } from '../helpers/numberFormatter';

import DateRange from '../smallComponents/DateRange';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/', name: 'Dashboard', id: 2 },
];

function Dashboard({ match }) {
  let { refinedRenderedData, isAuthenticatedDataLoading } = useContext(
    CompleteDataContext
  );

  const { setCurrentUrl } = useContext(CompleteDataContext);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

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

  const todaysValue = today && today.value;
  const yesterdaysValue = yesterday && yesterday.value;
  const isTodaysValueLessThanYesterdays = todaysValue < yesterdaysValue;

  if (isAuthenticatedDataLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>
      
      <DateRange />

      <div className="dashboard-row-1">
        <article className="dashboard__total-energy dashboard__banner--small">
          <h2 className="total-energy__heading">Total Energy</h2>
          <p className="total-energy_value">
            <span>{total_kwh && numberFormatter(total_kwh.value)}</span>
            <span>{total_kwh && total_kwh.unit}</span>
          </p>
        </article>

        <article className="dashboard__demand-banner dashboard__banner--small">
          <DashboardSmallBannerSection
            name="Max. Demand"
            value={max_demand && numberFormatter(max_demand.value.toFixed(2))}
            unit={max_demand && max_demand.unit}
          />
          <DashboardSmallBannerSection
            name="Min. Demand"
            value={min_demand && numberFormatter(min_demand.value.toFixed(2))}
            unit={min_demand && min_demand.unit}
          />
          <DashboardSmallBannerSection
            name="Avg. Demand"
            value={avg_demand && numberFormatter(avg_demand.value.toFixed(2))}
            unit={avg_demand && avg_demand.unit}
          />
        </article>

        <article className="dashboard__cost-emissions-banner dashboard__banner--small">
          <DashboardSmallBannerSection
            name="Carbon Emissions"
            value={
              dashboard_carbon_emissions &&
              numberFormatter(dashboard_carbon_emissions.value.toFixed(2))
            }
            unit={dashboard_carbon_emissions && dashboard_carbon_emissions.unit}
          />
          <DashboardSmallBannerSection
            name="Blended Cost of Energy"
            value={cost_of_energy && numberFormatter(cost_of_energy.value.toFixed(2))}
            unit={cost_of_energy && cost_of_energy.unit}
          />
        </article>
      </div>

      <article className="dashboard-row-2 dashboard-bar-container">
        <DashboardStackedBarChart
          className=""
          data={daily_kwh}
          organization={name}
        />
      </article>

      <div className="dashboard-row-3">
        <article className="dashboard-pie-container">
          <DashboardDoughnutChart data={usage_hours} />
        </article>

        <article className="dashboard-today-and-yesterday">
          <div className="today-usage">
            <h3 className="today-usage__heading">Today's Usage (KWh)</h3>
            <div className="usage-value-and-arrow">
              <p className="today-usage__value">{numberFormatter(todaysValue)}</p>
              {isTodaysValueLessThanYesterdays ? (
                <DashboardDownArrow />
              ) : (
                <DashboardUpArrow />
              )}
            </div>
          </div>
          <div className="yesterday-usage">
            <h3 className="yesterday-usage__heading">
              Yesterday's Usage (KWh)
            </h3>
            <div className="usage-value-and-arrow">
              <p className="yesterday-usage__value">{numberFormatter(yesterdaysValue)}</p>
              {isTodaysValueLessThanYesterdays ? (
                <DashboardUpArrow />
              ) : (
                <DashboardDownArrow />
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default Dashboard;
