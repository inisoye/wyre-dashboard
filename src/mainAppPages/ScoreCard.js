import React, { useEffect, useContext, useState } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import ScoreCardDoughnutChart from '../components/pieCharts/ScoreCardDoughnutChart';
import ScoreCardTable from '../components/tables/ScoreCardTable';
import ScoreCardBarChart from '../components/barCharts/ScoreCardBarChart';
import ScoreCardGenEfficiencyDoughnut from '../components/pieCharts/ScoreCardGenEfficiencyDoughnut';
import ScoreCardFuelConsumptionDoughnut from '../components/pieCharts/ScoreCardFuelConsumptionDoughnut';
import Loader from '../components/Loader';
import getAllDeviceData from '../helpers/organizationDataHelpers';


import UpArrowIcon from '../icons/UpArrowIcon';

import { calculateRatio, calculatePercentage } from '../helpers/genericHelpers';
import { numberFormatter } from "../helpers/numberFormatter";
import dataHttpServices from "../services/devices";

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Score Card', id: 2 },
];



function ScoreCard({ match }) {
  const {
    deviceData,
    refinedRenderedData,
    setCurrentUrl,
    isAuthenticatedDataLoading,
  } = useContext(CompleteDataContext);
 
  const orgDeviceType = Object.entries(deviceData);
  const eachOrgType = orgDeviceType.map(eachDevice => eachDevice[1]);
  const getEachOrgType = eachOrgType.map(device => device.is_gen);
  console.log(getEachOrgType);

  const checkIsGenStatus = (getEachOrgType) => {
    const checkStatus = getEachOrgType.filter(Boolean);
    return checkStatus.length
  };
  const isGenStatus = checkIsGenStatus(getEachOrgType);

  const [arrowColor, setArrowColor] = useState('#fa0303');


  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const {
    organization_device_type,
    baseline_energy,
    peak_to_avg_power_ratio,
    score_card_carbon_emissions,
    generator_size_efficiency,
    change_over_lags,
    operating_time,
    fuel_consumption,
  } = refinedRenderedData;

  console.log(peak_to_avg_power_ratio);
  const deviceTypeArray = {...organization_device_type}
  console.log(baseline_energy);

  const generatorSizeEffficiencyData =
    generator_size_efficiency && generator_size_efficiency.filter(Boolean);
  //console.log(generatorSizeEffficiencyData);
  const generatorSizeEffficiencyDoughnuts =
    generatorSizeEffficiencyData &&
    generatorSizeEffficiencyData.map((eachGenerator) => (
      
      <ScoreCardGenEfficiencyDoughnut
        dataTitle='Generator Size Efficiency'
        dataSubtitle='
        This info-graph measures(b)
        and scores the efficiency(b)
        or inefficiency of the(b)
        generator’s size in(b)
        comparison to power(b)
        demanded by the facility. '
        data={eachGenerator}
        key={eachGenerator.name}

      />
    ));

  const fuelConsumptionData =
    fuel_consumption && fuel_consumption.filter(Boolean);

  const fuelConsumptionDoughnuts =
    fuelConsumptionData &&
    fuelConsumptionData.map((eachGenerator) => (
      <ScoreCardFuelConsumptionDoughnut
        dataTitle='Fuel Consumption'
        dataSubtitle='
        (95% Accuracy) Estimated fuel(b)
        consumed on each generator and(b)
        the number of hours each generator(b)
        has been operated for. '
        data={eachGenerator}
        key={eachGenerator.name}
      />
    ));
  
   if (isAuthenticatedDataLoading) {
     return <Loader />;
   }
  
     
  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div className='score-card-row-1'>
        <article className='score-card-row-1__item baseline-energy-container'>
          <h2 className='score-card-heading'>Baseline Energy</h2>

          <div className='score-card-doughnut-container'>
            <ScoreCardDoughnutChart
              dataTitle='Baseline Energy'
              dataSubtitle='
              This is an algorithm that forecasts(b)
              energy consumption using weather(b)
              and number of days to set a baseline(b)
              usage.(b)
              Baseline usage is compared to actual(b)
              consumption to score energy(b)
              performance.'
              data={baseline_energy}
            />

            <p className='doughnut-centre-text'>
              <span>
                {baseline_energy &&
                  calculatePercentage(
                    baseline_energy.used,
                    baseline_energy.forecast
                  )}
                %
              </span>
              <span> Used</span>
            </p>
          </div>

          <p className='score-card-bottom-text'>
            Baseline Forecast: {baseline_energy && numberFormatter(baseline_energy.forecast)}
            {baseline_energy && baseline_energy.unit}
          </p>

          <p className='score-card-bottom-text h-mt-16'>
            So far (Days): {baseline_energy && numberFormatter(baseline_energy.used)}
            {baseline_energy && baseline_energy.unit}
          </p>

          <p className='score-card-bottom-text h-mt-24'>
            Saving Inbound of{' '}
            <span className='h-green-text'>
              {baseline_energy &&
                numberFormatter(baseline_energy.forecast - baseline_energy.used)}
              {baseline_energy && baseline_energy.unit}
            </span>
          </p>
        </article>

        <article className='score-card-row-1__item'>
          <h2 className='score-card-heading peak-to-average-container'>
            Peak to Average Power Ratio
          </h2>

          <div className='score-card-doughnut-container'>
            <ScoreCardDoughnutChart
              dataTitle='Peak to Average Power Ratio'
              dataSubtitle='
              Represents the disparity between(b)
              peak and average power within a(b)
              facility. To optimize efficiency,(b)
              the goal is to close the gap between(b)
              both metrics. The aim is to score as(b)
              close to 1 as possible.'
              data={peak_to_avg_power_ratio}
            />

            <p className='doughnut-centre-text'>
              <span>
                {peak_to_avg_power_ratio &&
                  calculateRatio(
                    peak_to_avg_power_ratio.peak,
                    peak_to_avg_power_ratio.avg
                  )}{' '}
              </span>
            </p>
          </div>

          <p className='score-card-bottom-text'>
            Average Load:{' '}
            {peak_to_avg_power_ratio && numberFormatter(peak_to_avg_power_ratio.avg)}
            {peak_to_avg_power_ratio && peak_to_avg_power_ratio.unit}
          </p>

          <p className='score-card-bottom-text h-mt-16'>
            Peak Load: {peak_to_avg_power_ratio && numberFormatter(peak_to_avg_power_ratio.peak)}
            {peak_to_avg_power_ratio && peak_to_avg_power_ratio.unit}
          </p>

          <div className='score-card-bottom-text score-card-message-with-icon h-mt-24 h-flex'>
            <p className='h-red-text'>Not so efficient - Higher is better</p>
            <UpArrowIcon className={peak_to_avg_power_ratio.avg < peak_to_avg_power_ratio.peak ? arrowColor : setArrowColor('#008000')}/>
          </div>
        </article>

        <article className='score-card-row-1__item'>
          <h2 className='score-card-heading carbon-emission-container'>
            Carbon Emission
          </h2>

          <div className='score-card-doughnut-container'>
            <ScoreCardDoughnutChart
              dataTitle='Carbon Emission'
              dataSubtitle='
            Carbon foot print on all energy(b)
            sources. Diesel: 2.68kg of CO2 per(b)
            liter Natural Gas: 0.549kg of CO2 per(b)
            kWh A typical hardwood tree can absorb as(b)
            much as 48 pounds of carbon dioxide per(b)
            year. This means it will sequester(b)
            approximately 1 ton of carbon dioxide(b)
            by the time it reaches 40 years old.'
              data={score_card_carbon_emissions}
            />

            <p className='doughnut-centre-text'>
              <span>
                {score_card_carbon_emissions &&
                  calculatePercentage(
                    score_card_carbon_emissions.actual_value,
                    score_card_carbon_emissions.estimated_value
                  )}
                %
              </span>{' '}
              Used
            </p>
          </div>

          <p className='score-card-bottom-text'>
            Estimated:{' '}
            {score_card_carbon_emissions &&
              numberFormatter(score_card_carbon_emissions.estimated_value)}{' '}
            {score_card_carbon_emissions && score_card_carbon_emissions.unit}
          </p>

          <p className='score-card-bottom-text h-mt-16'>
            Actual Emission:{' '}
            {score_card_carbon_emissions &&
              numberFormatter(score_card_carbon_emissions.actual_value)}{' '}
            {score_card_carbon_emissions && score_card_carbon_emissions.unit}
          </p>

          {/* <p className='score-card-bottom-text h-mt-24 h-red-text'>
            <span>Conditional Sub-text Should Go Here</span>{' '}
            <span className='score-card-bottom-text-small'>
              (Additional Conditional Sub-text Should Go Here)
            </span>
          </p> */}
        </article>
      </div>

     
      <div className={isGenStatus > 0 ? 'score-card-row-4' : 'hideCard'} style={{marginBottom:'50px'}}>
        <article className='score-card-row-4__left'>
          <h2 className='score-card-heading'>Generator Size Efficiency</h2>
          {generatorSizeEffficiencyDoughnuts}
          <p className='gen-efficiency-footer-text'>
            Utilization factor for facility generators
          </p>
        </article>

        <article className='score-card-row-4__right'>
          <h2 className='score-card-heading'>Fuel Consumption</h2>
          {fuelConsumptionDoughnuts}
          <p className='fuel-consumption-footer-text'>
            Estimated Fuel Consumption for facility gens
          </p>
        </article>
      </div>

      <article className={isGenStatus > 0 ? 'score-card-row-2' : 'hideCard'}>
        <h2 className='changeover-lags-heading score-card-heading'>
          Change Over Lags
        </h2>
        <ScoreCardTable changeOverLagsData={change_over_lags} />
      </article>

      <article className='score-card-row-3'>
        <ScoreCardBarChart operatingTimeData={operating_time} 
          dataTitle='Operating Time'
          dataMessage='Reports each event and duration(b)
         generators are operated outside(b)
         official hours, the diesel consumed(b)
         and cost in Naira.'
        />
      </article>
    </>
  );
}

export default ScoreCard;
