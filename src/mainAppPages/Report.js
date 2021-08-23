import React, { useEffect, useContext, useState } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';


import ReportHttpServices from '../services/report';

import GenericReportTable from '../components/tables/reportTables/GenericReportTable';
import ReportDailyConsumptionBar from '../components/barCharts/ReportDailyConsumptionBar';

import StopWatch from '../icons/StopWatch';
import Plug from '../icons/Plug';
import ElectricSpark from '../icons/ElectricSpark';
import CO2Icon from '../icons/CarbonFootPrint';
import DownWithBaseLine from '../icons/DownWithBaseLine';
import RecordCard from '../smallComponents/reports/RecordCard';
import MiniDoubleCard from '../smallComponents/reports/MiniDoubleCard';
import LargeDoubleCard from '../smallComponents/reports/LargeDoubleCard';
import SourceConsumptionPieChart from '../smallComponents/reports/SourceConsumptionPieChart';
import {
  CostImplicationColumn, DemandAndStatisticsColumn, 
  DemandAndStatisticsTwoColumn, 
  FuelConsumption, GeneratorEfficiency,
  LoadImbalanceColumns, PowerDemandColumns, TimeOfUseColumns
} from '../helpers/tableColumns';



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
    ReportHttpServices.getAll().then((returnedData) => {
      return setReportPageData(returnedData)
    }
    );
  }, []);

  const {
    period_score,
    total_energy_consumption,
    power_demand,
    papr,
    source_consumption,
    load_imbalance,
    time_of_use,
    fuel_consumption,
    generator_efficiency,
    cost_implication,
    daily_consumption,
    demand_statistic,
  } = reportPageData;


  let powerDemand = []
  power_demand && Object.entries(power_demand).map(([key, value]) => {
    powerDemand.push({ key, ...value })
  })

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
          {
            period_score &&
            <RecordCard {...period_score}
              header='Period Score'
              footer="Score as compared to previous period"
              icon={StopWatch} type='periodScore' />
          }
          {
            total_energy_consumption &&
            <RecordCard {...total_energy_consumption}
              header='Total Energy Consumption'
              footer="Total Energy Consumption accross sources"
              icon={ElectricSpark} type='energyConsumptionScore' />
          }
          {papr &&
            <MiniDoubleCard percentage={papr.percentage}
              metrics={papr.metrics} type='paprScore'
              header='PAPR Score' icon={Plug} />
          }
        </div>
      </div>
      <div className="report-row-1">
        <div className="report-row-1__content">
          {
            period_score &&
            <RecordCard {...period_score}
              header='Co2 Footprint'
              footer="Carbondioxide Consumption"
              icon={CO2Icon} type='CO2Score' />
          }
          {
            period_score &&
            <LargeDoubleCard percentage={papr.percentage}
              metrics={papr.metrics} type='paprScore' 
              header='Baseline Consumption' 
              icon={DownWithBaseLine} />
          }
        </div>
      </div>

      <div className="report-table-rows">
        <div className="report-row-1__content">
          <div className="report-pie-container">
            <h2 className='report-pie-heading'>
              Source Consumption(Kwh)
            </h2>
            {
              source_consumption &&
              <SourceConsumptionPieChart
                data={source_consumption} />
            }
          </div>
          {(
            <div className="report-pie-container">
              <div className="h-overflow-auto report-card">
                <h2 className="report-pie-heading">
                  Load Imbalance Occurence
                </h2>
                <GenericReportTable data={load_imbalance}
                  columnData={LoadImbalanceColumns} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="report-table-rows">
        <div className="report-row-1__content">
          {(
            <div className="report-table-container">
              <div className="h-overflow-auto report-card">
                <h2 className="report-pie-heading">
                  Fuel Consumption
                </h2>
                <GenericReportTable data={fuel_consumption}
                  columnData={FuelConsumption} />
              </div>
            </div>
          )}
          {(
            <div className="report-table-container">
              <div className="h-overflow-auto report-card">
                <h2 className="report-pie-heading">
                  Generator Efficiency & Recommendation
                </h2>
                <GenericReportTable data={generator_efficiency}
                  columnData={GeneratorEfficiency} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="report-full-width-rows">
        <div className="report-row-1__content">
          {daily_consumption && (
            <div className="report-chart-container">
              <h2 className="report-pie-heading">
                Daily Energy Consumption
              </h2>
              <ReportDailyConsumptionBar dailyConsumptionData={daily_consumption}
              />
            </div>
          )}
        </div>
      </div>
      <div className="report-full-width-with-no-height-rows">
        <div className="report-row-1__content">
          {(
            <div className="report-demand-container">
              <div className="h-overflow-auto report-card">
                <h2 className="report-pie-heading">
                  Demand and Statistics
                </h2>
                <GenericReportTable data={demand_statistic}
                  columnData={DemandAndStatisticsColumn} />
                <hr className='demand-statistic-space-hr' />
                <GenericReportTable data={demand_statistic}
                  columnData={DemandAndStatisticsTwoColumn} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="report-full-width-rows">
        <div className="report-row-1__content">
          {(
            <div className="report-chart-container">
              <div className="h-overflow-auto report-card">
                <h2 className="report-pie-heading">
                  Cost Implication
                </h2>
                <GenericReportTable data={cost_implication}
                  columnData={CostImplicationColumn} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="report-table-rows">
        <div className="report-row-1__content">
          {(
            <div className="report-table-container">
              <div className="h-overflow-auto report-card">
                <h2 className="report-pie-heading">
                  Time of Use
                </h2>
                <GenericReportTable data={time_of_use}
                  columnData={TimeOfUseColumns} />
              </div>
            </div>
          )}
          {(
            <div className="report-table-container">
              <div className="h-overflow-auto report-card">
                <h2 className="report-pie-heading">
                  Power Demand
                </h2>
                <GenericReportTable data={powerDemand}
                  columnData={PowerDemandColumns} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Report;
