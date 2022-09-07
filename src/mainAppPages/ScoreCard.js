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

import { SCORE_CARD_TOOLTIP_MESSAGES } from '../components/toolTips/Score_Card_Tooltip_Messages';
// import { SCORE_CARD_TOOLTIP_MESSAGES } from '../helpers/constants';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Score Card', id: 2 },
];


function ScoreCard({ match }) {
  const {
    refinedRenderedData,
    setCurrentUrl,
    isAuthenticatedDataLoading,
    uiSettings
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

  let date, ratio, savingdInbound, savingdInboundCarbonEmmission, arrowColor, getPeakResult;
  let noOfTrees, message, generatorSizeEffficiencyData, generatorSizeEffficiencyDoughnuts, fuelConsumptionData;
  let deviceLength, fuelConsumptionDoughnuts;

  const dataPresent = Object.keys(refinedRenderedData).length !== 0;
  if (Object.keys(refinedRenderedData).length !== 0) {
    date = new Date();
    ratio = calculateRatio(peak_to_avg_power_ratio.avg, peak_to_avg_power_ratio.peak);
    savingdInbound = baseline_energy.forecast - ((baseline_energy.used / date.getDate()) * daysInMonth());
    savingdInboundCarbonEmmission = numberFormatter((score_card_carbon_emissions.estimated_value - ((score_card_carbon_emissions.actual_value / date.getDate()) * daysInMonth())));

    getPeakResult = getPeakToAverageMessage(ratio);
    arrowColor = getPeakResult.color;

    //calculate number of trees for carbon emission
    noOfTrees = (score_card_carbon_emissions.actual_value * 6).toFixed(2);
    message = "Equivalent to " + noOfTrees + " Acacia trees";


    generatorSizeEffficiencyData =
      generator_size_efficiency && generator_size_efficiency.filter(Boolean);
    generatorSizeEffficiencyData = generatorSizeEffficiencyData.filter(
      eachDevice => eachDevice.is_gen === true
    );

    generatorSizeEffficiencyDoughnuts =
      generatorSizeEffficiencyData &&
      generatorSizeEffficiencyData.map((eachGenerator) => (

        <ScoreCardGenEfficiencyDoughnut
          data={eachGenerator}
          key={eachGenerator.name}
          uiSettings={uiSettings}

        />
      ));

    fuelConsumptionData =
      fuel_consumption && fuel_consumption.filter(Boolean);

    fuelConsumptionData = fuelConsumptionData.filter(
      eachDevice => eachDevice.is_gen === true
    );

    deviceLength = fuelConsumptionData.length;

    fuelConsumptionDoughnuts =
      fuelConsumptionData &&
      fuelConsumptionData.map((eachGenerator) => (
        <ScoreCardFuelConsumptionDoughnut
          data={eachGenerator}
          key={eachGenerator.name}
          uiSettings={uiSettings}
        />
      ));

  }

  if (isAuthenticatedDataLoading) {
    return <Loader />;
  }


  return (
    <> {
      dataPresent && (<>
        <div className='breadcrumb-and-print-buttons'>
          <BreadCrumb routesArray={breadCrumbRoutes} />
        </div>

        <div className='score-card-row-1'>
          <article className='score-card-row-1__item'>
            <div className='doughnut-card-heading'>
              <h2 className='score-card-heading'>
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
                uiSettings={uiSettings}
                data={baseline_energy}
              />

              <p className='doughnut-centre-text'>
                <span>
                  {baseline_energy &&
                    (calculatePercentage(
                      baseline_energy.used,
                      baseline_energy.forecast
                    ) || `-`)}{baseline_energy.used && '%'}
                </span>
                <span>{baseline_energy.used && baseline_energy.forecast ? `used` : ' '}</span>
              </p>
            </div>

            <p className='score-card-bottom-text'>
              Baseline Forecast: {baseline_energy && numberFormatter(baseline_energy.forecast)}
              {baseline_energy && baseline_energy.unit}
            </p>

            <p className='score-card-bottom-text h-mt-16'>
              So far ({new Date().getDate()} Days): {baseline_energy && numberFormatter(baseline_energy.used)}
              {baseline_energy && baseline_energy.unit}
            </p>

            <p className='score-card-bottom-text h-mt-24'>
              Savings Inbound {' '}

              {savingdInbound && <span style={{ color: getBaselineEnergyColor(savingdInbound).color }}>{
                numberFormatter(savingdInbound)
              }
              </span>
              }
              {/* {baseline_energy && baseline_energy.unit} */}

            </p>
          </article>

          <article className='score-card-row-1__item'>
            <div className='doughnut-card-heading'>
              <h2 className='score-card-heading'>
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
                uiSettings={uiSettings}
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
              <h2 className='score-card-heading'>
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
                uiSettings={uiSettings}
                data={score_card_carbon_emissions}
              />

              <p className='doughnut-centre-text'>
                <span>
                  {score_card_carbon_emissions &&
                    (calculatePercentage(
                      score_card_carbon_emissions.actual_value,
                      score_card_carbon_emissions.estimated_value
                    ) || `-`)}{score_card_carbon_emissions.actual_value && '%'}
                </span>{score_card_carbon_emissions.actual_value ? `used` : ' '}
              </p>
            </div>

            <p style={{ padding: 0 }} className='score-card-bottom-text'>
              Estimated:{' '}
              {score_card_carbon_emissions &&
                numberFormatter(score_card_carbon_emissions.estimated_value)}{' '}
              {score_card_carbon_emissions && score_card_carbon_emissions.unit}
            </p>

            <p className='score-card-bottom-text h-mt-16' style={{ padding: 0, margin: 0 }}>
              Actual Emission:{' '}
              {score_card_carbon_emissions &&
                numberFormatter(score_card_carbon_emissions.actual_value)}{' '}
              {score_card_carbon_emissions && score_card_carbon_emissions.unit}
            </p>

            <p className='score-card-bottom-text h-mt-16' style={{ padding: 0, margin: 0 }}>
              Savings Inbound {' '}
              {savingdInboundCarbonEmmission && <span style={{
                color: getBaselineEnergyColor(savingdInboundCarbonEmmission).color
              }}>{
                  savingdInboundCarbonEmmission
                }
              </span>
              }
            </p>

            <p className='score-card-bottom-text h-mt-24' style={{ padding: 0, margin: 0 }} >
              <span>{message}</span>
              <EcoFriendlyIcon className="ecoFriendlyIcon" />

              {/* <span>{message}</span> */}
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
            {/* <h2 className='score-card-heading'>Generator Size Efficiency</h2> */}
            <div className='doughnut-card-heading'>
              <h2 className='score-card-heading'>Generator Size Efficiency</h2>
              <Tooltip placement='top' style={{ textAlign: 'justify' }}
                overlayStyle={{ whiteSpace: 'pre-line' }} title={SCORE_CARD_TOOLTIP_MESSAGES.SIZE_EFFICIENCY}>
                <p>
                  <InformationIcon className="info-icon" />
                </p>
              </Tooltip>
            </div>
            {generatorSizeEffficiencyDoughnuts}
            <p className='gen-efficiency-footer-text'>
              Utilization Factor for Facility Generators
            </p>
          </article>

          <article className='score-card-row-4__right'>
            <div className='doughnut-card-heading'>
              <h2 className='score-card-heading'>Fuel Efficiency</h2>
              <Tooltip placement='top' style={{ textAlign: 'justify' }}
                overlayStyle={{ whiteSpace: 'pre-line' }} title={SCORE_CARD_TOOLTIP_MESSAGES.FUEL_EFFICIENCYL}>
                <p>
                  <InformationIcon className="info-icon" />
                </p>
              </Tooltip>
            </div>
            {fuelConsumptionDoughnuts}
            <p className='fuel-consumption-footer-text'>
              Estimated Fuel Consumption for Facility Generators
            </p>
          </article>
        </div>

        {/* <article className={deviceLength > 0 ? 'score-card-row-2' : 'hideCard'}>
          <h2 className='changeover-lags-heading score-card-heading'>
            Change Over Lags
          </h2>
          <ScoreCardTable changeOverLagsData={change_over_lags} />
        </article> */}


        <article className='score-card-row-3'>
          <ScoreCardBarChart operatingTimeData={operating_time}
            uiSettings={uiSettings}
            dataTitle='Operating Time'
            dataMessage={SCORE_CARD_TOOLTIP_MESSAGES.OPERATING_TIME}
          />
        </article>
      </>)
    }
    </>

  );
}

export default ScoreCard;
