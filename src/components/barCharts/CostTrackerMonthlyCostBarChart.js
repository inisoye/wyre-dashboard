import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import CompleteDataContext from '../../Context';

import dayjs from 'dayjs';


const CostTrackerMonthlyCostBarChart = ({DieselData,utilityData}) => {
  const { isMediumScreen } = useContext(CompleteDataContext);

  let formattedDataForDiesel = {}
  let formattedUtilData = {}

  const getDieselData = DieselData.map((e)=>{
    delete e.quantity
    const turnDateStringToWord = dayjs(e.date).format('MMM-YYYY')
    e.date = turnDateStringToWord
    const dates = e.date
    const amount = e.price_per_litre

    if(Object.keys(formattedDataForDiesel).includes(e.date)){
      [formattedDataForDiesel].map((d)=>{
        d[e.date] +=amount
      })
    }
    else{
      formattedDataForDiesel = {...formattedDataForDiesel, [dates]:amount}
    }
  })

  const getUtilityData= utilityData.map(e=>{
    delete e.value
    delete e.tarrif
    delete e.vat_inclusive_amount
    const turnDateStringToWord = dayjs(e.date).format('MMM-YYYY')
    e.date = turnDateStringToWord
    const dates = e.date
    const amount = e.amount

    if(Object.keys(formattedUtilData).includes(e.date)){
      [formattedDataForDiesel].map((d)=>{
        d[e.date] +=amount
      })
    }
    else{
      formattedUtilData = {...formattedUtilData, [dates]:amount}
    }
  })

  let chartsData = {}

  for (const key in formattedUtilData) {
      if(Object.keys(formattedDataForDiesel).includes(key)){
        if(isNaN(formattedDataForDiesel[key])){
          formattedDataForDiesel[key] = 0
        }
        formattedDataForDiesel[key] += formattedUtilData[key]
        chartsData = formattedDataForDiesel
      }
      else{
        formattedDataForDiesel = {...formattedDataForDiesel, [key]: formattedUtilData[key] }
        chartsData = formattedDataForDiesel
      }
  }

  
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
      display: false,
    },
    maintainAspectRatio: false,
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
            fontColor: '#A3A3A3',
            maxTicksLimit: 6,
            fontSize: 10,
            padding: 10,
          },
          scaleLabel: {
            display: true,
            padding: 10,
            labelString: `Amount in Naira`,
            fontColor: 'black',
            fontSize: isMediumScreen ? 14 : 18,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawTicks: false,
            color: '#f0f0f0',
            zeroLineColor: '#f0f0f0',
          },
          ticks: {
            beginAtZero: true,
            fontFamily: 'Roboto',
            fontColor: '#A3A3A3',
            maxTicksLimit: 10,
            padding: 10,
            fontSize: 10,
          },
          scaleLabel: {
            display: true,
            labelString: 'Months of the Year',
            fontColor: 'black',
            fontSize: isMediumScreen ? 14 : 18,
            padding: isMediumScreen ? 10 : 25,
          },
        },
      ],
    },
  };

  const data = {
    labels: Object.keys(chartsData),
    datasets: [
      {
        label: `Amount in Naira`,
        maxBarThickness: 60,
        data: Object.values(chartsData),
        backgroundColor: '#00C7E6',
        borderColor: '#00C7E6',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Bar redraw data={data} options={options} />
    </>
  );
};

export default CostTrackerMonthlyCostBarChart;
