import React, { useContext } from 'react';
import CompleteDataContext from '../../Context';

import {
  toSnakeCase,
  formatParametersDatetimes,
  formatParametersDates,
  formatParametersTimes,
  formatParameterTableData,
} from '../../helpers/genericHelpers';

import PowerQualityLineChart from '../lineCharts/PowerQualityLineChart';
import PowerQualityTable from '../tables/PowerQualityTable';

import ExcelIcon from '../../icons/ExcelIcon';

function PowerQualityPageSection({ pqData }) {
  // Obtain selected unit from context API
  const { powerQualityUnit } = useContext(CompleteDataContext);
  // Remove stuff in parenthesis then covert string to snake case
  const formattedPowerQualityName = toSnakeCase(
    powerQualityUnit.replace(/\s*\(.*?\)\s*/g, '')
  );

  // Pick out data based on selection in UI
  const plottedData = pqData && pqData[formattedPowerQualityName];
  const plottedDates = pqData && formatParametersDatetimes(pqData.dates);

  // Clone plotted data for usage in table
  const tableData = Object.assign({}, plottedData);
  if (tableData) {
    delete tableData.units;
    delete tableData.deviceName;
  }

  const tableDates = pqData && formatParametersDates(pqData.dates);
  const tableTimes = pqData && formatParametersTimes(pqData.dates);

  const { frequency } = pqData ? pqData : { frequency: ['Empty'] };
  if (frequency) {
    delete frequency.units;
  }

  const tableHeadings = Object.keys({
    date: tableDates,
    time: tableTimes,
    ...tableData,
    frequency: frequency && frequency.average,
  });

  const tableValues = Object.values({
    date: tableDates,
    time: tableTimes,
    ...tableData,
    frequency: frequency && frequency.average,
  });

  const formattedTableData = formatParameterTableData(
    tableHeadings,
    tableValues
  );

  return (
    <section className='parameter-section'>
      <h2 className='parameter-section__heading'>
        {pqData && pqData.deviceName}
      </h2>

      <article className='power-quality-line-container'>
        <PowerQualityLineChart
          data={plottedData}
          dates={plottedDates}
          powerQualityUnit={powerQualityUnit}
        />
      </article>

      <article className='power-quality-table-container'>
        <div className='table-header'>
          <div className='h-hidden-medium-down'>
            <button className='table-header__left-button'>PDF</button>
            <button className='table-header__left-button'>CSV</button>
          </div>

          <h3 className='table-header__heading'>Raw Logs</h3>

          <button className='table-header__right-button h-hidden-medium-down'>
            <ExcelIcon />
            <span>Download in Excel</span>
          </button>
        </div>

        <PowerQualityTable
          powerQualityUnit={plottedData && plottedData.units}
          powerQualityData={formattedTableData}
        />
      </article>
    </section>
  );
}

export default PowerQualityPageSection;
