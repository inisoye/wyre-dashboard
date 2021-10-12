import React, { useContext } from 'react'
import CompleteDataContext from '../../Context';

import { Table, Typography } from 'antd';
import { sortArrayOfObjectByDate } from '../../helpers/genericHelpers';
const { Text } = Typography;
const DieselPurchasedTable = ({ data, isLoading }) => {
  const {
    isMediumScreen
  } = useContext(CompleteDataContext);

  const getTariff = data.map(element => {
    let amount = (element.price_per_litre * element.quantity) || 0;
    const newData = {
      ...element,
      amount: amount,
    }
    return newData
  });


  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '25%',
    },
    {
      title: 'Quantity(Ltr)',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '25%',
      render: (value) => {
        return value? value.toFixed(2) : 0;
      }
    },
    {
      title: 'Tariff(₦/Ltr)',
      dataIndex: 'price_per_litre',
      width: '25%',
      render: (value) => {
        return value? value.toFixed(2) : 0;
      }
    },
    {
      title: 'Amount(₦)',
      dataIndex: 'amount',
      width: '25%',
      render: (value) => {
        return value? value.toFixed(2) : 0;
      }
    }
  ];

  let quantitySum = 0;
  let tariffSum = 0;
  let amountSum = 0;

  data && getTariff.forEach(element => {
    const quantity = parseFloat(element.quantity) || 0;
    const tariff = parseFloat(element.price_per_litre) || 0
    const amount = parseFloat(element.amount) || 0;
    quantitySum += quantity;
    tariffSum += tariff;
    amountSum += amount;
  });


  return (
    <div>
      <Table columns={columns}
        dataSource={sortArrayOfObjectByDate(getTariff)}
        className='table-striped-rows utitily-overview-table'
        rowKey={(record) => record.id}
        isLoading={isLoading}
        scroll={isMediumScreen && { x: 600, y: 300 }}

        summary={pageData => {

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(quantitySum).toFixed(2) || 0}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat((tariffSum/getTariff.length) || 0).toFixed(2) || 0}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat((amountSum) || 0).toFixed(2)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
        footer={() => `${getTariff && getTariff.length} entries in total`}
      />
    </div>
  )
}

export default DieselPurchasedTable
