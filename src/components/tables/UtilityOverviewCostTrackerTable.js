import React from 'react'
import { Table } from 'antd';

const UtilityOverviewCostTrackerTable = () => {
    const columns = [
        {
          title: 'Month',
          dataIndex: 'month',
          key: 'month',
          width:30
        },
        {
          title: 'Inputed Usage(KWh)',
          dataIndex: 'inputted_usage',
          key: 'inputted_usage',
          sorter: {
            compare: (a, b) => a.inputted_usage - b.inputted_usage,
            multiple: 3,
          },
        },
        {
          title: 'Measured Usage (KWh)',
          dataIndex: 'measured_usage',
          key:"measured_usage",
          sorter: {
            compare: (a, b) => a.measured_usage - b.measured_usage,
          },
        },
        {
          title: 'Inputted Cost (₦)',
          dataIndex: 'inputted_cost',
          key: 'inputted_cost',
          sorter: {
            compare: (a, b) => a.inputted_cost - b.inputted_cost,
          },
        },
        {
            title: 'Measured Cost(₦)',
            dataIndex: 'measured_cost',
            key: 'measured_cost',
            sorter: {
              compare: (a, b) => a.measured_cost - b.measured_cost,
            },
          },
          {
            title: 'Usage Difference (Unit)',
            dataIndex: 'usage_difference',
            key: 'usage_difference',
            sorter: {
              compare: (a, b) => a.usage_difference - b.usage_difference,
              
            },
          },
          {
            title: 'Cost Difference (₦)',
            dataIndex: 'price_difference',
            key: 'price_difference',
            sorter: {
              compare: (a, b) => a.price_difference - b.price_difference,
              
            },
          },
          {
            title: 'Percentage Difference (%)',
            dataIndex: 'percentage_difference',
            key: 'percentage_difference',
            sorter: {
              compare: (a, b) => a.percentage_difference - b.percentage_difference,
              
            },
          },
      ];


      const data = [
        {
          key: '1',
          month: 'Jan 21',
          inputted_usage: 98,
          measured_cost:'400',
          measured_usage:30,
          price_difference: 160,
          usage_difference:'30',
          inputted_cost:200,
          percentage_difference: 40,
        },
        {
          key: '2',
          month: 'Feb 21',
          inputted_usage: 98,
          measured_cost:'400',
          measured_usage:30,
          usage_difference:'30',
          price_difference: 160,
          inputted_cost:200,
          percentage_difference: 40,
        },
        {
          key: '3',
          month: 'Mar 21',
          usage_difference:'30',
          inputted_usage: 98,
          measured_cost:'800',
          measured_usage:30,
          price_difference: 202,
          inputted_cost:200,
          percentage_difference: 40,
        },
        {
          key: '4',
          month: 'Aug 21',
          inputted_usage: 98,
          measured_cost:'400',
          usage_difference:'30',
          measured_usage:30,
          price_difference: 160,
          inputted_cost:110,
          percentage_difference: 20,
        },
      ];
      
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
      

    return (
        <div>
            <Table columns={columns} 
                dataSource={data} 
                onChange={onChange} 
                className='table-striped-rows' 
                rowKey={(record) => record.id}
                footer={() => `${data.length} entries in total`}/>
        </div>
    )
}

export default UtilityOverviewCostTrackerTable
