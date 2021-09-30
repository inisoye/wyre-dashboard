import React from 'react'
import { Table, Typography  } from 'antd';

const UtilityOverviewCostTrackerTable = ({dataSource}) => {
  const { Text } = Typography;

  dataSource && dataSource.forEach(obj => {
    for (const propertyName in obj) {
      if(typeof obj[propertyName] === 'number'){
        obj[propertyName] = obj[propertyName].toFixed(2);
    }
    }
    return obj
  });

    const columns = [
        {
          title: 'Month',
          dataIndex: 'month',
          key: 'month',
          width:'10%'
        },
        {
          title: 'Purchased Energy (KWh)',
          dataIndex: 'purchased_kwh',
          key: 'purchased_kwh',
          sorter: {
            compare: (a, b) => a.purchased_kwh - b.purchased_kwh,
            multiple: 3,
          },
        },
        {
          title: 'Consumed Energy (KWh)',
          dataIndex: 'energy_consumed_kwh',
          key:"energy_consumed_kwh",
          sorter: {
            compare: (a, b) => a.energy_consumed_kwh - b.energy_consumed_kwh,
          },
        },
        {
          title: 'Purchased Energy(₦)',
          dataIndex: 'purchased_naira',
          key: 'purchased_naira',
          sorter: {
            compare: (a, b) => a.purchased_naira - b.purchased_naira,
          },
        },
        {
            title: 'Consumed Energy(₦)',
            dataIndex: 'energy_consumed_naira',
            key: 'energy_consumed_naira',
            sorter: {
              compare: (a, b) => a.measured_cost - b.measured_cost,
            },
          },
          {
            title: 'Difference(Kwh)',
            dataIndex: 'difference_kwh',
            key: 'usage_didifference_kwhfference',
            sorter: {
              compare: (a, b) => a.difference_kwh - b.difference_kwh,
              
            },
          },
          {
            title: 'Difference (₦)',
            dataIndex: 'difference_naira',
            key: 'difference_naira',
            sorter: {
              compare: (a, b) => a.difference_naira - b.difference_naira,
              
            },
          },
          {
            title: 'Percentage Difference(%)',
            dataIndex: 'percentage',
            key: 'percentage',
            sorter: {
              compare: (a, b) => a.percentage - b.percentage,
              
            },
          },
      ];
      
      
  let Purchased_total = 0;
  let Consumed_total = 0;

  dataSource.forEach(element => {
    const purchased_numToInt = parseFloat(element.purchased_kwh)
    const consumed_to_int  = parseFloat(element.energy_consumed_kwh)
    Purchased_total += purchased_numToInt;
    Consumed_total += consumed_to_int;
    });

    return (
        <div>
          <Table
                columns={columns} 
                dataSource={dataSource && dataSource} 
                className='table-striped-rows utitily-overview-table' 
                rowKey={(record) => record.id}
                footer={() => `${dataSource && dataSource.length} entries in total`}
                scroll={{ x: 500 }}
                summary={pageData => {
                  // let Purchased = 0;
                  // let Consumed = 0;

                  // // pageData.forEach(({ purchased_kwh, energy_consumed_kwh }) => {
                  // //   const purchased_numToInt = parseFloat(purchased_kwh)
                  // //   const consumed_to_int  = parseFloat(energy_consumed_kwh)
                  // //   Purchased += purchased_numToInt;
                  // //   Consumed += consumed_to_int;
                  // // });

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell>
                          <Text>Total:</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell>
                          <Text>Purchased</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell>
                          <Text>Consumed</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell></Table.Summary.Cell>
                        <Table.Summary.Cell>
                          <Text>{parseFloat(Purchased_total).toFixed(2)}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell>
                          <Text>{parseFloat(Consumed_total).toFixed(2)}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />

        </div>
    )
}

export default UtilityOverviewCostTrackerTable
