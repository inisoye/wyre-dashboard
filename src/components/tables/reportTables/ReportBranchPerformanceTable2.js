import React from 'react';
import { Table } from 'antd';

function ReportBranchPerformanceTable2({ data }) {
  const columns = [
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'PAPR',
      dataIndex: 'papr',
      key: 'papr',
    },
    {
      title: 'Base Line',
      dataIndex: 'base_line',
      key: 'base_line',
    },
    {
      title: 'Gen Efficiency',
      dataIndex: 'gen_efficiency',
      key: 'gen_efficiency',
    },
    {
      title: 'Emission',
      dataIndex: 'emission',
      key: 'emission',
    },
    {
      title: 'Blended Cost',
      dataIndex: 'blended_cost',
      key: 'blended_cost',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ];

  return (
    <Table
      rowKey="key"
      dataSource={data}
      columns={columns}
      pagination={false}
    />
  );
}

export default ReportBranchPerformanceTable2;
