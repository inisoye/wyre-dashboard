import { Table, Typography } from 'antd';

const { Text } = Typography


export const ConstImplicationSummary = pageData => {

    let totalDemand = 0;
    let totalCost = 0;

    pageData.forEach(({ demand, cost }) => {
        totalDemand += demand;
        totalCost += cost;
    });
    return (
        <>
            <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text></Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text>{parseFloat(totalDemand).toFixed(2)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text>{parseFloat(totalCost).toFixed(2)}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}
