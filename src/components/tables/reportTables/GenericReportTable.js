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
      // className='table-striped-rows'
      size={'middle'}
    />
  );
}

export default LoadImbalance;
