import React, {useState, useEffect} from 'react';
import { Table, Input, Button, Space, InputNumber, Popconfirm, Form, Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { mergeTheEquipmentsData } from '../../helpers/genericHelpers'


// class ListOfEquipmentTable extends React.Component {
//   state = {
//     searchText: '',
//     searchedColumn: '',
//   };

//   getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={(node) => {
//             this.searchInput = node;
//           }}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() =>
//             this.handleSearch(selectedKeys, confirm, dataIndex)
//           }
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             type='primary'
//             onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size='small'
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => this.handleReset(clearFilters)}
//             size='small'
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes(value.toLowerCase())
//         : '',
//     onFilterDropdownVisibleChange: (visible) => {
//       if (visible) {
//         setTimeout(() => this.searchInput.select(), 100);
//       }
//     },
//     render: (text) =>
//       this.state.searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[this.state.searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

//   handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     this.setState({
//       searchText: selectedKeys[0],
//       searchedColumn: dataIndex,
//     });
//   };

//   handleReset = (clearFilters) => {
//     clearFilters();
//     this.setState({ searchText: '' });
//   };

//   render() {
//     const data = this.props.listOfEquipmentData;

//     const columns = [
//       {
//         title: 'Equipment Name',
//         dataIndex: 'name',
//         key: 'name',
//         ...this.getColumnSearchProps('name'),
//         sorter: (a, b) => a.name.localeCompare(b.name),
//         sortDirections: ['descend', 'ascend'],
//       },
//       {
//         title: 'Voltage (watts)',
//         dataIndex: 'voltage',
//         key: 'voltage',
//         ...this.getColumnSearchProps('wattage'),
//         sorter: (a, b) => a.voltage - b.voltage,
//         sortDirections: ['descend', 'ascend'],
//       },
//       {
//         title: 'Quantity',
//         dataIndex: 'quantity',
//         key: 'quantity',
//         ...this.getColumnSearchProps('quantity'),
//         sorter: (a, b) => a.quantity - b.quantity,
//         sortDirections: ['descend', 'ascend'],
//       },
//       {
//         title: 'Date Purchased',
//         dataIndex: 'date_purchased',
//         key: 'date_purchased',
//         ...this.getColumnSearchProps('date_purchased'),
//         sorter: (a, b) => a.date_purchased.localeCompare(b.date_purchased),
//         sortDirections: ['descend', 'ascend'],
//       },
//       {
//         title: 'Action',
//         key: 'key',
//         dataIndex: 'key',
//         render: (_, record) => (
//           <button
//             className='table-row-button'
//             onClick={() => console.log(record)}
//           >
//             Edit
//           </button>
//         ),
//       },
//     ];

//     const mergeTheEquipmentsData = (arr) => {
//       return [...new Set([].concat(...arr))];
//     }
    
//     const newData = mergeTheEquipmentsData(Object.values(data))


//     return (
//       <>
//         <Table
//           className='table-striped-rows'
//           columns={columns}
//           dataSource={newData}
//           rowKey={(record) => record.id}
//           pagination={false}
//           footer={() => ``}
//         />
//       </>
//     );
//   }
// }





const originData = [];

for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Equipment ${i}`,
    quantity: 32,
    voltage: i,
    date_purchased: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ListOfEquipmentTable = ({listOfEquipmentData}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState('');

  
  useEffect(() => {
    const mergedData = mergeTheEquipmentsData(Object.values(listOfEquipmentData))
    const mapKeyToEachData = mergedData.map(element => {
        let addKey = Object.assign(element, {key:element.name})  
        return element
    });         
    setData(mapKeyToEachData)
  },[data, listOfEquipmentData])

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      voltage: '',
      quantity: '',
      date_purchased:'',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        console.log(data)
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Equipment Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Voltage (watts)',
      dataIndex: 'voltage',
      editable: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      editable:true,
    },
    {
      title: 'Date Purchased',
      dataIndex: 'date_purchased',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => {
            edit(record)
            console.log(record)
            }} className="table-row-button" style={{width:'50%', marginRight:'10px'}}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'name' ? 'text' : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default ListOfEquipmentTable;
