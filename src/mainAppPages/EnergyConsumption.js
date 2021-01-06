import React, { useEffect, useContext } from 'react';

import CompleteDataContext from '../Context';

import {
  formatParametersDatetimes,
  formatParametersDates,
  formatParametersTimes,
  formatParameterTableData,
} from '../helpers/genericHelpers';

import BreadCrumb from '../components/BreadCrumb';
import EnergyConsumptionBarChart from '../components/barCharts/EnergyConsumptionBarChart';

import PrintButtons from '../smallComponents/PrintButtons';

import ExcelIcon from '../icons/ExcelIcon';
import EnergyConsumptionTable from '../components/tables/EnergyConsumptionTable';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Parameters', id: 2 },
  { url: '#', name: 'Energy Consumption', id: 3 },
];

function EnergyConsumption({ match }) {
  const { refinedRenderedData, setCurrentUrl } = useContext(
    CompleteDataContext
  );

  const {
    energy_consumption_values,
    energy_consumption_current,
    energy_consumption_previous,
    energy_consumption_usage,
  } = refinedRenderedData;

  const chartConsumptionValues =
    energy_consumption_values &&
    energy_consumption_values.map((eachDevice) => eachDevice.value);

  const allDeviceNames =
    energy_consumption_values &&
    energy_consumption_values.map((eachDevice) => eachDevice.deviceName);

  const chartDates =
    energy_consumption_values &&
    formatParametersDatetimes(energy_consumption_values[0].dates);

  const energyConsumptionUnit =
    energy_consumption_values && energy_consumption_values[0].units;

  const energyConsumptionValuesTableDataClone =
    energy_consumption_values &&
    energy_consumption_values.map((eachDevice) => {
      return {
        [eachDevice.deviceName]: eachDevice.value,
      };
    });

  const allDates =
    energy_consumption_values && energy_consumption_values[0].dates;

  const tableEnergyConsumptionValues =
    energyConsumptionValuesTableDataClone &&
    Object.assign(...energyConsumptionValuesTableDataClone);

  const tableHeadings = Object.keys({
    date: '',
    time: '',
    ...tableEnergyConsumptionValues,
  });

  const tableValues = Object.values({
    date: allDates && formatParametersDates(allDates),
    time: allDates && formatParametersTimes(allDates),
    ...tableEnergyConsumptionValues,
  });

  const formattedTableData = formatParameterTableData(
    tableHeadings,
    tableValues
  );

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <article className='parameters-stacked-bar-container'>
        <EnergyConsumptionBarChart
          chartConsumptionValues={chartConsumptionValues}
          chartDeviceNames={allDeviceNames}
          chartDates={chartDates}
          energyConsumptionUnit={energyConsumptionUnit}
        />
      </article>

      <div className='energy-consumption-middle-cards-container'>
        <p className='energy-consumption-middle-card'>
          <span className='energy-consumption-middle-card-heading'>
            Previous
          </span>
          <span className='energy-consumption-middle-card-body'>
            {energy_consumption_previous}KwH
          </span>
        </p>
        <p className='energy-consumption-middle-card'>
          <span className='energy-consumption-middle-card-heading'>
            Current
          </span>
          <span className='energy-consumption-middle-card-body'>
            {energy_consumption_current}KwH
          </span>
        </p>
        <p className='energy-consumption-middle-card'>
          <span className='energy-consumption-middle-card-heading'>Usage</span>
          <span className='energy-consumption-middle-card-body'>
            {energy_consumption_usage}KwH
          </span>
        </p>
      </div>

      <article className='energy-consumption-table-container'>
        <div className='parameters-table-header'>
          <div className='h-hidden-medium-down'>
            <button className='parameters-table-left-button'>PDF</button>
            <button className='parameters-table-left-button'>CSV</button>
          </div>

          <h3 className='parameters-table-heading'>Raw Logs</h3>

          <button className='parameters-table-right-button h-hidden-medium-down'>
            <ExcelIcon />
            <span>Download in Excel</span>
          </button>
        </div>

        <div className='energy-consumption-table-wrapper'>
          <EnergyConsumptionTable
            energyConsumptionUnit={energyConsumptionUnit}
            energyConsumptionData={formattedTableData}
          />
        </div>
      </article>
    </>
  );
}

export default EnergyConsumption;
