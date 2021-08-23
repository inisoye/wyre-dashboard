import { modifyStatisTicDate, 
  modifyStatisTicDateWithTime } from "./genericHelpers";

export const LoadImbalanceColumns = [
  {
    title: 'Max',
    dataIndex: 'max',
    width: '20%',
  },
  {
    title: 'Min',
    dataIndex: 'min',
    width: '15%',
  },
  {
    title: 'Imbalance',
    dataIndex: 'Imbalance',
    width: '20%',
  },
  {
    title: 'Date/Time',
    dataIndex: 'datetime',
    key: 'datetime',
  },
];

export const TimeOfUseColumns = [
  {
    title: 'Source',
    dataIndex: 'device_name',
    width: '20%'
  },
  {
    title: 'Hourse of Use',
    dataIndex: 'hours_of_use',
    width: '15%',
  },
  {
    title: 'Blackout',
    dataIndex: 'blackout',
    width: '20%',
  },
];
export const FuelConsumption = [
  {
    title: 'Source',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Disle Consumed',
    dataIndex: 'hours_of_use',
    width: '15%',
  },
  {
    title: 'Cost',
    dataIndex: 'diesel_consumed',
    width: '20%',
  },

];
export const GeneratorEfficiency = [
  {
    title: 'Source',
    dataIndex: 'name',
  },
  {
    title: 'Size Efficiencty',
    dataIndex: 'size_efficiency',
  },
  {
    title: 'Recommendation',
    dataIndex: 'recommendation',
  }
];
export const PowerDemandColumns = [
  {
    title: 'Source',
    dataIndex: 'key',
  },
  {
    title: 'KVA',
    dataIndex: 'kva',
  },
  {
    title: 'KW',
    dataIndex: 'kw',

  }
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
    title: '(Kwh)',
    dataIndex: 'demand',
  },
  {
    title: 'Cost(₦)',
    dataIndex: 'cost',
  }
];
export const DemandAndStatisticsColumn = [
  {
    title: 'Site',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: 'Daily Avg Usage(Kwh)',
    dataIndex: 'daily_avg_usage',
    width: '16%'
  },
  {
    title: 'Max Energy Usage (Kwh)',
    dataIndex: 'max_energy_usage',
    width: '26%',
    render: (data) => {
      const { date, unit, value } = data;
      const dateValues = modifyStatisTicDate(date);
      return `${value + unit} ${dateValues}`;
    }
  },
  {
    title: 'Min. Energy Usage',
    dataIndex: 'min_energy_usage',
    width: '26%',
    render: (data) => {
      const { date, unit, value } = data;
      const dateValues = modifyStatisTicDate(date);
      return `${value + unit} ${dateValues}`;
    }
  },
  {
    title: 'Peak Avg Usage(Day)',
    dataIndex: 'peak_avg_usage_day',
    width: '17%',
    render: (data) => {
      const { day, unit, value } = data;
      // find way to remove s at the end if its there

      return `${value + unit} (${day[0].toUpperCase()}${day.slice(1)})`
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
      const { day, unit, value } = data;
      // find way to remove s at the end if its there

      return `${value + unit} (${day[0].toUpperCase()}${day.slice(1)})`
    }
  },
  {
    title: 'Max. Demand date(Day)',
    dataIndex: 'max_demand_date',
    width: '26%',
    render: (data) => {
      const { day, unit, value } = data;
      const dateValues = modifyStatisTicDateWithTime(day);
      return `${value + unit} (${dateValues.deteOnly}), ${dateValues.timeOnly}`;
    }
  },
  {
    title: 'Min. Demand date(Day)',
    dataIndex: 'min_demand_date',
    width: '26%',
    render: (data) => {
      const { day, unit, value } = data;
      const dateValues = modifyStatisTicDateWithTime(day);
      return `${value + unit} (${dateValues.deteOnly}), ${dateValues.timeOnly}`;
    }
  },
  {
    title: '',
    dataIndex: 'min_demand_dater',
    width: '17%',
  },
];