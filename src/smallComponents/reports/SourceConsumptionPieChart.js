import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import ColorHash from 'color-hash'
import CompleteDataContext from '../../Context';

var colorHash = new ColorHash();

const SourceConsumptionPieChart = ({ data }) => {
  const { isMediumScreen } = useContext(CompleteDataContext);
  const labels = [];
  const values = [];
  Object.entries(data).map(([key, value]) => {
    if (key.toLocaleLowerCase() !== 'unit') {
      labels.push(key);
      values.push(value);
    }
  });

  const plottedData = {
    labels,
    datasets: [
      {
        label: 'Power Usage (Hours/Month)',
        data: values,
        backgroundColor: labels.map(name => colorHash.hex(name)),
        borderColor: [
          'white',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 40,
      },
    },
    legend: {
      display: true,
      labels: {
        boxWidth: 10,
        fontSize: isMediumScreen ? 6 : 10,
        fontColor: 'black',
        padding: 10,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      // legend: false,
      outlabels: {
        backgroundColor: "transparent", // Background color of Label
        color: 'black', // Font color
        font: {
          resizable: true,
          minSize: 12,
          maxSize: 18
        }
      }
    },

  };

  return (
    <>
      <Pie
        data={plottedData}
        options={options}
      />
    </>
  );
};

export default SourceConsumptionPieChart;
