import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import CompleteDataContext from '../../Context';

const ReportsPowerDemandPieChart = ({ data: rawData }) => {
  const { isMediumScreen } = useContext(CompleteDataContext);

  const chartData = rawData && rawData.data;
  const chartDataLabels = rawData && rawData.data_labels;

  const totalDownTime = chartData.reduce((acc, curr) => acc + curr, 0);

  const plottedData = {
    labels: chartDataLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: ['#6c00fa', '#FF3DA1', '#00C7E6'],
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 20,
        bottom: 10,
      },
    },
    maintainAspectRatio: false,
    title: {
      display: false,
    },
    legend: {
      display: true,
      labels: {
        boxWidth: 13,
        fontSize: isMediumScreen ? 14 : 16,
        fontColor: 'black',
        padding: 5,
      },
      position: 'top',
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      callbacks: {
        title: function (tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function (tooltipItem, data) {
          return data['datasets'][0]['data'][tooltipItem['index']] + 'hrs';
        },
      },
    },
    plugins: {
      datalabels: {
        formatter: (value) => {
          return `${value}hrs`;
        },
        color: 'black',
        font: {
          size: isMediumScreen ? 13 : 16,
          weight: '500',
        },
      },
    },
  };

  return (
    <>
      <div className="report-row-7__pie">
        <Pie
          redraw
          data={plottedData}
          options={options}
          plugins={[ChartDataLabels]}
        />
      </div>
      <p className="report-row-7-pie__text">
        <span className="h-block">Total Down Time</span>{' '}
        <span className="h-bolder">{totalDownTime}hrs</span>
      </p>{' '}
    </>
  );
};

export default ReportsPowerDemandPieChart;
