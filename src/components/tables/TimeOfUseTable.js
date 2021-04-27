import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios"


class TimeOfUseTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    timeOfUseData : []
  };

  timeOfUseUrl = 'http://localhost:3006/branches'

  componentDidMount(){
    axios.get(this.timeOfUseUrl)
    .then((res)=>{
      //  this.setState({timeOfUseData: res.data.authenticatedData.branches[0].time_of_use_table.values})
      this.setState({timeOfUseData : res.data[0].time_of_use_table.values})
        // console.log('Time of use data:',this.state.timeOfUseData)
    })
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const data = this.props.timeOfUseData;
    const { timeOfUseData } = this.state 

    const arrayRemove = (arr,value)=>{
        return arr.filter((element)=>{
          return element !== value
        })
    }

    // const  tableTitles = timeOfUseData[0] && Object.keys(this.state.timeOfUseData[0]) //Gets the keys from the data array
    // console.log(tableTitles)

    const tableTitles = timeOfUseData[0] && Object.keys(timeOfUseData[0])
    // console.log(timeOfUseData[0].date)

    // const neededColumnsHeaders = arrayRemove(titles,"utility") // Remove Utitity from headers as it is not wanted.

    const columns = [
    
      // {
      //   title: 'Date',
      //   dataIndex: 'date',
      //   key: 'date',
      //   ...this.getColumnSearchProps('date'),
      //   sorter: (a, b) => new Date(a.date) - new Date(b.date),
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'Gen 1 (Hrs)',
      //   dataIndex: 'gen1',
      //   key: 'gen1',
      //   ...this.getColumnSearchProps('gen1'),
      //   sorter: (a, b) => a.gen1 - b.gen1,
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'Gen 2 (Hrs)',
      //   dataIndex: 'gen2',
      //   key: 'gen2',
      //   ...this.getColumnSearchProps('gen2'),
      //   sorter: (a, b) => a.gen2 - b.gen2,
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'Active Gen (Hrs)',
      //   dataIndex: 'active_gen',
      //   key: 'active_gen',
      //   ...this.getColumnSearchProps('active_gen'),
      //   sorter: (a, b) => a.active_gen.localeCompare(b.active_gen),
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'First Time ON',
      //   dataIndex: 'time_on',
      //   key: 'time_on',
      //   ...this.getColumnSearchProps('time_on'),
      //   sorter: (a, b) => a.time_on.localeCompare(b.time_on),
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'Last Time OFF',
      //   dataIndex: 'time_off',
      //   key: 'time_off',
      //   ...this.getColumnSearchProps('time_off'),
      //   sorter: (a, b) => a.time_off.localeCompare(b.time_off),
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'Hours of Use',
      //   dataIndex: 'hours_of_use',
      //   key: 'hours_of_use',
      //   ...this.getColumnSearchProps('hours_of_use'),
      //   sorter: (a, b) => a.hours_of_use.localeCompare(b.hours_of_use),
      //   sortDirections: ['descend', 'ascend'],
      // },
    ];

    const { Column } = Table;
    return (
      <>
        <Table
          className='table-striped-rows'
          // columns={columns}
          dataSource={timeOfUseData && timeOfUseData}
          rowKey={(record) => record.id}
          pagination={{ position: ['none', 'bottomCenter'] }}
          footer={() => `${timeOfUseData && timeOfUseData.length} entries in total`}
        >
 
       {
       tableTitles && tableTitles.map((headers, index)=>(
         <Column title={headers.toUpperCase()} dataIndex={headers}
          key= {headers}
          {...this.getColumnSearchProps({headers})}
          sorter= {(a, b) => a.headers - b.headers}
          sortDirections = {['descend', 'ascend']}
          />
        )) 
      }
        </Table>
      </>
    );
  }
}

export default TimeOfUseTable;
