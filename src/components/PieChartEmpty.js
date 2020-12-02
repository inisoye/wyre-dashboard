import React from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

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

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='black'
      style={{
        textAnchor: 'middle',
        fontSize: '80%',
      }}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieChartEmpty() {
  return (
    <ResponsiveContainer width='100%' height={320}>
      <PieChart>
        <Pie
          data={data}
          // cx={300}
          // cy={200}
          label={renderCustomizedLabel}
          labelLine={false}
          innerRadius={40}
          // outerRadius={80}
          fill='#8884d8'
        >
          {data.map((entry, index) => (
            <Cell fill={colorsArray[index % colorsArray.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartEmpty;
