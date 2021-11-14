import React from 'react';
import { Table } from 'antd';


const LoadImbalanceReportTable  = ({ data, columnData }) =>{

  return (
    <Table
      rowKey="key"
      scroll={{ y: 215 }}
      dataSource={data}
      columns={columnData}
      pagination={false}
      style={{textAlign: 'center'}}
      className='report-table'
      size={'middle'}
    />
  );
}

export default LoadImbalanceReportTable;
