import React from 'react';
import { Table } from 'antd';


const GenericReportTable  = ({ data, columnData, summary= null, rowKey="key" }) =>{

  return (
    <Table
      rowKey={rowKey}
      dataSource={data}
      columns={columnData}
      pagination={false}
      style={{textAlign: 'center'}}
      className='report-table'
      // className='table-striped-rows'
      size={'middle'}
      summary={pageData => summary && summary(pageData)}
    />
  );
}

export default GenericReportTable;
