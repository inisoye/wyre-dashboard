import React, { useContext } from 'react';
import CompleteDataContext from '../../Context';

import {
  toSnakeCase,
  formatParametersDatetimesToGbFormat,
  formatParametersDatesToGbFormat,
  formatParametersTimes,
} from '../../helpers/genericHelpers';

import PowerQualityLineChart from '../lineCharts/PowerQualityLineChart';

function PowerQualityPageSection({ pqData }) {
  // Obtain selected unit from context API
  const { powerQualityUnit } = useContext(CompleteDataContext);
  // Remove stuff in parenthesis then covert string to snake case
  const formattedPowerQualityName = toSnakeCase(
    powerQualityUnit.replace(/\s*\(.*?\)\s*/g, '')
  );

  // Pick out data based on selection in UI
  const plottedData = pqData && pqData[formattedPowerQualityName];
  const plottedDates = pqData && formatParametersDatetimesToGbFormat(pqData);

  // Clone plotted data for usage in table
  const tableData = Object.assign({}, plottedData);
  if (tableData) {
    delete tableData.units;
    delete tableData.deviceName;
  }

  const tableDates = pqData && formatParametersDatesToGbFormat(pqData);
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

  console.log(formattedTableData);

  return (
    <section>
      <h2>{pqData && pqData.deviceName}</h2>
      <article>
        <PowerQualityLineChart
          data={plottedData}
          dates={plottedDates}
          powerQualityUnit={powerQualityUnit}
        />
      </article>
    </section>
  );
}

export default PowerQualityPageSection;
