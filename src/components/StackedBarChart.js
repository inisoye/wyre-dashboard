import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import CompleteDataContext from '../Context';

import { getLastArrayItems } from '../helpers/genericHelpers';

const StackedBarChart = ({ data, organization }) => {
  const { isMediumScreen } = useContext(CompleteDataContext);

  const options = {
    layout: {
      padding: {
        left: 5,
        right: 20,
        top: 20,
        bottom: 10,
      },
    },
    legend: {
      display: true,
      labels: {
        boxWidth: 13,
        fontSize: isMediumScreen ? 14 : 16,
        fontColor: 'black',
      },
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked: true,
          display: true,
          gridLines: {
            color: '#f0f0f0',
            drawBorder: false,
            drawTicks: false,
            zeroLineColor: '#f0f0f0',
          },
          ticks: {
            beginAtZero: true,
            fontFamily: 'Roboto',
            padding: 10,
            maxTicksLimit: 6,
          },
          scaleLabel: {
            display: true,
            labelString: 'Energy - Kilowatt (kW)/Hour',
            padding: 10,
            fontSize: isMediumScreen ? 14 : 18,
            fontColor: 'black',
          },
        },
      ],
      xAxes: [
        {
          maxBarThickness: 50,
          ticks: {
            fontFamily: 'Roboto',
            padding: 10,
          },
          gridLines: {
            drawTicks: false,
            color: '#f0f0f0',
            zeroLineColor: '#f0f0f0',
          },
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Days of the month',
            padding: 10,
            fontSize: isMediumScreen ? 14 : 18,
            fontColor: 'black',
          },
        },
      ],
    },
  };

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
      // Pick data for last week if screen is a medium screen or less
      data: isMediumScreen
        ? getLastArrayItems(dataValues[index])
        : dataValues[index],
      backgroundColor: colorsArray[index],
    };
  });

  const plottedData = {
    labels: isMediumScreen ? getLastArrayItems(dates, 7) : dates,
    datasets: plottedDataSet,
  };

  return (
    <>
      <Bar data={plottedData} options={options} />
    </>
  );
};

export default StackedBarChart;
