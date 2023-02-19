import React, { useState } from 'react'
import moment from 'moment';
import { Modal, Table, Typography } from 'antd';
import { convertDecimalTimeToNormal } from '../../helpers/genericHelpers';
const { Text } = Typography;


const DieselOverviewCostTrackerTable = (
  { dieselOverviewData, isLoading,
    userId,
    fetchFuelConsumptionInfo }
) => {

  
  const [modalOpener, setModalOpener] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [fuelDataLoading, setFuelDataLoading] = useState(false);

  const fetchFuelData = async (date) => {
    setModalData(false)
    const year = moment(date).format('YYYY');
    const month = moment(date).endOf('month').format('MM');


    // const queryString = `from_date=${startOfMonth}&to_date=${endOfMonth}`
    const queryString = `${userId}/${year}/${month}`

    setModalOpener(true);
    setFuelDataLoading(true);
    const fuelData = await fetchFuelConsumptionInfo(queryString);
    if (fuelData && fuelData.fullfilled) {
      setModalData(fuelData.data);
    }
    setFuelDataLoading(false);
  }


  dieselOverviewData && dieselOverviewData.forEach(obj => {
    for (const propertyName in obj) {
      if (typeof obj[propertyName] === 'number') {
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
      width: '10%',
      render: (month) => {
        // {month}
        return (
          <p onClick={() => fetchFuelData(month)} style={{ cursor: 'pointer', color: 'blue' }} >{month}</p>)
      }
    },
    {
      title: 'Inputted Usage(Ltr)',
      dataIndex: 'inputted_usage',
      key: 'inputted_usage',
    },
    {
      title: 'Forecasted Usage (Ltr)',
      dataIndex: 'forecasted_usage',
      key: "forecasted_usage",
    },
    {
      title: 'Inputted Cost (₦)',
      dataIndex: 'inputted_cost',
      key: 'inputted_cost',
    },
    {
      title: 'Forecasted Cost (₦)',
      dataIndex: 'forecasted_cost',
      key: 'forecasted_cost',
    },
    {
      title: 'Diesel Difference (Ltr)',
      dataIndex: 'diesel_difference',
      key: 'diesel_difference',
    },
    {
      title: 'Price Difference (₦)',
      dataIndex: 'cost_difference',
      key: 'cost_difference',
    },
    {
      title: 'Percentage Difference (%)',
      dataIndex: 'percentage_usage',
      key: 'percentage_usage',
    },
  ];



  const fuelconsumptionColum = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: "date",
      width: '20%',
    },
    {
      title: 'Quantity(L)',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '15%',
    },
    {
      title: 'Hours',
      dataIndex: 'hours_of_use',
      width: '15%',
      render: (hours) => convertDecimalTimeToNormal(hours.toFixed(2))
    },
    {
      title: 'Energy(kWh)',
      dataIndex: 'energy_consumed',
      width: '15%',
    },
    {
      title: 'Liters/H',
      dataIndex: 'litres_per_hour',
      width: '15%',
    },
    {
      title: 'kWh/L',
      dataIndex: 'energy_per_litre',
      width: '15%',
    },
  ];


  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  let inputtedUsageSum = 0;
  let forecastedUsageSum = 0;
  let inputtedCostSum = 0;
  let forecastedCostSum = 0;
  let dieselDifferenceSum = 0;
  let costDifferenceSum = 0;
  let percentageUsageSum = 0;

  dieselOverviewData && dieselOverviewData.forEach(element => {
    const inputtedUsage = parseFloat(element.inputted_usage)
    const forecastedUsage = parseFloat(element.forecasted_usage)
    const inputtedCost = parseFloat(element.inputted_cost)
    const forecastedCost = parseFloat(element.forecasted_cost)
    const dieselDifference = parseFloat(element.diesel_difference)
    const costDifference = parseFloat(element.cost_difference)
    const percentageUsage = parseFloat(element.percentage_usage)
    inputtedUsageSum += inputtedUsage;
    forecastedUsageSum += forecastedUsage;
    inputtedCostSum += inputtedCost;
    forecastedCostSum += forecastedCost;
    dieselDifferenceSum += dieselDifference;
    costDifferenceSum += costDifference;
    percentageUsageSum += percentageUsage;
  });

  return (
    <div>
      <Table columns={columns}
        loading={isLoading}
        dataSource={dieselOverviewData && dieselOverviewData}
        onChange={onChange}
        scroll={{ x: 1000 }}
        className='table-striped-rows utitily-overview-table'
        rowKey={(record) => record.id}
        pagination={{
          pageSize: 6,
        }}
        summary={pageData => {

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(inputtedUsageSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(forecastedUsageSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(inputtedCostSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(forecastedCostSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(dieselDifferenceSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(costDifferenceSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{percentageUsageSum && parseFloat(percentageUsageSum / dieselOverviewData.length).toFixed(2)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
        footer={() => `${dieselOverviewData && dieselOverviewData.length} entries in total`} />
      <Modal
        visible={modalOpener}
        onCancel={() => setModalOpener(false)}
        footer={null}
        width={800}

      >
        <Table
          dataSource={modalData}
          loading={fuelDataLoading}
          rowKey="start_date"
          columns={fuelconsumptionColum}
          pagination={{
            pageSize: 6,
          }}
        />
      </Modal>
    </div>
  )
}

export default DieselOverviewCostTrackerTable
