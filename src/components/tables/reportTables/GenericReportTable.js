import React from 'react';
import { Table } from 'antd';


const LoadImbalance  = ({ data, columnData }) =>{

  return (
    <Table
      rowKey="key"
      dataSource={data}
      columns={columnData}
      pagination={false}
      style={{textAlign: 'center'}}
      className='report-table'
      size={'middle'}
    />
  );
}

export default LoadImbalance;
