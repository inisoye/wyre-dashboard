import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};

const StackedBarChart = ({ data, organization }) => {
  // ensure total(organization data) is removed from initial render
  if (data) {
    delete data[organization];
  }

  // Destructure data conditionally
  const { dates, ...values } = data ? data : { dates: [] };
  const dataNames = Object.keys(values);
  const dataValues = Object.values(values);
  const colorsArray = [
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
  ];
  const plottedDataSet = dataNames.map((eachName, index) => {
    return {
      label: dataNames[index],
      data: dataValues[index],
      backgroundColor: colorsArray[index],
    };
  });

  const plottedData = {
    labels: dates,
    datasets: plottedDataSet,
  };

  return (
    <>
      <Bar data={plottedData} options={options} />
    </>
  );
};

export default StackedBarChart;
