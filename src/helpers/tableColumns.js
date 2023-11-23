import moment from 'moment';
import {
  convertDecimalTimeToNormal,
  modifyStatisTicDate,
  modifyStatisTicDateWithTime
} from "./genericHelpers";
import { numberFormatter } from './numberFormatter';
import { Switch } from 'antd';

export const LoadImbalanceColumns = [
  {
    title: 'Max',
    dataIndex: 'max',
    width: '25%',
    render: (data) => {
      return `${Number(data).toFixed(2)}`;
    }
  },
  {
    title: 'Min',
    dataIndex: 'min',
    width: '25%',
    render: (data) => {
      return `${Number(data).toFixed(2)}`;
    }
  },
  {
    title: 'Imbalance',
    dataIndex: 'imbalance',
    width: '25%',
  },
  {
    title: 'Date/Time',
    dataIndex: 'time',
    key: 'datetime',
    render: (date) => {
      return moment(date).format('DD-MM-YYYY hh:mm:a');
    }
  },
];

export const TimeOfUseColumns = [
  {
    title: 'Source',
    dataIndex: 'name',
    width: '20%'
  },
  {
    title: 'Hours of Use',
    dataIndex: 'hour',
    width: '15%',
    render: (hours) => convertDecimalTimeToNormal(hours.toFixed(2))
  },
  // {
  //   title: 'Down Time',
  //   dataIndex: 'blackOut',
  //   width: '20%',
  // },
];
export const FuelConsumption = [
  {
    title: 'Source',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Energy Consumed',
    dataIndex: 'energy',
    width: '15%',
    render: (energy) => energy.toFixed(2)
  },
  {
    title: 'Hours used',
    dataIndex: 'hours',
    width: '15%',
    render: (hours) => convertDecimalTimeToNormal(hours.toFixed(2))
  },
  {
    title: 'Cost(₦)',
    dataIndex: 'cost',
    width: '20%',
    render: (cost) => cost.toFixed(2)
  },

];
export const GeneratorEfficiency = [
  {
    title: 'Source',
    dataIndex: 'name',
  },
  {
    title: 'Size Efficiency',
    dataIndex: 'size_efficiency',
    render: (size_efficiency) => {
      return <>{size_efficiency}%</>
    }
  },
  {
    title: 'Recommendation',
    dataIndex: 'recommendation',
  }
];
export const PowerDemandColumns = (powerFactor) => [
  {
    title: 'Source',
    dataIndex: 'device_name',
  },
  {
    title: 'Average(kVA)',
    dataIndex: 'avg',
  },
  {
    title: 'Average(kW)',
    dataIndex: 'avg',
    render: (avg) => {
      return avg ? (avg * powerFactor).toFixed(2) : 0;
    }
  },
  {
    title: 'Maximum(kVA)',
    dataIndex: 'max',
  },
  {
    title: 'Maximum(kW)',
    dataIndex: 'max',
    render: (max) => {
      return max ? (max * powerFactor).toFixed(2) : 0;
    }
  },
  // {
  //   title: 'Average(kVA)',
  //   dataIndex: 'max',
  // },
  // {
  //   title: 'Average(kW)',
  //   dataIndex: 'max',
  //   render: (max) => {
  //     return max? (max * powerFactor).toFixed(2): 0;
  //   }
  // }
];
export const CostImplicationColumn = [
  {
    title: 'Branch',
    dataIndex: 'branch',
  },
  {
    title: 'Device',
    dataIndex: 'device',
  },
  {
    title: '(kWh)',
    dataIndex: 'demand',
    render: (value) => {
      return numberFormatter(value);
    }
  },
  {
    title: 'Cost(₦)',
    dataIndex: 'cost',
    render: (value) => {
      return numberFormatter(value);
    }
  }
];

export const BreakersColumns = (onSwitchChange) => [
  {
    title: 'Branch',
    dataIndex: 'branch',
  },
  {
    title: 'Device',
    dataIndex: 'device_id',
  },
  {
    title: 'Active',
    dataIndex: 'is_active',
    render: (is_active) => {
      return is_active.toString()
    }
  },
  {
    title: 'Load',
    dataIndex: 'is_load',
    render: (is_load) => {
      return is_load.toString()
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Provider',
    dataIndex: 'provider',
  },
  {
    title: 'State',
    dataIndex: 'switch_state',
    render: (switch_state, record) => {
      return <Switch onChange={(event) => {
        onSwitchChange(event, record);
      }}
        size="small" defaultChecked={switch_state === 'ON'} />
    }
  },
];
export const DemandAndStatisticsColumn = [
  {
    title: 'Site',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: 'Daily Avg Usage(kWh)',
    dataIndex: 'daily_avg_usage',
    width: '16%'
  },
  {
    title: 'Max Energy Usage (kWh)',
    dataIndex: 'max_energy_usage',
    width: '26%',
    render: (data) => {
      const { date, unit, value } = data;
      const dateValues = date && date.length > 2 ? modifyStatisTicDate(date) : '';
      return `${value + unit} ${dateValues}`;
    }
  },
  {
    title: 'Min. Energy Usage',
    dataIndex: 'min_energy_usage',
    width: '26%',
    render: (data) => {
      const { date, unit, value } = data;
      const dateValues = date && date.length > 2 ? modifyStatisTicDate(date) : '';
      return `${value + unit} ${dateValues}`;
    }
  },
  {
    title: 'Peak Avg Usage(Day)',
    dataIndex: 'peak_avg_usage_day',
    width: '17%',
    render: (data) => {
      const { date, unit, value } = data;
      // get the date with slash
      const dateValues = date && date.length > 2 ? modifyStatisTicDate(date) : '';
      return `${value + unit} ${dateValues}`;
    }
  },
];

export const DemandAndStatisticsTwoColumn = [
  {
    title: 'Site',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: 'Min. Avg Usage(Day)',
    dataIndex: 'min_avg_usage_day',
    width: '16%',
    render: (data) => {
      const { date, unit, value } = data;
      const dateValues = date && modifyStatisTicDateWithTime(date);
      return `${value + unit}  ${date ? '(' + dateValues.deteOnly + '), ' + dateValues.timeOnly : ''}`;
    }
  },
  {
    title: 'Max. Demand date(Day)',
    dataIndex: 'max_demand_date',
    width: '26%',
    render: (data) => {
      const { day, unit, value } = data;
      const dateValues = day && modifyStatisTicDateWithTime(day);
      return `${value + unit}  ${day ? '(' + dateValues.deteOnly + '), ' + dateValues.timeOnly : ''}`;
    }
  },
  {
    title: 'Min. Demand date(Day)',
    dataIndex: 'min_demand_date',
    width: '26%',
    render: (data) => {
      const { day, unit, value } = data;
      const dateValues = day && modifyStatisTicDateWithTime(day);
      return `${value + unit}  ${day ? '(' + dateValues.deteOnly + '), ' + dateValues.timeOnly : ''}`;
    }
  },
  {
    title: '',
    dataIndex: 'min_demand_dater',
    width: '17%',
  },
];