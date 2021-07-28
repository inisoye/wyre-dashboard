import React, { useEffect, useContext } from 'react';
import { Tooltip } from 'antd';
import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import ScoreCardDoughnutChart from '../components/pieCharts/ScoreCardDoughnutChart';
import ScoreCardTable from '../components/tables/ScoreCardTable';
import ScoreCardBarChart from '../components/barCharts/ScoreCardBarChart';
import ScoreCardGenEfficiencyDoughnut from '../components/pieCharts/ScoreCardGenEfficiencyDoughnut';
import ScoreCardFuelConsumptionDoughnut from '../components/pieCharts/ScoreCardFuelConsumptionDoughnut';
import Loader from '../components/Loader';

import UpArrowIcon from '../icons/UpArrowIcon';
import EcoFriendlyIcon from '../icons/EcoFriendlyIcon';
import InformationIcon from '../icons/InformationIcon';

import {
  calculateRatio, calculatePercentage, daysInMonth,
  getPeakToAverageMessage, getBaselineEnergyColor
} from '../helpers/genericHelpers';

import { numberFormatter } from "../helpers/numberFormatter";


import { SCORE_CARD_TOOLTIP_MESSAGES } from '../helpers/constants';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Score Card', id: 2 },
];


function ScoreCard({ match }) {
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
    baseline_energy,
    peak_to_avg_power_ratio,
    score_card_carbon_emissions,
    generator_size_efficiency,
    change_over_lags,
    operating_time,
    fuel_consumption,
  } = refinedRenderedData;

  const date = new Date();
  const ratio = calculateRatio(peak_to_avg_power_ratio.peak, peak_to_avg_power_ratio.avg);
  const savingdInbound = numberFormatter(baseline_energy.forecast - ((baseline_energy.used / date.getDate()) * daysInMonth()));

  const getPeakResult = getPeakToAverageMessage(ratio);
  const arrowColor = getPeakResult.color;

  //calculate number of trees for carbon emission
  const noOfTrees = (score_card_carbon_emissions.actual_value * 6).toFixed(2);
  const message = "Equivalent to " + noOfTrees + " Acacia trees";


  let generatorSizeEffficiencyData =
    generator_size_efficiency && generator_size_efficiency.filter(Boolean);
  generatorSizeEffficiencyData = generatorSizeEffficiencyData.filter(
    eachDevice => eachDevice.is_gen === true
  );
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

  let fuelConsumptionData =
    fuel_consumption && fuel_consumption.filter(Boolean);

  fuelConsumptionData = fuelConsumptionData.filter(
    eachDevice => eachDevice.is_gen === true
  );

  let deviceLength = fuelConsumptionData.length;

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
        <article className='score-card-row-1__item'>
          <div className='doughnut-card-heading'>
            <h2 className='score-card-heading carbon-emission-container'>
              Baseline Energy
            </h2>
            <div>
              <Tooltip placement='top' style={{ textAlign: 'justify' }}
                overlayStyle={{ whiteSpace: 'pre-line' }} title={SCORE_CARD_TOOLTIP_MESSAGES.BASE_ENERGY}>
                <p>
                  <InformationIcon className="info-icon" />
                </p>
              </Tooltip>
            </div>
          </div>
          <div className='score-card-doughnut-container'>
            <ScoreCardDoughnutChart
              data={baseline_energy}
            />

            <p className='doughnut-centre-text'>
              <span>
                {baseline_energy &&
                  (calculatePercentage(
                    baseline_energy.used,
                    baseline_energy.forecast
                  )|| `-`)}
              </span>
              <span>{baseline_energy.used &&  baseline_energy.forecast ? `% Used` : ' '}</span>
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

            {savingdInbound && <span style={{ color: getBaselineEnergyColor(savingdInbound).color }}>{
              savingdInbound
            }
            </span>
            }
            {/* {baseline_energy && baseline_energy.unit} */}

          </p>
        </article>

        <article className='score-card-row-1__item'>
          <div className='doughnut-card-heading'>
            <h2 className='score-card-heading carbon-emission-container'>
              Peak to Average Power Ratio
            </h2>
            <div>
              <Tooltip placement='top' style={{ textAlign: 'justify' }}
                overlayStyle={{ whiteSpace: 'pre-line' }} title={SCORE_CARD_TOOLTIP_MESSAGES.PEAK_RATIO}>
                <p>
                  <InformationIcon className="info-icon" />
                </p>
              </Tooltip>
            </div>
          </div>
          <div className='score-card-doughnut-container'>
            <ScoreCardDoughnutChart
              data={peak_to_avg_power_ratio}
            />

            <p className='doughnut-centre-text'>
              <span>
                {peak_to_avg_power_ratio && (
                  calculateRatio(
                    peak_to_avg_power_ratio.avg,
                    peak_to_avg_power_ratio.peak
                  ) || `-`)}{' '}
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
            <p style={{ color: arrowColor }}>{getPeakResult.message}</p>
            <UpArrowIcon className={arrowColor} />
          </div>
        </article>

        <article className='score-card-row-1__item'>
          <div className='doughnut-card-heading'>
            <h2 className='score-card-heading carbon-emission-container'>
              Carbon Emission
            </h2>
            <div>
              <Tooltip placement='top' style={{ textAlign: 'justify' }}
                overlayStyle={{ whiteSpace: 'pre-line' }} title={SCORE_CARD_TOOLTIP_MESSAGES.CARBON}>
                <p>
                  <InformationIcon className="info-icon" />
                </p>
              </Tooltip>
            </div>
          </div>

          <div className='score-card-doughnut-container'>
            <ScoreCardDoughnutChart
              data={score_card_carbon_emissions}
            />

            <p className='doughnut-centre-text'>
              <span>
                {score_card_carbon_emissions &&
                  (calculatePercentage(
                    score_card_carbon_emissions.actual_value,
                    score_card_carbon_emissions.estimated_value
                  ) || `-`)}
              </span>{score_card_carbon_emissions.actual_value ? `% Used` : ' '}
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

          <p className='score-card-bottom-text h-mt-24'>
            <div>
              <span>{message}</span>
              <EcoFriendlyIcon className="ecoFriendlyIcon" />
            </div>

            {/* <span className='score-card-bottom-text-small'>
              {noOfTrees}
            </span>{' '}
            <span>Acacia trees</span> */}
          </p>
        </article>
      </div>
      {/*{isGenStatus > 0 ? 'score-card-row-2' : 'hideCard'}*/}
      <div className={deviceLength > 0 ? 'score-card-row-4' : 'hideCard'} style={{ marginBottom: '50px' }}>
        <article className='score-card-row-4__left'>
          <h2 className='score-card-heading'>Generator Size Efficiency</h2>
          {generatorSizeEffficiencyDoughnuts}
          <p className='gen-efficiency-footer-text'>
            Utilization Factor for Facility Generators
          </p>
        </article>

        <article className='score-card-row-4__right'>
          <h2 className='score-card-heading'>Fuel Consumption</h2>
          {fuelConsumptionDoughnuts}
          <p className='fuel-consumption-footer-text'>
            Estimated Fuel Consumption for Facility Generators
          </p>
        </article>
      </div>

      <article className={deviceLength > 0 ? 'score-card-row-2' : 'hideCard'}>
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
