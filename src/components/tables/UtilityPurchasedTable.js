import React from 'react'
import { Table } from 'antd';


const UtilityPurchasedTable = ({ data }) => {
    console.log('from table:',data)
    const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Unit(Kwh)',
          dataIndex: 'unit',
          key: 'unit',
          sorter: {
            compare: (a, b) => a.unit - b.unit,
            multiple: 3,
          },
        },
        {
          title: 'Tariff(₦/Kwh)',
          dataIndex: 'tarrif',
          key:"tarrif",
          sorter: {
            compare: (a, b) => a.tarrif - b.tarrif,
          },
        },
        {
            title: 'Amount(₦)',
            dataIndex: 'amount',
            key:"amount",
            sorter: {
              compare: (a, b) => a.price_per_litre - b.price_per_litre,
            },
        },
        
        {
            title: 'VAT Inclusive amount(₦)',
            dataIndex: 'vat_inclusive_amount',
            key:"vat_inclusive_amount",
            sorter: {
              compare: (a, b) => a.vat_inclusive_amount - b.vat_inclusive_amount,
            },
        },
      ];

    return (
        <div>
            <Table columns={columns}
                dataSource={data}
                className='table-striped-rows' 
                rowKey={(record) => record.id}
                footer={() => `${data && data.length} entries in total`}/>            
        </div>
    )
}

export default UtilityPurchasedTable
