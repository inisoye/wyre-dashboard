import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-piechart-outlabels';
import CompleteDataContext from '../../Context';
import { CHART_BACKGROUD_COLOR, CHART_BORDER_COLOR } from '../../helpers/constants';

const LoadConsumptionPieChart = ({ loadCunsumptionData }) => {
  const { isMediumScreen } = useContext(CompleteDataContext);


  const { label, data } = loadCunsumptionData
    ? loadCunsumptionData
    : { chartLabels: ['Empty'], data: ['Empty'] };

  const plottedData = {
    labels: label,
    datasets: [
      {
        label: 'Power Usage (Hours/Month)',
        data: data,
        backgroundColor: CHART_BACKGROUD_COLOR,
        borderColor: CHART_BORDER_COLOR,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        left: 70,
        right: 70,
        top: 0,
        bottom: 100,
      },
    },
    
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    plugins: {
      outlabels: {
        backgroundColor: "transparent", // Background color of Label
        color: 'black', // Font color
        stretch: 10,
        text: function(content) {
            const newLineLable = content.labels[content.dataIndex].split(" ").join("\n");
            const v = parseFloat(content['percent']) * 100;
            return `${newLineLable} \n ${v.toFixed(2).replace('.', ',')}%`;
        },
        font: {
          resizable: true,
          minSize: isMediumScreen ?  6: 12,
          maxSize: isMediumScreen? 10: 18,
        }
      }
    },
    title: {
      display: false,
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      callbacks: {
        title: function (tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function (tooltipItem, data) {
          return data['datasets'][0]['data'][tooltipItem['index']] + 'Kwh';
        },
      },
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

export default LoadConsumptionPieChart;
