import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-piechart-outlabels';

const SourceConsumptionPieChart = ({ data }) => {
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
        backgroundColor: ['#FF3DA1', '#FFC205', '#00C7E6', '#5616F5', '#0A267A'],
        borderColor: [
          'white',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      display: false
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 40,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: false,
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
        plugins={[ChartDataLabels]}
      />
    </>
  );
};

export default SourceConsumptionPieChart;
