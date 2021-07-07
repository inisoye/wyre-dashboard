/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Row, Col, Menu, Checkbox, Input, Alert } from 'antd';
import axios from 'axios';

import CompleteDataContext from '../Context';
import ScheduleEmailBtn from '../icons/ScheduleEmailBtn';

import dataHttpServices from '../services/devices';
import { Hr } from '../icons/Hr';

import { ModalBtns } from '../smallComponents/ModalBtns';
import { ModalDropdownBtn } from '../smallComponents/ModalDropdownBtn';
import { truncateEmail } from '../helpers/genericHelpers'

export const ScheduleEmailModal = () => {
  const {
    isModalVisible,
    setIsModalVisible,
    token,
    userId,
    allDevices,
    checkedDevices,
    emailModalData,
    setEmailModalData,
    userDateRange
  } = useContext(CompleteDataContext);

  const [addEmail, setAddEmail] = useState('');
  const [sendBill, setSendBill] = useState('');
  const [exterNalReceiverSelect, setExterNalReceiverSelect] = useState({});
  const [isSendingBill, setIsSendingBill] = useState(true);
  const [sentBillStatus, setSentBillStatus] = useState();
  const [frequencyDropdown, setFrequencyDropdown] = useState('');
  const [personalDataAvailableDevices, setPersonalDataAvailableDevices] = useState()
  const [currentRecieverId, setcurrentRecieverId] = useState();

  let dateRange = userDateRange === null || userDateRange.length === 0 ? dataHttpServices.endpointDateRange
    : dataHttpServices.convertDateRangeToEndpointFormat(userDateRange);



  const getemailModalDataUrl = `https://wyreng.xyz/api/v1/mail_schedules_data/${userId}/`;
  const addNewExternalReceiverUrl = `https://wyreng.xyz/api/v1/add_external_bill_reciever/${userId}/`;
  const addavailableDevicesToBillReceiver = `https://wyreng.xyz/api/v1/add_assigned_devices/${userId}/`;
  const deleteBillReceiverUrl = `https://wyreng.xyz/api/v1/delete_mail_reciever/${userId}/`;
  const sendBillUrl = `https://wyreng.xyz/api/v1/send_report/${userId}/${dateRange}/`;
  const convertExternalReceiver = (arr, key, value) => {
    let result = arr.reduce((r, item) => {
      r[item[key]] = item[value].map(({id}) => id);
      return r; 
    }, {});
    return result;
  }

  const arrayRemove = (arr, value) =>{
    return arr.filter((ele)=>ele !== value);
}

  useEffect(() => {
    axios
      .get(getemailModalDataUrl, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((resp) => {
        setEmailModalData(resp.data.data);
        setExterNalReceiverSelect(convertExternalReceiver(resp.data.data.external_recievers, 'id', 'assigned_devices'));
        console.log('this is the console.log data and here we go', convertExternalReceiver(resp.data.data.external_recievers, 'id', 'assigned_devices'))
      })
      .catch((error) => console.log('An error occured:', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let data = JSON.stringify({
      frequency: frequencyDropdown,
      selected_devices: [personalDataAvailableDevices],
    });

    if (frequencyDropdown === '' && personalDataAvailableDevices === undefined) {
      // pass
    }
    else {
      axios
      .post(addavailableDevicesToBillReceiver, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setEmailModalData(response.data.data);
      })
      .catch((err) => console.log('Error setting Personal Data', err));
    }
  }, [frequencyDropdown])

  const ShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = (e) => {
    setIsModalVisible(false);
  };

  const handleFrequencyMenuClick = (e) => {
    setFrequencyDropdown(e.key);
  };

  let selectedDevicesIds = [];

  for (const prop in checkedDevices) {
    let listOfDeviceId = allDevices.filter((e) => {
      return e.name === prop;
    });
    selectedDevicesIds.push(listOfDeviceId[0].id);
  }


  const addDevicetoExternalReciever = (data) => {
    axios
      .post(addavailableDevicesToBillReceiver, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setEmailModalData(res.data.data);
        console.log(emailModalData)
      })
      .catch((error) => {
        console.log('Error adding assigned devices to external Receiver', error)
        alert('Error adding assigned devices to external receiver')
      }
      );
  };


  const handleExternalRecieversDevicesMenuClick = (v) => {
    console.log('this is v', v);
    console.log('this is exterNalReceiverSelect', exterNalReceiverSelect);
    const receiverId = v.target['data-receiver'];
    const value = v.target.eventKey;
    let selectedArray
    if(v.target.checked){
      selectedArray = exterNalReceiverSelect;
      selectedArray[receiverId].push(parseInt(value));
      setExterNalReceiverSelect(selectedArray);
    }else{
      selectedArray = exterNalReceiverSelect;
      const newArray = arrayRemove(selectedArray[receiverId], parseInt(value));
      selectedArray[receiverId] = newArray;
      setExterNalReceiverSelect(selectedArray);
    }

    addDevicetoExternalReciever({ receiver_id: receiverId, 
      selected_devices: selectedArray[receiverId] });

  };


  const handlePersonalDataDevicesMenuClick = (devices) => {
    let strIdToInt = parseInt(devices.key)
    setPersonalDataAvailableDevices(strIdToInt)
  };

  const handleChangForAddExternalReceiever = (e) => {
    let externalReceiver = e.target.value;
    setAddEmail(externalReceiver);
  };

  const AddExternalReceiver = (e) => {
    e.preventDefault();
    let addExternalReceiverData = JSON.stringify({
      email: addEmail,
    });

    axios
      .post(addNewExternalReceiverUrl, addExternalReceiverData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setEmailModalData(response.data.data);
      })
      .catch((err) =>
        alert("Couldn't add external Reciever, Please try again.")
      );
  };


  const handleChangeForSendAQuickBill = (event) => {
    let targetEmail = event.target.value;
    setSendBill(targetEmail);
  };

  const submitEmailTargetForSendAQuickBill = (event) => {
    event.preventDefault();
    if (selectedDevicesIds.length === 0) {
      allDevices.filter((e) => {
        return selectedDevicesIds.push(e.id)
      })
    }
    let sendAQuickBiillData = JSON.stringify({
      email: sendBill,
      selected_devices: selectedDevicesIds,
    });
    setIsSendingBill(true);

    axios
      .post(sendBillUrl, sendAQuickBiillData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setSentBillStatus(res.status)
      })
      .catch((error) => console.log('Error posting data', error));
    setIsSendingBill(false);
  };

  const deleteBillReceiver = () => {
    let deleteBillReceiverdata = JSON.stringify({
      receiver_id: currentRecieverId,
    });

    axios
      .post(deleteBillReceiverUrl, deleteBillReceiverdata, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setEmailModalData(res.data.data);
      })
      .catch((error) => console.log('Error deleting and posting data:', error));
  };

  // Styles
  const emailStyles = {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#000000',
    marginTop: '3px',
  };

  const rowStyles = {
    marginBottom: '50px',
    marginTop: '30px',
  };

  const addEmailInputBox = {
    marginLeft: '200px',
  };

  const ModalHeaders = {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#000000',
  };

  // STYLING ENDS HERE

  const assignedDevicesForPersonalData = emailModalData && emailModalData.available_devices;
  const personalDataAssignedDevices = (
    <Menu
      selectable
      multiple={true}
      onClick={handlePersonalDataDevicesMenuClick}
      selectedKeys={[personalDataAvailableDevices]}
    >
      {assignedDevicesForPersonalData &&
        assignedDevicesForPersonalData.map((data) => (
          <Menu.Item key={data.device_id}>
            {data.device_name}
            <Checkbox style={{ marginLeft: '20px' }} />
          </Menu.Item>
        ))}
    </Menu>
  );

  const frequencyDropDownList = (
    <Menu onClick={handleFrequencyMenuClick} selectedKeys={[frequencyDropdown]}>
      <Menu.Item key="WEEKLY">WEEKLY</Menu.Item>
      <Menu.Item key="BI-WEEKLY">BI-WEEKLY</Menu.Item>
      <Menu.Item key="MONTHLY">MONTHLY</Menu.Item>
    </Menu>
  );


  const convertToObject = (arr, key, value) => {
    let result = arr.reduce((resData, item) => {
      resData[item[key]] = item[value];
      return resData;
    }, {});
    return result;
  }

  

  const externalRecieversAssignedDevices = emailModalData && emailModalData.available_devices;
  const assignedDevicesForExternalRecievers = (assigned_devices, receiverId) => {
    const assignedDeviceObject = convertToObject(assigned_devices, 'id', 'name');
    console.log('here is the assigned device', assignedDeviceObject)
    return (
    <Menu
      selectable
      multiple={true}
      // onClick={handleExternalRecieversDevicesMenuClick}
      // selectedKeys={[externalRecieverAssignedDeviceIds]}
      >
      {externalRecieversAssignedDevices &&
        externalRecieversAssignedDevices.map((item) => (
          <Menu.ItemGroup data-receiver={receiverId} key={item.device_id}>
            {item.device_name}
            <Checkbox defaultChecked={!!assignedDeviceObject[item.device_id]} 
            onChange={handleExternalRecieversDevicesMenuClick} 
            data-receiver={receiverId}
            key={item.device_id} style={{ marginLeft: '20px' }}/>
          </Menu.ItemGroup>
        ))}
    </Menu>
  )};

  const external_recievers = emailModalData && emailModalData.external_recievers;

  return (
    <>
      <span className="print-button" onClick={ShowModal}>
        <ScheduleEmailBtn />
      </span>
      <Modal
        visible={isModalVisible}
        style={{ top: 20 }}
        footer={null}
        onCancel={handleCancel}
      >
        <Row justify="center">
          <Col>
            <p style={ModalHeaders}> External Reciever </p>
          </Col>
        </Row>
        <Hr />
        <br />
        {external_recievers && external_recievers.length > 0 ? (
          external_recievers &&
          external_recievers.map((recievers) => (
            <Row key={recievers.id} style={{ marginBottom: '15px' }}>
              <Col span={10} style={emailStyles}>
                {truncateEmail(recievers.email, 15)}
              </Col>
              <Col span={10}>
                <ModalDropdownBtn
                  dropDownList={assignedDevicesForExternalRecievers(recievers.assigned_devices, recievers.id)}
                  text="Assigned Devices"
                  onTouch={() => {
                    setcurrentRecieverId(recievers.id);
                  }}
                />
              </Col>
              <Col span={4}>
                <ModalBtns
                  action="delete"
                  onClick={deleteBillReceiver}
                  onMouseOver={() => {
                    setcurrentRecieverId(recievers.id);
                  }}
                />
              </Col>
            </Row>
          ))
        ) : (
          <Row justify="center">
            <Col>
              <p>No External Receiver added</p>
            </Col>
          </Row>
        )}

        <br />
        <Hr />

        <Row style={rowStyles}>
          <Col style={addEmailInputBox} span={8}>
            <Input
              placeholder="Add email"
              value={addEmail}
              onChange={handleChangForAddExternalReceiever}
              name="Target-email"
            />
          </Col>
          <Col span={4} style={{ marginLeft: '30px' }}>
            <ModalBtns action="add" onClick={AddExternalReceiver} />
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col>
            <p style={ModalHeaders}>Personal Mail Frequency</p>
          </Col>
        </Row>
        <Hr />
        <Row justify="center" style={rowStyles}>
          <Col span={12}>
            <ModalDropdownBtn
              text="Assigned Devices"
              dropDownList={personalDataAssignedDevices}
            />
          </Col>
          <Col>
            <ModalDropdownBtn
              dropDownList={frequencyDropDownList}
              text="Frequency"
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <p style={ModalHeaders}>Send A Quick Bill</p>
          </Col>
        </Row>
        <Hr />
        <Row justify="center" style={rowStyles}>
          {isSendingBill === false && sentBillStatus === 200 ? (
            <Alert
              message="Successfully sent bill to email"
              type="success"
              closable={true}
              style={{ marginBottom: '20px' }}
            />
          ) : sentBillStatus < 200 || sentBillStatus > 299 ? (
            <Alert
              message="Error,Couldn't send bill to email. Please try again"
              closable={true}
              type="error"
              style={{ marginBottom: '20px' }}
            />
          ) : (
            ''
          )}
          <br />
          <Col span={12} style={{ marginRight: '20px' }}>
            <Input
              placeholder="Enter email address"
              value={sendBill}
              onChange={handleChangeForSendAQuickBill}
              id="TargetEmail"
            />
          </Col>
          <Col>
            <ModalBtns
              action="send"
              onClick={submitEmailTargetForSendAQuickBill}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
