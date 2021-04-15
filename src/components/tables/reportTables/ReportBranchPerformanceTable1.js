import React from 'react';
import { Table, Typography } from 'antd';

const { Text } = Typography;

function ReportBranchPerformanceTable1({ data }) {
  const columns = [
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Utility (Fm)',
      dataIndex: 'utility',
      key: 'utility',
    },
    {
      title: 'IPP',
      dataIndex: 'ipp',
      key: 'ipp',
    },
    {
      title: 'Gen',
      dataIndex: 'gen',
      key: 'gen',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <Table
      rowKey="key"
      dataSource={data}
      columns={columns}
      pagination={false}
      summary={(pageData) => {
        let totalUtility = 0;
        let totalIpp = 0;
        let totalGen = 0;
        let totalOfTotals = 0;

        pageData.forEach(({ utility, ipp, gen, total }) => {
          totalUtility += utility;
          totalIpp += ipp;
          totalGen += gen;
          totalOfTotals += total;
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text>{totalUtility}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text>{totalIpp}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text>{totalGen}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text>{totalOfTotals}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );
}

export default ReportBranchPerformanceTable1;
