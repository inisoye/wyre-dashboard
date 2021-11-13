import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import CompleteDataContext from '../../Context';
import { combineSameMonthData } from '../../helpers/genericHelpers';

const ReportBarAndLineChart = ({ energyConsumption = [] }) => {
    const { isMediumScreen } = useContext(CompleteDataContext);
    const [forcastedData, setForcastedData] = useState(false);
    const [usedData, setUsedData] = useState(false);

    const sort = (data) => data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const convertToOjectAndSort = (obj, name) => {
        const data = Object.entries(obj).map(([key, value]) => ({ date: key, [name]: value.toFixed(2) }));

        const sortedData = sort(data);
        const mapped = sortedData.map(item => ({ [item.date]: Number(item[name]).toFixed(2) }));
        return Object.assign({}, ...mapped);
    }
    useEffect(() => {
        let allEnergyConsumption = []
        Object.values(energyConsumption).map((data) => {
            allEnergyConsumption.push(...data);
        });
        const { forcastedData: forcast, usedData: used } = combineSameMonthData(allEnergyConsumption);
        setForcastedData(forcast);
        setUsedData(used);

    }, [energyConsumption]);


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
                        labelString: `Consumption (Kw)`,
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
        labels: Object.keys(convertToOjectAndSort(usedData, 'used')),
        datasets: [
            {
                type: 'line',
                label: `Forcasted`,
                data: Object.values(convertToOjectAndSort(forcastedData, 'forcasted')),
                backgroundColor: '#FFC205',
                borderColor: '#FFC205',
                borderWidth: 3,
                fill: false,
                tension: 0
            },
            {
                type: 'bar',
                label: `Consumption (Kw)`,
                maxBarThickness: 60,
                data: Object.values(convertToOjectAndSort(usedData, 'used')),
                backgroundColor: '#6c00fa',
                borderColor: '#6c00fa',
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

export default ReportBarAndLineChart;
