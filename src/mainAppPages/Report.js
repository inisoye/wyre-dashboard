import React, { useEffect, useContext, useState } from 'react';
import { Rate } from 'antd';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';


import ReportHttpServices from '../services/report';

import { numberFormatter } from '../helpers/numberFormatter';

import ReportOverviewTable from '../components/tables/reportTables/ReportOverviewTable';
import ReportBranchPerformanceTable1 from '../components/tables/reportTables/ReportBranchPerformanceTable1';
import ReportEnergyConsumedGroupedBarChart from '../components/barCharts/ReportEnergyConsumedGroupedBarChart';
import ReportBranchPerformanceTable2 from '../components/tables/reportTables/ReportBranchPerformanceTable2';
import ReportPowerDemandGroupedBarChart from '../components/barCharts/ReportPowerDemandGroupedBarChart';
import ReportsPowerDemandPieChart from '../components/pieCharts/ReportsPowerDemandPieChart';
import ReportPowerDemandBarChart from '../components/barCharts/ReportPowerDemandBarChart';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Report', id: 2 },
];

function Report({ match }) {
  const [reportPageData, setReportPageData] = useState({});
  const { setCurrentUrl } = useContext(CompleteDataContext);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  useEffect(() => {
    ReportHttpServices.getAll().then((returnedData) =>
      setReportPageData(returnedData)
    );
  }, []);

  const {
    displayed_data,
    period_score,
    total_energy_consumed,
    blended_cost_of_energy,
    overview,
    branch_performance_1,
    energy_consumed_monthly,
    branch_performance_2,
    recommendation,
    power_demand_periods_bar,
    power_demand_periods_pie,
    power_demand,
  } = reportPageData;

  const isCardRendered = (cardName) =>
    displayed_data && displayed_data.includes(cardName);

  const blendedCostOfEnergyValues =
    blended_cost_of_energy && Object.values(blended_cost_of_energy);

  const blendedCostOfEnergyNames =
    blended_cost_of_energy && Object.keys(blended_cost_of_energy);

  const blendedCostOfEnergyElements =
    blendedCostOfEnergyValues &&
    blendedCostOfEnergyValues.map((eachValue, index) => {
      const isItemTotal = blendedCostOfEnergyNames[index] === 'total';

      return (
        <p
          className={
            isItemTotal
              ? 'report-card-3__item report-card-3__total'
              : 'report-card-3__item'
          }
          key={blendedCostOfEnergyNames[index]}
        >
          <span className="h-title-case">
            {blendedCostOfEnergyNames[index]}
          </span>{' '}
          <span className="h-screen-reader-text"> value is </span>
          {!isItemTotal && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="12"
              fill="none"
              viewBox="0 0 33 12"
            >
              <path
                fill="#5616F5"
                d="M32.661 5.327L24.767.104c-.324-.214-.738-.087-.926.284-.187.372-.076.847.248 1.061l5.707 3.776H.678C.303 5.225 0 5.573 0 6c0 .43.303.777.678.777H29.79l-5.702 3.773c-.324.214-.435.69-.248 1.06.126.25.354.389.588.389a.61.61 0 00.338-.104l7.894-5.224A.804.804 0 0033 6a.804.804 0 00-.339-.673z"
              ></path>
            </svg>
          )}
          <span> {numberFormatter(eachValue)}/kWh</span>
        </p>
      );
    });

  return (
    <>
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
        
      </div>

      <div className="report-row-1">
        <h2 className="report-row-1__heading report-row-heading h-first">
          Top Management
        </h2>
        <div className="report-row-1__content">
          {isCardRendered('period_score') && (
            <div className="report-row-1-card report-card-1 report-card">
              <h3 className="report-card-1-heading">Period Score</h3>
              <p className="report-card-1-percentage">
                {period_score && numberFormatter(period_score.percentage_score)}
                %
              </p>
              <div className="report-card-1-rating">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={period_score && period_score.rating}
                />
              </div>
              <p className="report-card-1-paragraph">
                Score as compared to previous period
              </p>
            </div>
          )}

          {isCardRendered('total_energy_consumed') && (
            <div className="report-row-1-card report-card-2 report-card">
              <div className="report-card-2__top">
                <div className="report-card-2__topleft">
                  <p>
                    <span className="report-energy-consumed-value h-block">
                      {total_energy_consumed &&
                        numberFormatter(
                          total_energy_consumed.total_energy_consumed
                        )}
                    </span>
                    <span className="h-screen-reader-text"> is the</span>
                    <span className="report-card-2-decr report-energy-consumed-decr">
                      {' '}
                      Total Energy Consumed (kWh)
                    </span>
                  </p>
                </div>
                <div className="report-card-2__topright">
                  <div>
                    <p className="report-card-2-topright__first">
                      <span className="h-block report-card-2-decr">
                        Forecasted Baseline{' '}
                      </span>
                      <span className="h-screen-reader-text"> value is </span>
                      <span className="report-card-2-topright__value">
                        {total_energy_consumed &&
                          numberFormatter(
                            total_energy_consumed.total_energy_consumed
                          )}{' '}
                        kWh
                      </span>
                    </p>

                    <p className="report-card-2-topright__second">
                      <span className="h-block report-card-2-decr">
                        Savings{' '}
                      </span>
                      <span className="h-screen-reader-text"> value is </span>
                      <span className="report-card-2-topright__value">
                        {total_energy_consumed &&
                          numberFormatter(total_energy_consumed.savings)}{' '}
                        kWh
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="report-card-2__bottom">
                <p>
                  You lost approximately{' '}
                  <span className="report-card-2-bottom__value">
                    ₦
                    {total_energy_consumed &&
                      numberFormatter(total_energy_consumed.amount_lost)}
                  </span>
                </p>
              </div>
            </div>
          )}

          {isCardRendered('blended_cost_of_energy') && (
            <div className="report-row-1-card report-card-3 report-card h-text-center">
              <h3 className="report-card-3__heading">Blended Cost of Energy</h3>
              <div className="report-card-3__content">
                {blendedCostOfEnergyElements}
              </div>
            </div>
          )}
        </div>
      </div>

      {isCardRendered('overview') && (
        <div className="report-row-2">
          <h2 className="report-row-2__heading report-row-heading">Overview</h2>
          <div className="h-overflow-auto report-card">
            <ReportOverviewTable data={overview} />
          </div>
        </div>
      )}

      {isCardRendered('branch_performance_1') && (
        <div className="report-row-3 ">
          <h2 className="report-row-3__heading report-row-heading">
            Branch Performance
          </h2>
          <div className="h-overflow-auto report-card">
            <ReportBranchPerformanceTable1 data={branch_performance_1} />
          </div>
        </div>
      )}

      {isCardRendered('energy_consumed_monthly') && (
        <div className="report-row-4">
          <h2 className="report-row-4__heading report-row-heading">
            Energy Consumed Monthly
          </h2>
          <div className="report-card report-row-4__bar">
            <ReportEnergyConsumedGroupedBarChart
              data={energy_consumed_monthly}
            />
          </div>
        </div>
      )}

      {isCardRendered('branch_performance_1') && (
        <div className="report-row-5 ">
          <h2 className="report-row-5__heading report-row-heading">
            Branch Performance
          </h2>
          <div className="h-overflow-auto report-card">
            <ReportBranchPerformanceTable2 data={branch_performance_2} />
          </div>
        </div>
      )}

      {isCardRendered('recommendation') && (
        <div className="report-row-6">
          <h2 className="report-row-6__heading report-row-heading">
            Recommendation
          </h2>
          <div className="report-card report-row-6-list__container">
            <ul className="report-row-6__list">
              {recommendation &&
                recommendation.map((eachItem) => (
                  <li className="report-row-6__item" key={eachItem}>
                    {eachItem}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      <div className="report-row-7">
        <h2 className="report-row-7__heading report-row-heading">
          Power Demand
        </h2>
        <div className="report-row-7__content">
          {isCardRendered('power_demand_periods_bar') && (
            <div className="report-card report-row-7-card report-row-7__bar">
              <ReportPowerDemandGroupedBarChart
                data={power_demand_periods_bar}
              />
            </div>
          )}

          {isCardRendered('power_demand_periods_pie') && (
            <div className="report-card report-row-7-card">
              {power_demand_periods_pie && (
                <ReportsPowerDemandPieChart data={power_demand_periods_pie} />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="report-row-8">
        <h2 className="report-row-8__heading report-row-heading">
          Power Demand
        </h2>

        <div className="report-card">
          <ReportPowerDemandBarChart data={power_demand} />
        </div>
      </div>
    </>
  );
}

export default Report;
