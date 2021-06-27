import React, {useState, useEffect, useContext} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, DatePicker} from 'antd';
import { mergeTheEquipmentsData } from '../../helpers/genericHelpers'
import equipmentHttpServices from '../../services/equipment'

import CompleteDataContext from '../../Context';

const {RangePicker} = DatePicker

const DateWidget = (
  <DatePicker
    format="DD-MM-YYYY"
    className="generic-input"
    id="equipment-purchase-date"
    onChange={(e)=>console.log(e)}
  />
);


const testData = [
  {name: "Equipment 2", voltage: 12.3, quantity: 22, date_purchased: "2021-05-19", key:'1'},
  {name: "Equipment 2", voltage: 12.3, quantity: 22, date_purchased: "2021-05-19", key:'1'},
  {name: "Equipment 2", voltage: 12.3, quantity: 22, date_purchased: "2021-05-19", key:'1'},
  {name: "Inverter", voltage: 6000, quantity: 2, date_purchased: "2021-05-18", key:'2'},
  {name: "LG Washing Machine", voltage: 400, quantity: 1, date_purchased: "2021-06-02", key:'3'},
  {name: "Panasonic AC", voltage: 2000, quantity: 1, date_purchased: "2021-05-30", key:'4'},
  {name: "LCD Monitor", voltage: 200, quantity: 1, date_purchased: "2021-05-17", key:'5'},
]

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
  const inputNode = inputType === 'number' ? <InputNumber /> : inputType === 'text' ? <Input/> : inputType === 'date' ? <DatePicker/> :'';
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
  const { token, userId } = useContext(CompleteDataContext);
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    const mergedData = mergeTheEquipmentsData(Object.values(listOfEquipmentData))
    const mapKeyToEachData = mergedData.map(element => {
        let branchIds = element.id
        const formattedData  = element.equipments.map((data)=>{ 
          let addKey = Object.assign(data, {branch_id:branchIds})
        //Added key value to each object using their IDs. because this is what the edit() func uses to differentiate them. 
          let Key = Object.assign(data,{key:data.id}) 
          return data
        })
        return formattedData
    });
    const combineArray = [].concat(...mapKeyToEachData)
    setData(combineArray)
  },[listOfEquipmentData])

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

      const deleteSelectedData = (item)=>{
        delete item.key;
        delete item.id;
        delete item.branch_id;
        return item
      }

      if (index > -1) {
        const item = newData[index];
        let updatedData =  { ...item, ...row }
        newData.splice(index, 1, updatedData);
        setData(newData);
        setEditingKey('');
        equipmentHttpServices.update(userId,token,item.branch_id,item.id,deleteSelectedData(updatedData))
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
      key: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Voltage (watts)',
      dataIndex: 'voltage',
      key: 'voltage',
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
      key:'date_purchased',
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
        inputType: col.dataIndex === 'date_purchase' ? 'date' : col.dataIndex === 'name' ? 'text' : col.dataIndex === 'voltage' || 'quantity' ? 'number' : '',
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
