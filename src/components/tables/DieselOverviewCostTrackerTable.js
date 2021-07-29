import React from 'react'
import { Table } from 'antd';

const DieselOverviewCostTrackerTable = () => {
    const columns = [
        {
          title: 'Month',
          dataIndex: 'month',
          key: 'month',
          width:30
        },
        {
          title: 'Inputed Usage(Ltr)',
          dataIndex: 'inputted_usage',
          key: 'inputted_usage',
          sorter: {
            compare: (a, b) => a.inputted_usage - b.inputted_usage,
            multiple: 3,
          },
        },
        {
          title: 'Estimated Usage (Ltr)',
          dataIndex: 'estimated_usage',
          key:"estimated_usage",
          sorter: {
            compare: (a, b) => a.estimated_usage - b.estimated_usage,
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
            title: 'Estimated Cost (₦)',
            dataIndex: 'estimated_cost',
            key: 'estimated_cost',
            sorter: {
              compare: (a, b) => a.estimated_cost - b.estimated_cost,
            },
          },
          {
            title: 'Diesel Difference (Ltr)',
            dataIndex: 'diesel_difference',
            key: 'diesel_difference',
            sorter: {
              compare: (a, b) => a.diesel_difference - b.diesel_difference,
              
            },
          },
          {
            title: 'Price Difference (₦)',
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
          estimated_cost:'400',
          estimated_usage:30,
          price_difference: 160,
          diesel_difference:'30',
          inputted_cost:200,
          percentage_difference: 40,
        },
        {
          key: '2',
          month: 'Feb 21',
          inputted_usage: 98,
          estimated_cost:'400',
          estimated_usage:30,
          diesel_difference:'30',
          price_difference: 160,
          inputted_cost:200,
          percentage_difference: 40,
        },
        {
          key: '3',
          month: 'Mar 21',
          diesel_difference:'30',
          inputted_usage: 98,
          estimated_cost:'800',
          estimated_usage:30,
          price_difference: 202,
          inputted_cost:200,
          percentage_difference: 40,
        },
        {
          key: '4',
          month: 'Aug 21',
          inputted_usage: 98,
          estimated_cost:'400',
          diesel_difference:'30',
          estimated_usage:30,
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

export default DieselOverviewCostTrackerTable
