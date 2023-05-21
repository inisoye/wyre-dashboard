import React, {useContext} from 'react'
import { Bar } from 'react-chartjs-2';
import CompleteDataContext from '../../Context';


const ComparisonBarChart = ({comparisonData}) => {
    const { isMediumScreen, isLessThan1296 } = useContext(CompleteDataContext);
    const {diesel_estimate,diesel_purchase} = comparisonData

    
  const colorsArray = [
    '#FF3DA1',
    '#00C7E6',
    '#6C00FA',
    '#82ca9d',
    '#ff9b3d',
    '#360259',
    '#0371b5',
    '#D90000',
    '#757575',
    '#FFE11A',
  ];

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
        fontSize: isLessThan1296 ? 14 : 16,
        fontColor: 'black',
        padding: isLessThan1296 ? 10 : 25,
      },
    },
    // maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
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
            fontSize: 10,
            fontColor: '#A3A3A3',
          },
          scaleLabel: {
            display: true,
            labelString: `Estimated Diesel Cost & Usage (${diesel_estimate.units})`,
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
            fontSize: 10,
            fontColor: '#A3A3A3',
            padding: 10,
            maxTicksLimit: 10,
          },
          gridLines: {
            drawTicks: false,
            color: '#f0f0f0',
            zeroLineColor: '#f0f0f0',
          },
          scaleLabel: {
            display: true,
            labelString: 'Months of the Year',
            padding: isMediumScreen ? 10 : 25,
            fontSize: isMediumScreen ? 14 : 18,
            fontColor: 'black',
          },
        },
      ],
    },
  };

    return (
        <div>
            <Bar
                data={{
                    labels :diesel_estimate.dates,
                    datasets:[{
                        label:'Monthly Diesel Estimated Consumption',
                        data: diesel_estimate.values,
                        backgroundColor:'#FF3DA1',
                    },
                    {
                        label:'Monthly Diesel Estimated Usage',
                        data: diesel_purchase.values,
                        backgroundColor:'#00C7E6',
                    }
                ]
                }}
                options={options}
            />
            
        </div>
    )
}

export default ComparisonBarChart
