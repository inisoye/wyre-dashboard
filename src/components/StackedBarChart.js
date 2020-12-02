import React from 'react';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function StackedBarChart({ data }) {
  console.log(data);
  const dataKeysArray = data && Object.keys(data[0]);
  const [xAxis, ...bars] = dataKeysArray || [];

  const label = data && data.map((eachDay) => eachDay.date);

  const labellessData =
    data &&
    data.map((eachDay) => {
      const { date, ...data } = eachDay;
      return data;
    });

  console.log(labellessData);

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

  const barComponents = bars.map((eachBar, index) => (
    <Bar
      dataKey={eachBar}
      key={eachBar}
      stackId='a'
      fill={colorsArray[index]}
    />
  ));

  return (
    <ResponsiveContainer width='100%' height={320}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Legend />
        {barComponents}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StackedBarChart;
