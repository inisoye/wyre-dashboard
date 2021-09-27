import React from 'react'
import { Table } from 'antd';

const DieselOverviewCostTrackerTable = ({ dieselOverviewData }) => {
    const columns = [
        {
          title: 'Month',
          dataIndex: 'month',
          key: 'month',
          width:'30%'
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
          title: 'Forcasted Usage (Ltr)',
          dataIndex: 'forecasted_usage',
          key:"forecasted_usage",
          sorter: {
            compare: (a, b) => a.forecasted_usage - b.forecasted_usage,
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
            title: 'Forcasted Cost (₦)',
            dataIndex: 'forecasted_cost',
            key: 'forecasted_cost',
            sorter: {
              compare: (a, b) => a.forcasted_cost - b.forcasted_cost,
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
            dataIndex: 'cost_difference',
            key: 'cost_difference',
            sorter: {
              compare: (a, b) => a.price_difference - b.price_difference,
              
            },
          },
          {
            title: 'Percentage Difference (%)',
            dataIndex: 'percentage_usage',
            key: 'percentage_usage',
            sorter: {
              compare: (a, b) => a.percentage_difference - b.percentage_difference,
              
            },
          },
      ];

      
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }

    return (
        <div>
            <Table columns={columns}
                dataSource={dieselOverviewData && dieselOverviewData}
                onChange={onChange}
                className='table-striped-rows' 
                rowKey={(record) => record.id}
                footer={() => `${dieselOverviewData && dieselOverviewData.length} entries in total`}/>
        </div>
    )
}

export default DieselOverviewCostTrackerTable
