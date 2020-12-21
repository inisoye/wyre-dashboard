import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import CompleteDataContext from '../../Context';

const PowerQualityLineChart = ({ data, dates, powerQualityUnit }) => {
  const { isMediumScreen, isLessThan1296 } = useContext(CompleteDataContext);
  const pqDataUnit = data && data.units;

  const pqData = data && Object.assign({}, data);
  if (pqData) delete pqData.units;

  const pqDataValues = pqData && Object.values(pqData);
  const pqDataNames = pqData && Object.keys(pqData);
  const colorsArray = [
    '#6C00FA',
    '#FF3DA1',
    '#00C7E6',
    '#FFC107',
    '#82ca9d',
    '#ff9b3d',
    '#360259',
    '#0371b5',
    '#D90000',
    '#757575',
    '#FFE11A',
  ];

  const plottedDataSets =
    pqDataValues &&
    pqDataValues.map((eachDataValue, index) => {
      return {
        label: `${pqDataNames[index]} (${pqDataUnit})`,
        data: eachDataValue,
        fill: false,
        backgroundColor: colorsArray[index],
        borderColor: colorsArray[index],
      };
    });

  const plottedData = {
    labels: dates,
    datasets: plottedDataSets,
  };

  const options = {
    layout: {
      padding: {
        left: isMediumScreen ? 5 : 25,
        right: isMediumScreen ? 20 : 50,
        top: isMediumScreen ? 20 : 25,
        bottom: isMediumScreen ? 10 : 25,
      },
    },
    legend: {
      display: true,
      labels: {
        boxWidth: isMediumScreen ? 13 : 16,
        fontSize: isMediumScreen ? 14 : 16,
        fontColor: 'black',
        padding: isMediumScreen ? 10 : 25,
      },
    },
    // maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
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
            maxTicksLimit: 9,
          },
          scaleLabel: {
            display: true,
            labelString: powerQualityUnit,
            padding: isMediumScreen ? 10 : 25,
            fontSize: isMediumScreen ? 14 : 18,
            fontColor: 'black',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontFamily: 'Roboto',
            padding: 10,
            maxTicksLimit: isMediumScreen ? 7 : 10,
          },
          gridLines: {
            drawTicks: false,
            color: '#f0f0f0',
            zeroLineColor: '#f0f0f0',
          },
          scaleLabel: {
            display: true,
            labelString: 'Date and Time',
            padding: isMediumScreen ? 10 : 25,
            fontSize: isMediumScreen ? 14 : 18,
            fontColor: 'black',
          },
        },
      ],
    },
  };

  return (
    <>
      <Line data={plottedData} options={options} />
    </>
  );
};

export default PowerQualityLineChart;
