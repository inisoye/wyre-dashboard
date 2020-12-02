import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DoughnutChart = (data) => {
  const { devices, hours } = data.data
    ? data.data
    : { devices: ['Empty'], hours: ['Empty'] };

  const plottedData = {
    labels: devices,
    datasets: [
      {
        label: 'Power Usage (Hours/Month)',
        data: hours,
        backgroundColor: [
          '#6C00FA',
          '#00C7E6',
          '#FF3DA1',
          '#82ca9d',
          '#ff9b3d',
          '#360259',
          '#0371b5',
          '#D90000',
          '#757575',
          '#FFE11A',
        ],
        borderColor: [
          '#6C00FA',
          '#00C7E6',
          '#FF3DA1',
          '#82ca9d',
          '#ff9b3d',
          '#360259',
          '#0371b5',
          '#D90000',
          '#757575',
          '#FFE11A',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    tooltips: {
      enabled: true,
      mode: 'index',
      callbacks: {
        title: function (tooltipItem, data) {
          console.log(data);
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function (tooltipItem, data) {
          return data['datasets'][0]['data'][tooltipItem['index']] + 'hrs';
        },
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          let sum = 0;
          let dataArr = context.chart.data.datasets[0].data;
          dataArr.forEach((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed() + '%';
          return percentage;
        },
        color: 'black',
      },
    },
  };

  return (
    <>
      <Doughnut
        data={plottedData}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </>
  );
};

export default DoughnutChart;
