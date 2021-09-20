import React, {useState} from 'react'
import { Table } from 'antd';

const DieselPurchasedTable = ({ data }) => {
    const getTariff = data.map(element => {
      let tariff = element.price_per_litre / element.quantity
      const newData = {
        ...element,
        tariff:tariff
      }
      return newData
    });
    
    const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Quantity(Ltr)',
          dataIndex: 'quantity',
          key: 'quantity',
          sorter: {
            compare: (a, b) => a.quantity - b.quantity,
            multiple: 3,
          },
        },
        {
          title: 'Tariff(₦/Ltr)',
          dataIndex: 'tariff',
          key:"tariff",
          sorter: {
            compare: (a, b) => a.tariff - b.tariff,
          },
        },
        {
            title: 'Amount(₦)',
            dataIndex: 'price_per_litre',
            key:"price_per_litre",
            sorter: {
              compare: (a, b) => a.price_per_litre - b.price_per_litre,
            },
        }
      ];

    return (
        <div>
            <Table columns={columns}
                dataSource={getTariff}
                className='table-striped-rows' 
                rowKey={(record) => record.id}
                footer={() => `${getTariff && getTariff.length} entries in total`}/>            
        </div>
    )
}

export default DieselPurchasedTable
