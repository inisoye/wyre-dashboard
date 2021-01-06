import React, { useEffect, useContext } from 'react';
import CompleteDataContext from '../Context';

import {
  formatParametersDatetimes,
  formatParametersDates,
  formatParametersTimes,
  formatParameterTableData,
} from '../helpers/genericHelpers';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

import PowerDemandStackedBarChart from '../components/barCharts/PowerDemandStackedBarChart';
import PowerDemandTable from '../components/tables/PowerDemandTable';

import ExcelIcon from '../icons/ExcelIcon';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Parameters', id: 2 },
  { url: '#', name: 'Power Demand', id: 3 },
];

function PowerDemand({ match }) {
  const { refinedRenderedData, setCurrentUrl } = useContext(
    CompleteDataContext
  );

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const { power_demand } = refinedRenderedData;

  const chartDemandValues =
    power_demand && power_demand.map((eachDevice) => eachDevice.demand);

  const chartDeviceNames =
    power_demand && power_demand.map((eachDevice) => eachDevice.source);

  const chartTooltipValues =
    power_demand &&
    power_demand.map((eachDevice) => {
      return {
        source: eachDevice.source,
        avg: eachDevice.avg,
        min: eachDevice.min,
        max: eachDevice.max,
      };
    });

  const chartDates =
    power_demand && formatParametersDatetimes(power_demand[0].dates);

  const powerDemandUnit = power_demand && power_demand[0].units;

  const powerDemandTableDataClone =
    power_demand &&
    power_demand.map((eachDevice) => {
      // Make the device name available at every data point
      const arrayOfDeviceName =
        typeof eachDevice.source === 'string' &&
        Array(eachDevice.avg.length).fill(eachDevice.source);

      // Remove units and data from table data
      const { units, demand, ...dataWithoutUnitsAndDemand } = eachDevice;

      return { ...dataWithoutUnitsAndDemand, source: arrayOfDeviceName };
    });

  const tableHeadings = Object.keys({
    date: '',
    time: '',
    ...(powerDemandTableDataClone ? powerDemandTableDataClone[0] : []),
  });

  const arrayOfTableValues =
    powerDemandTableDataClone &&
    powerDemandTableDataClone.map((eachDevice) => {
      return Object.values({
        date: formatParametersDates(eachDevice.dates),
        time: formatParametersTimes(eachDevice.dates),
        ...eachDevice,
      });
    });

  const arrayOfFormattedTableData =
    arrayOfTableValues &&
    arrayOfTableValues.map((eachDeviceTableValues) =>
      formatParameterTableData(tableHeadings, eachDeviceTableValues)
    );

  const formattedTableData =
    arrayOfFormattedTableData && arrayOfFormattedTableData.flat(1);

  // Re-add indices
  const formattedTableDataWithIndex =
    formattedTableData &&
    formattedTableData.map(function (currentValue, index) {
      currentValue.index = index + 1;
      return currentValue;
    });

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <article className='parameters-stacked-bar-container'>
        <PowerDemandStackedBarChart
          chartDemandValues={chartDemandValues}
          chartDeviceNames={chartDeviceNames}
          chartTooltipValues={chartTooltipValues}
          chartDates={chartDates}
          powerDemandUnit={powerDemandUnit}
        />
      </article>

      <article className='power-demand-table-container'>
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

        <div className='power-demand-table-wrapper'>
          <PowerDemandTable
            powerDemandUnit={powerDemandUnit}
            powerDemandData={formattedTableDataWithIndex}
          />
        </div>
      </article>
    </>
  );
}

export default PowerDemand;
