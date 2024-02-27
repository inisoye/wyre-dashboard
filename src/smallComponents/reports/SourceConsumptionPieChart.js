import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import ColorHash from 'color-hash'
import CompleteDataContext from '../../Context';

var colorHash = new ColorHash();

const SourceConsumptionPieChart = ({ data }) => {

  const { isMediumScreen } = useContext(CompleteDataContext);
  const labels = [];
  const values = [];

  console.log('this is the data=============kkkdkdk', data)

  data.map((eachData) => {
    labels.push(eachData.name);
    values.push(eachData.energy);
  });

  const total = values.reduce((accumulator, currentValue) =>
    parseFloat(accumulator) + parseFloat(currentValue));
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
      // labels: {
      //   boxWidth: 10,
      //   fontSize: isMediumScreen ? 6 : 10,
      //   fontColor: 'black',
      //   padding: 10,
      // },
      labels: {
        boxWidth: 10,
        fontSize: isMediumScreen ? 6 : 10,
        fontColor: 'black',
        padding: 10,
        generateLabels: (chart) => {
          const datasets = chart.data.datasets;
          return datasets[0].data.map((data, i) => ({
            text: `${chart.data.labels[i]} (${data ? (((data / total) * 100)).toFixed(3) : ''})%`,
            fillStyle: datasets[0].backgroundColor[i],
          }))
        }
      }
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
