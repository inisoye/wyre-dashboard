import React, { useContext } from 'react';
import CompleteDataContext from '../../Context';

import {
  toSnakeCase,
  formatParametersDatetimes,
  formatParametersDates,
  formatParametersTimes,
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
  const plottedDates = pqData && formatParametersDatetimes(pqData);

  // Clone plotted data for usage in table
  const tableData = Object.assign({}, plottedData);
  if (tableData) {
    delete tableData.units;
    delete tableData.deviceName;
  }

  const tableDates = pqData && formatParametersDates(pqData);
  const tableTimes = pqData && formatParametersTimes(pqData);

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

  const tableValuesWithHeadings =
    tableValues[0] &&
    tableValues.map((eachArray, index1) =>
      eachArray.map((eachItem) => {
        return {
          [tableHeadings[index1]]: eachItem,
        };
      })
    );

  const formattedTableData =
    tableValuesWithHeadings &&
    tableValuesWithHeadings.reduce((acc, currArray) => {
      currArray.forEach((eachItem, index) => {
        acc[index] = { ...acc[index], ...eachItem };
      });

      return acc;
    }, []);

  const formattedTableDataWithIndex =
    formattedTableData &&
    formattedTableData.map(function (currentValue, index) {
      currentValue.index = index + 1;
      return currentValue;
    });

  return (
    <section className='power-quality-section'>
      <h2 className='power-quality-section__heading'>
        {pqData && pqData.deviceName}
      </h2>

      <article className='power-quality-line-container'>
        <PowerQualityLineChart
          data={plottedData}
          dates={plottedDates}
          powerQualityUnit={powerQualityUnit}
        />
      </article>

      <article className='parameters-table-container'>
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

        <PowerQualityTable
          powerQualityUnit={plottedData && plottedData.units}
          powerQualityData={formattedTableDataWithIndex}
        />
      </article>
    </section>
  );
}

export default PowerQualityPageSection;
