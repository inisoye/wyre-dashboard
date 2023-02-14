import React, { useContext, useState } from 'react'
import CompleteDataContext from '../../Context';
import { Table, Typography, Button, Dropdown, Popconfirm } from 'antd';
import { InfoCircleOutlined, EditOutlined, DownOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { sortArrayOfObjectByDate } from '../../helpers/genericHelpers';
const { Text } = Typography;

const UtilityPurchasedTable = ({ data, setEditUtilityPurchaseModal, setUtilityPurchaseData }) => {
  const [dataSources, setDataSources] = useState({})
  const {
    isMediumScreen
  } = useContext(CompleteDataContext);

  const sortedData = sortArrayOfObjectByDate(data);

  const handleDelete = (key) => {
    const newData = dataSources.filter((item) => item.key !== key);
    setDataSources(newData);
  };

  const itemData = (record) => {
    return [
      {
        key: '1',
        label: (
          <>
            <EditOutlined />
            <a target="_blank" onClick={(e) => {
              e.preventDefault();
              setEditUtilityPurchaseModal(true);
              setUtilityPurchaseData(record)
            }} rel="noopener noreferrer">
              Edit Utility Entry
            </a>
          </>

        ),
      },
      {
        key: '2',
        label: (<> {
            <>
            <Icon icon="ant-design:delete-outlined" />
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete Utility Entry</a>
            </Popconfirm>
            </>
        }
        </>

        ),
      }
    ];
  }

  const optionsColumn = () => ({
    key: 'options',
    title: 'Options',
    width: '10%',
    dataIndex: 'options',
    render: (_, record) => {
      const items = itemData(record);
      return (
        <Dropdown
          trigger={['click']}
          getPopupContainer={(trigger) => trigger.parentElement}
          // placement="topLeft"
          menu={{
            items
          }}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            More
            {' '}
            <DownOutlined />
          </a>
          {/* <Button>topRight</Button> */}
        </Dropdown>
      )

    }


  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
    },
    {
      title: 'Unit(kWh)',
      dataIndex: 'value',
      key: 'value',
      width: '20%',
      render: (value) => {
        return value? value.toFixed(2) : 0;
      }
    },
    {
      title: 'Tariff(₦/kWh)',
      dataIndex: 'tarrif',
      key: "tarrif",
      width: '20%',
      render: (value) => {
        return value? value.toFixed(2) : 0;
      }
    },
    {
      title: 'Amount(₦)',
      dataIndex: 'amount',
      key: "amount",
      width: '20%',
      render: (value) => {
        return value? value.toFixed(2) : 0;
      }
    },

    {
      title: 'VAT Inclusive amount(₦)',
      dataIndex: 'vat_inclusive_amount',
      key: "vat_inclusive_amount",
      width: '20%',
      render: (value) => {
        return value? value.toFixed(2) : 0;
      }
    },
    // editFunctionButtn()
    optionsColumn()
  ];

  let valueSum = 0;
  let tarrifSum = 0;
  let amountSum = 0;
  let vatInclusiveAmountSum = 0;


  data && data.forEach(element => {
    const value = parseFloat(element.value) || 0;
    const tarrif = parseFloat(element.tarrif) || 0;
    const amount = parseFloat(element.amount) || 0;
    const vatInclusiveAmount = parseFloat(element.vat_inclusive_amount) || 0;

    valueSum += value;
    tarrifSum += tarrif;
    amountSum += amount;
    vatInclusiveAmountSum += vatInclusiveAmount;

  });
  return (
    <div>
      <Table columns={columns}
        dataSource={sortedData}
        className='table-striped-rows utitily-overview-table'
        rowKey={(record) => record.id}
        scroll={isMediumScreen && { x: 600, y: 300 }}
        summary={pageData => {

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(valueSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(tarrifSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(amountSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{parseFloat(vatInclusiveAmountSum).toFixed(2)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
        footer={() => `${data && data.length} entries in total`} />
    </div>
  )
}

export default UtilityPurchasedTable
